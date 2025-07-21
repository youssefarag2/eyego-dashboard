"use client";

import { useState, useMemo } from "react";
import { Sale } from "@/lib/mockData";
import { PaginationControls } from "./PaginationControls";
import { ArrowUp, ArrowDown, Search } from "lucide-react";

// CORRECTED: Full implementation of helper functions and objects
const regionColorMap: Record<Sale["region"], string> = {
  North: "bg-blue-100 text-blue-800",
  South: "bg-green-100 text-green-800",
  East: "bg-yellow-100 text-yellow-800",
  West: "bg-purple-100 text-purple-800",
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const ITEMS_PER_PAGE = 5;

type SortConfig = {
  key: keyof Sale;
  direction: "ascending" | "descending";
} | null;

interface DataTableProps {
  data: Sale[];
}

export function DataTable({ data }: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [filterText, setFilterText] = useState("");

  // filter logic

  const filteredData = useMemo(() => {
    let filterableData = [...data];
    if (filterText) {
      filterableData = filterableData.filter((item) =>
        item.product.toLowerCase().includes(filterText.toLowerCase())
      );
    }
    return filterableData;
  }, [data, filterText]);

  // sorting logic
  const sortedData = useMemo(() => {
    const sortableData = [...filteredData];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const requestSort = (key: keyof Sale) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page after sorting
  };

  const getSortIcon = (key: keyof Sale) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === "ascending" ? (
      <ArrowUp className="inline ml-1 h-4 w-4" />
    ) : (
      <ArrowDown className="inline ml-1 h-4 w-4" />
    );
  };

  if (!data.length) {
    return <p className="text-center text-gray-500">No data available.</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search by product..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                <button
                  onClick={() => requestSort("product")}
                  className="flex items-center"
                >
                  Product {getSortIcon("product")}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                <button
                  onClick={() => requestSort("region")}
                  className="flex items-center"
                >
                  Region {getSortIcon("region")}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                <button
                  onClick={() => requestSort("date")}
                  className="flex items-center"
                >
                  Date {getSortIcon("date")}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                <button
                  onClick={() => requestSort("amount")}
                  className="flex items-center"
                >
                  Amount {getSortIcon("amount")}
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((sale) => (
              <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {sale.product}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      regionColorMap[sale.region]
                    }`}
                  >
                    {sale.region}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(sale.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(sale.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
