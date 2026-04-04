import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function PaypalReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);

  // NEW: PayPal returns `token` (orderID)
  const paypalOrderID = params.get("token");

  useEffect(() => {
    if (paypalOrderID) {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      if (!orderId) {
        navigate("/shop/cart");
        return;
      }

      dispatch(
        capturePayment({
          paypalOrderID, 
          orderId,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          sessionStorage.removeItem("currentOrderId");
          navigate("/shop/payment-success");
        } else {
          navigate("/shop/payment-failed");
        }
      });
    }
  }, [paypalOrderID, dispatch, navigate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment... Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalReturnPage;