import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  // console.log(orderDetails, "orderList");

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
<Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Desktop Table for screens md+ */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-[800px] table-auto w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Order Date</th>
                <th className="px-4 py-2 text-left">Order Status</th>
                <th className="px-4 py-2 text-left">Order Price</th>
                <th className="px-4 py-2 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              {orderList?.map((orderItem) => (
                <tr key={orderItem._id} className="border-t">
                  <td className="px-4 py-2">{orderItem._id}</td>
                  <td className="px-4 py-2">{orderItem.orderDate.split("T")[0]}</td>
                  <td className="px-4 py-2">
                    <Badge
                      className={`py-1 px-3 ${
                        orderItem.orderStatus === "confirmed"
                          ? "bg-green-500"
                          : orderItem.orderStatus === "rejected"
                          ? "bg-red-600"
                          : "bg-black"
                      }`}
                    >
                      {orderItem.orderStatus}
                    </Badge>
                  </td>
                  <td className="px-4 py-2">${orderItem.totalAmount}</td>
                  <td className="px-4 py-2">
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={() => {
                        setOpenDetailsDialog(false);
                        dispatch(resetOrderDetails());
                      }}
                    >
                      <Button onClick={() => handleFetchOrderDetails(orderItem._id)}>
                        View Details
                      </Button>
                      <AdminOrderDetailsView orderDetails={orderDetails} />
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card layout for screens < md */}
        <div className="md:hidden flex flex-col gap-4">
          {orderList?.map((orderItem) => (
            <Card key={orderItem._id} className="border p-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Order ID:</span>
                <span>{orderItem._id}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Order Date:</span>
                <span>{orderItem.orderDate.split("T")[0]}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Status:</span>
                <Badge
                  className={`py-1 px-3 ${
                    orderItem.orderStatus === "confirmed"
                      ? "bg-green-500"
                      : orderItem.orderStatus === "rejected"
                      ? "bg-red-600"
                      : "bg-black"
                  }`}
                >
                  {orderItem.orderStatus}
                </Badge>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Price:</span>
                <span>${orderItem.totalAmount}</span>
              </div>
              <Dialog
                open={openDetailsDialog}
                onOpenChange={() => {
                  setOpenDetailsDialog(false);
                  dispatch(resetOrderDetails());
                }}
              >
                <Button
                  className="mt-2 w-full"
                  onClick={() => handleFetchOrderDetails(orderItem._id)}
                >
                  View Details
                </Button>
                <AdminOrderDetailsView orderDetails={orderDetails} />
              </Dialog>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
