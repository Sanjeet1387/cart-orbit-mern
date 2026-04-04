import AdminOrdersView from "@/components/admin-view/orders";

function AdminOrders() {
  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      {/* Container adjusts padding based on screen size */}
      <div className="max-w-7xl mx-auto">
        <AdminOrdersView />
      </div>
    </div>
  );
}

export default AdminOrders;