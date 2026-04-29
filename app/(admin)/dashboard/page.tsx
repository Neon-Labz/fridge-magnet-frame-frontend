'use client';

import {
  Bell,
  Boxes,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  LayoutGrid,
  Package,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  SquarePlus,
  Trash2,
  TriangleAlert,
  UserCircle2,
  Users
} from "lucide-react";

const stats = [
  {
    label: "Total Products",
    value: "1,284",
    icon: Package,
    cardClass: "bg-gradient-to-br from-blue-50 to-blue-100",
    iconClass: "text-primary-700",
    valueClass: "text-primary-700"
  },
  {
    label: "Low Stock",
    value: "12 Items",
    icon: TriangleAlert,
    cardClass: "bg-gradient-to-br from-red-50 to-red-100",
    iconClass: "text-red-600",
    valueClass: "text-red-600"
  },
  {
    label: "Active Listings",
    value: "1,150",
    icon: Eye,
    cardClass: "bg-gradient-to-br from-slate-50 to-slate-100",
    iconClass: "text-slate-700",
    valueClass: "text-slate-700"
  }
] as const;

const products = [
  {
    id: "#MAG-29402",
    name: "Black Walnut Gallery Frame",
    category: "Frame",
    price: "$39.99",
    stock: "121 Units",
    sales: "248",
    status: "active"
  },
  {
    id: "#MAG-29401",
    name: "Minimalist Wooden Table",
    category: "Furniture",
    price: "$129.99",
    stock: "45 Units",
    sales: "89",
    status: "active"
  },
  {
    id: "#MAG-29400",
    name: "Ceramic Vase Set",
    category: "Decor",
    price: "$49.99",
    stock: "3 Units",
    sales: "156",
    status: "low-stock"
  }
] as const;

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your inventory overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`${stat.cardClass} rounded-lg p-6`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className={`text-3xl font-bold mt-2 ${stat.valueClass}`}>
                    {stat.value}
                  </p>
                </div>
                <Icon className={`${stat.iconClass} w-12 h-12 opacity-20`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Products</h2>
            <a href="/admin/products/create" className="inline-flex items-center gap-2 px-4 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-800">
              <SquarePlus className="w-4 h-4" />
              Add Product
            </a>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Sales</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{product.price}</td>
                  <td className="px-6 py-4 text-gray-600">{product.stock}</td>
                  <td className="px-6 py-4 text-gray-600">{product.sales}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {product.status === 'active' ? 'Active' : 'Low Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <a href={`/admin/products/${product.id}`} className="text-primary-700 hover:text-primary-900 p-2 hover:bg-gray-200 rounded">
                        <Eye className="w-4 h-4" />
                      </a>
                      <a href={`/admin/products/${product.id}/edit`} className="text-primary-700 hover:text-primary-900 p-2 hover:bg-gray-200 rounded">
                        Edit
                      </a>
                      <button className="text-red-600 hover:text-red-900 p-2 hover:bg-gray-200 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
