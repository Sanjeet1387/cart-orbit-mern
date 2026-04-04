import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent, DialogClose } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { toast } from "sonner";
import { X } from "lucide-react";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast.success(data?.payload?.message);
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-150 max-h-[80vh] p-0 flex flex-col">
      
      {/* Sticky Header */}
      <div className="p-6 border-b bg-white sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Order Details</h2>

          {/* Close Button */}
          <DialogClose asChild>
            <button className="p-2 rounded-md hover:bg-gray-100">
              <X className="w-5 h-5" />
            </button>
          </DialogClose>
        </div>

        <p className="text-sm text-muted-foreground">
          Order ID: {orderDetails?._id}
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto p-6 flex-1 pb-24">
        <div className="grid gap-6">

          {/* Order Info */}
          <div className="grid gap-2">
            <div className="flex justify-between">
              <p className="font-medium">Order Date</p>
              <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
            </div>

            <div className="flex justify-between">
              <p className="font-medium">Order Price</p>
              <Label>${orderDetails?.totalAmount}</Label>
            </div>

            <div className="flex justify-between">
              <p className="font-medium">Payment method</p>
              <Label>{orderDetails?.paymentMethod}</Label>
            </div>

            <div className="flex justify-between">
              <p className="font-medium">Payment Status</p>
              <Label>{orderDetails?.paymentStatus}</Label>
            </div>

            <div className="flex justify-between">
              <p className="font-medium">Order Status</p>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Items */}
          <div>
            <div className="font-medium mb-2">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems?.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.title}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Shipping Info */}
          <div>
            <div className="font-medium mb-2">Shipping Info</div>
            <div className="text-muted-foreground">
              <p>{user.userName}</p>
              <p>{orderDetails?.addressInfo?.address}</p>
              <p>{orderDetails?.addressInfo?.city}</p>
              <p>{orderDetails?.addressInfo?.pincode}</p>
              <p>{orderDetails?.addressInfo?.phone}</p>
              <p>{orderDetails?.addressInfo?.notes}</p>
            </div>
          </div>

          <Separator />

          {/* Admin Form */}
          <div>
            <CommonForm
              formControls={[
                {
                  label: "Order Status",
                  name: "status",
                  componentType: "select",
                  options: [
                    { id: "pending", label: "Pending" },
                    { id: "inProcess", label: "In Process" },
                    { id: "inShipping", label: "In Shipping" },
                    { id: "delivered", label: "Delivered" },
                    { id: "rejected", label: "Rejected" },
                  ],
                },
              ]}
              formData={formData}
              setFormData={setFormData}
              buttonText={"Update Order Status"}
              onSubmit={handleUpdateStatus}
            />
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;