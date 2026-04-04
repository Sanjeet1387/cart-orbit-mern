//// According to Old paypal sdk that is paypal-rest-sdk

// const paypal = require("../../helpers/paypal");
// const Order = require("../../models/Order");

// //for create the payment
// const createOrder = async (req, res) => {
//   try {
//     const {
//       userId,
//       cartItems,
//       addressInfo,
//       orderStatus,
//       paymentMethod,
//       paymentStatus,
//       totalAmount,
//       orderDate,
//       orderUpdateDate,
//       paymentId,
//       payerId,
//     } = req.body;

//     //now need to create a payment json that help us to create paypal payment instance
//     const create_payment_json = {
//       intent: "sale",
//       payer: {
//         payment_method: "paypal",
//       },
//       redirect_urls: {
//         return_url: "http://localhost:5173/shop/paypal-return",
//         cancel_url: "http://localhost:5173/shop/paypal-cancel",
//       },
//       transactions: [
//         {
//           item_list: {
//             items: cartItems.map((item) => ({
//               name: item.title,
//               sku: item.productID,
//               price: item.price.toFixed(2),
//               currency: "USD",
//               quantity: item.quantity,
//             })),
//           },
//           amount: {
//             currency: "USD",
//             total: totalAmount.toFixed(2),
//           },
//           description: "description",
//         },
//       ],
//     };

//     //now need to initiate the paypal payment
//     paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
//       if (error) {
//         console.log(error);

//         return res.status(500).json({
//           success: false,
//           message: "Error while creating paypal payment",
//         });
//       } else {
//         const newlyCreatedOrder = new Order({
//           userId,
//           cartItems,
//           addressInfo,
//           orderStatus,
//           paymentMethod,
//           paymentStatus,
//           totalAmount,
//           orderDate,
//           orderUpdateDate,
//           paymentId,
//           payerId,
//         });
//         await newlyCreatedOrder.save();

//         const approvalURL = paymentInfo.links.find(
//           (link) => link.rel === "approval_url",
//         ).href;

//         res.status(201).json({
//           success: true,
//           approvalURL,
//           orderId: newlyCreatedOrder._id,
//         });
//       }
//     });

//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "some error occured!",
//     });
//   }
// };

// //for capture the payment
// const capturePayment = async (req, res) => {
//   try {
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       message: "some error occured!",
//     });
//   }
// };

// module.exports = { createOrder, capturePayment };

//According to new Sdk of paypal that is @paypal/checkout-server-sdk

const client = require("../../helpers/paypal"); // PayPal client
const paypal = require("@paypal/checkout-server-sdk");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart"); 
const Product = require("../../models/Product"); //for Out of Stock functionality

// Create PayPal order and save MongoDB order
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    // Basic validation
    // if (!userId || !cartItems?.length || !totalAmount) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Missing required fields",
    //   });
    // }

    // Save order in MongoDB first
    const newOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus: orderStatus || "created",
      paymentMethod: paymentMethod || "paypal",
      paymentStatus: paymentStatus || "pending",
      totalAmount: Number(totalAmount),
      orderDate: orderDate || new Date(),
      orderUpdateDate: orderUpdateDate || new Date(),
      paymentId: paymentId || "",
      payerId: payerId || "",
    });

    await newOrder.save();

    // Create PayPal order
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: Number(totalAmount).toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: Number(totalAmount).toFixed(2),
              },
            },
          },
          items: cartItems.map((item) => ({
            name: item.title,
            sku: item.productID,
            unit_amount: {
              currency_code: "USD",
              value: Number(item.price).toFixed(2),
            },
            quantity: item.quantity.toString(),
          })),
        },
      ],
      application_context: {
        return_url: `${process.env.CLIENT_BASE_URL}/shop/paypal-return`,
        cancel_url: `${process.env.CLIENT_BASE_URL}/shop/paypal-cancel`,
      },
    });

    const order = await client.execute(request);

    // Get approval URL
    const approvalURL = order.result.links.find(
      (link) => link.rel === "approve",
    ).href;

    res.status(201).json({
      success: true,
      approvalURL,
      orderId: newOrder._id,
      paypalOrderID: order.result.id,
    });
  } catch (err) {
    console.error("CREATE ORDER ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Capture PayPal payment
const capturePayment = async (req, res) => {
  try {
    const { paypalOrderID, orderId } = req.body;

    if (!paypalOrderID || !orderId) {
      return res.status(400).json({
        success: false,
        message: "Missing PayPal order ID or local order ID",
      });
    }

    const request = new paypal.orders.OrdersCaptureRequest(paypalOrderID);
    request.requestBody({});

    const capture = await client.execute(request);

    // check payment status
    if (capture.result.status !== "COMPLETED") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
      });
    }

    // find order
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order cannot be found",
      });
    }

    // prevent duplicate processing
    if (order.paymentStatus === "paid") {
      return res.status(200).json({
        success: true,
        message: "Order already processed",
        data: order,
      });
    }

    // safe capture extraction
    const captureData =
      capture.result.purchase_units?.[0]?.payments?.captures?.[0];

    if (!captureData) {
      return res.status(400).json({
        success: false,
        message: "Capture data not found",
      });
    }

    // update order
    order.orderStatus = "confirmed";
    order.paymentStatus = "paid";
    order.paypalOrderId = paypalOrderID;
    order.paypalCaptureId = captureData.id;
    order.payerId = capture.result.payer?.payer_id || null;
    order.orderUpdateDate = new Date();

    //for out of stock functionality --------
    //we all know that we have cartItem for this order so,
    for(let item of order.cartItems){
      let product = await Product.findById(item.productId); // because each Product item has its own productId

      if(!product){
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${product.title}`
        })
      }

      //update totalStock of the product 
      product.totalStock -= item.quantity;  // product ka totalStock = (totalStock - how much the user ordered)

      await product.save();
    }

    // ------------ ** -----------

    // delete cart safely
    if (order.cartId) {
      await Cart.findByIdAndDelete(order.cartId);
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (err) {
    console.error("CAPTURE PAYMENT ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
