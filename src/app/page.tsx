// src/app/page.tsx
"use client";

import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/store/store";
import { fetchSalesData } from "@/store/slices/salesSlice";
import { Sidebar } from "@/components/Sidebar";
import { DataTable } from "@/components/DataTable";
import { SalesChart } from "@/components/SalesChart";

function Loader() {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { data: salesData, status: salesStatus } = useSelector(
    (state: RootState) => state.sales
  );

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (isLoggedIn && salesStatus === "idle") {
      dispatch(fetchSalesData());
    }
  }, [isLoggedIn, salesStatus, dispatch]);

  const chartData = useMemo(() => {
    if (salesStatus !== "succeeded") return [];

    const monthlySales: { [key: string]: number } = {};
    salesData.forEach((sale) => {
      const month = new Date(sale.date).toLocaleString("en-US", {
        month: "short",
      });
      monthlySales[month] = (monthlySales[month] || 0) + sale.amount;
    });

    const monthOrder = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return monthOrder
      .filter((month) => monthlySales[month] !== undefined)
      .map((month) => ({
        name: month,
        total: Math.floor(monthlySales[month]),
      }));
  }, [salesData, salesStatus]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <main className="flex-1 md:pl-64">
        <div className="p-4 md:p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-8">Dashboard</h1>

          {salesStatus === "loading" && <Loader />}

          {salesStatus === "succeeded" && (
            <div className="flex flex-col gap-8">
              <SalesChart data={chartData} />

              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">
                  Recent Sales
                </h2>
                <DataTable data={salesData} />
              </div>
            </div>
          )}

          {salesStatus === "failed" && (
            <div className="text-center p-8 bg-red-100 text-red-700 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold">Failed to load data.</h2>
              <p className="mt-2">Please try refreshing the page.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
