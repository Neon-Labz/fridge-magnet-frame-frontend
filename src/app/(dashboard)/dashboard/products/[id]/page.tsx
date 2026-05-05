'use client';

import { ArrowLeft, Edit2 } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = {
    id: params.id,
    name: "Black Walnut Gallery Frame",
    category: "Frame",
    price: "$39.99",
    stock: "121 Units",
    sales: "248",
    description: "Beautiful black walnut gallery frame perfect for displaying your favorite photos and artwork.",
    status: "active",
    sku: "BWF-2024-001",
    createdAt: "January 15, 2024"
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="inline-flex items-center justify-center w-10 h-10 hover:bg-gray-200 rounded-lg">
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-600 mt-2">Product ID: {product.id}</p>
          </div>
        </div>
        <Link href={`/admin/products/${product.id}/edit`} className="inline-flex items-center gap-2 px-4 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-800">
          <Edit2 className="w-4 h-4" />
          Edit Product
        </Link>
      </div>

      {/* Product Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">SKU</p>
                <p className="font-medium text-gray-900">{product.sku}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="font-medium text-gray-900">{product.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Price</p>
                <p className="font-medium text-gray-900">{product.price}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Stock</p>
                <p className="font-medium text-gray-900">{product.stock}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Status Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Status</h3>
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
              {product.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Statistics</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-gray-900">{product.sales}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Created</p>
                <p className="text-sm text-gray-900">{product.createdAt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
