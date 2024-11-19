"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function MyOrders() {
  const router = useRouter();
  const token = localStorage.getItem("token");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("You are not logged in");
        }
        throw new Error("Failed to fetch orders");
      }

      return res.json();
    },
    retry: false,
  });

  if (isLoading) return <SkeletonLoader />;

  if (isError) {
    if (data?.message === "You are not logged in") {
      router.push("/");
    }
    return <p>Error: {data?.message || "An error occurred."}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Orders</h1>
      <div className="space-y-4">
        {data.map((order: any) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: any }) {
  return (
    <div className="border rounded-lg p-4 flex items-center gap-4">
      <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden">
        <img
          src={order.items[0]?.image || "/placeholder.jpg"}
          alt={order.items[0]?.name || "Order"}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h2 className="font-medium">Order #{order.id}</h2>
        <p className="text-sm text-gray-500">Status: {order.status}</p>
      </div>

      <Dialog>
        <DialogTrigger>
          <button className="text-blue-500 hover:underline">
            View Details
          </button>
        </DialogTrigger>
        <DialogContent>
          <OrderDetails order={order} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function OrderDetails({ order }: { order: any }) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Order Details</h2>
      <p>
        <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
      </p>
      <p>
        <strong>Address:</strong> {order.address}
      </p>
      <p>
        <strong>Note:</strong> {order.note || "No note provided"}
      </p>
      <h3 className="text-md font-semibold mt-4">Items:</h3>
      <ul className="space-y-2">
        {order.items.map((item: any) => (
          <li key={item.id} className="flex items-center gap-2">
            <img
              src={item.image || "/placeholder.jpg"}
              alt={item.name}
              className="w-12 h-12 object-cover rounded"
            />
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                Quantity: {item.quantity} | ${item.price.toFixed(2)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-20 rounded-lg" />
      ))}
    </div>
  );
}
