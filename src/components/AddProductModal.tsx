'use client';

import { X, Upload } from 'lucide-react';
import { useState } from 'react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (formData: ProductFormData) => void;
}

interface ProductFormData {
  name: string;
  productId: string;
  category: string;
  stock: number;
  price: number;
  description: string;
  primaryImage: File | null;
  galleryImages: File[];
}

export default function AddProductModal({ isOpen, onClose, onSubmit }: AddProductModalProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    productId: '',
    category: 'Wooden Frames',
    stock: 0,
    price: 0,
    description: '',
    primaryImage: null,
    galleryImages: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'stock' || name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'primary' | 'gallery') => {
    if (e.target.files) {
      if (type === 'primary') {
        setFormData(prev => ({
          ...prev,
          primaryImage: e.target.files?.[0] || null,
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          galleryImages: Array.from(e.target.files || []),
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 rounded-t-3xl px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-blue-900">Add New Product</h2>
              <p className="text-sm text-slate-600 mt-1">Enter details for inventory gallery item.</p>
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-2 hover:bg-gray-100 rounded-full transition"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Product Name */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Vintage Walnut Frame"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
            />
          </div>

          {/* Product ID & Category */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">Product ID</label>
              <input
                type="text"
                name="productId"
                value={formData.productId}
                onChange={handleInputChange}
                placeholder="SKU-000"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition cursor-pointer appearance-none"
              >
                <option>Wooden Frames</option>
                <option>Furniture</option>
                <option>Decor</option>
                <option>Lighting</option>
              </select>
            </div>
          </div>

          {/* Stock & Price */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">Price</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-500 font-semibold">$</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                />
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">Product Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Provide detailed information about the craftsmanship, materials, and artistic value..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition resize-none"
            />
          </div>

          {/* Personalization Options */}
          <div className="border-t border-slate-100 pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Personalization Options</h3>
                <p className="text-xs text-slate-600 mt-0.5">Allow customers to add custom text or engravings</p>
              </div>
              <button
                type="button"
                aria-label="Add personalization option"
                className="text-[40px] leading-[24px] font-normal text-blue-900"
              >
                +
              </button>
            </div>
          </div>

          {/* Image Uploads */}
          <div className="grid grid-cols-2 gap-6">
            {/* Primary Image */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">Primary Product Image</label>
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'primary')}
                  className="hidden"
                />
                <div className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition flex flex-col items-center justify-center min-h-[180px]">
                  <Upload className="w-6 h-6 text-slate-400 mb-2" />
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Single Upload</p>
                  <p className="text-xs text-slate-400 mt-1">Main display image</p>
                  {formData.primaryImage && (
                    <p className="text-xs text-green-600 mt-2 font-medium">{formData.primaryImage.name}</p>
                  )}
                </div>
              </label>
            </div>

            {/* Gallery Images */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">Product Gallery</label>
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload(e, 'gallery')}
                  className="hidden"
                />
                <div className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 hover:bg-gray-100 transition flex flex-col items-center justify-center min-h-[180px]">
                  <Upload className="w-6 h-6 text-slate-400 mb-2" />
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Multi Upload</p>
                  <p className="text-xs text-slate-400 mt-1">Grid of detail shots</p>
                  {formData.galleryImages.length > 0 && (
                    <p className="text-xs text-green-600 mt-2 font-medium">{formData.galleryImages.length} images selected</p>
                  )}
                </div>
              </label>
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-slate-100 rounded-b-3xl px-8 py-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 text-slate-700 font-bold bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-red-700 text-white font-bold rounded-lg hover:bg-red-800 transition shadow-lg"
          >
            Submit Product
          </button>
        </div>
      </div>
    </div>
  );
}
