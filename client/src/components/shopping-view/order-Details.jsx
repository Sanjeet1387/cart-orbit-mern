import { DialogContent, DialogClose } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import { X } from "lucide-react";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-150 max-h-[80vh] p-0 flex flex-col">
      {/* Fixed Header */}
      <div className="p-6 border-b bg-white sticky top-0 z-10">
        <div className="flex justify-between">
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
      <div className="overflow-y-auto p-6 flex-1">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <p>Order Date</p>
              <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
            </div>
            <div className="flex items-center justify-between">
              <p>Order Price</p>
              <Label>${orderDetails?.totalAmount}</Label>
            </div>
            <div className="flex items-center justify-between">
              <p>Payment method</p>
              <Label>{orderDetails?.paymentMethod}</Label>
            </div>
            <div className="flex items-center justify-between">
              <p>Payment Status</p>
              <Label>{orderDetails?.paymentStatus}</Label>
            </div>
            <div className="flex items-center justify-between">
              <p>Order Status</p>
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

          {/* Order Items */}
          <div className="grid gap-2">
            <div className="font-medium">Order Items</div>
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
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="text-muted-foreground">
              <p>Name: {user.userName}</p>
              <p>Address: {orderDetails?.addressInfo?.address}</p>
              <p>City: {orderDetails?.addressInfo?.city}</p>
              <p>Pincode: {orderDetails?.addressInfo?.pincode}</p>
              <p>Phone: {orderDetails?.addressInfo?.phone}</p>
              <p>Notes: {orderDetails?.addressInfo?.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
