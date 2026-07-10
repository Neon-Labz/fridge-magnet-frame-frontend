'use client';

import { useEffect, useState } from 'react';
import type { ChangeEvent, CSSProperties, KeyboardEvent, WheelEvent } from 'react';
import { ImagePlus, Images, X } from 'lucide-react';
import type { PersonalizationFormOption, Product, ProductFormData } from '@/types/product';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: ProductFormData) => boolean | void | Promise<boolean | void>;
  editingProduct?: Product | null;
}

const EMPTY: ProductFormData = {
  name: '',
  productId: '',
  category: 'Wooden Frames',
  stock: 0,
  price: 0,
  description: '',
  personalization: false,
  primaryImage: null,
  galleryImages: [],
};

const MAX_GALLERY = 5;

type FieldErrors = Partial<Record<'name' | 'productId' | 'description', string>>;

export default function AddProductModal({
  isOpen,
  onClose,
  onSubmit,
  editingProduct = null,
}: AddProductModalProps) {
  const [form, setForm] = useState<ProductFormData>(EMPTY);
  const [personalizationOptions, setPersonalizationOptions] = useState<PersonalizationFormOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [galleryError, setGalleryError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (!isOpen) return;

    if (editingProduct) {
      setForm({
        name: editingProduct.name ?? '',
        productId: editingProduct.sku ?? editingProduct.id ?? '',
        category: editingProduct.series ?? 'Wooden Frames',
        stock: Number(editingProduct.stockCount ?? 0),
        price: Number(editingProduct.price ?? 0),
        description: editingProduct.description ?? '',
        personalization: false,
        primaryImage: null,
        galleryImages: [],
      });
    } else {
      setForm(EMPTY);
    }

    setPersonalizationOptions([]);
    setGalleryError(null);
    setFieldErrors({});
  }, [isOpen, editingProduct]);

  if (!isOpen) return null;

  const inputStyle: CSSProperties = {
    height: 50,
    background: '#F3F3F8',
    border: '1px solid #C3C6D4',
    borderRadius: 8,
    fontSize: 16,
    color: '#1A1C1F',
    width: '100%',
    padding: '0 16px',
    outline: 'none',
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name in fieldErrors) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }));
    }

    setForm(prev => ({
      ...prev,
      [name]: name === 'stock' || name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleNumberWheel = (e: WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  const handleNumberKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>, type: 'primary' | 'gallery') => {
    if (!e.target.files) return;

    if (type === 'primary') {
      setForm(prev => ({ ...prev, primaryImage: e.target.files![0] ?? null }));
      return;
    }

    const files = Array.from(e.target.files);
    if (files.length > MAX_GALLERY) {
      setGalleryError(`You can upload a maximum of ${MAX_GALLERY} gallery images.`);
      return;
    }

    setGalleryError(null);
    setForm(prev => ({ ...prev, galleryImages: files }));
  };

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (galleryError) return;

    const errors: FieldErrors = {};
    if (!form.name.trim()) errors.name = 'Product name is required.';
    if (!form.productId.trim()) errors.productId = 'Product ID is required.';
    if (!form.description.trim()) errors.description = 'Description is required.';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const submitData: ProductFormData = {
        ...form,
        price: Number(form.price) || 0,
        stock: Number(form.stock) || 0,
        personalization: false,
        personalizationEnabled: false,
        personalizationOptions: [],
      };

      const shouldReset = await onSubmit?.(submitData);

      if (shouldReset !== false) {
        setForm(EMPTY);
        setPersonalizationOptions([]);
        setGalleryError(null);
        setFieldErrors({});
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div
        className="relative flex w-full flex-col overflow-hidden"
        style={{
          maxWidth: 520,
          maxHeight: '92vh',
          background: '#FFFFFF',
          borderRadius: 16,
          boxShadow: '0px 20px 50px rgba(0,0,0,0.2)',
        }}
      >
        <div className="flex flex-shrink-0 items-start justify-between px-8 pb-6 pt-8" style={{ borderBottom: '1px solid #F1F5F9' }}>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: '#002B73' }}>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="mt-1 text-sm" style={{ color: '#64748B' }}>
              {editingProduct ? 'Update product details.' : 'Enter details for the new gallery item.'}
            </p>
          </div>

          <button type="button" onClick={onClose} className="ml-4 flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100">
            <X size={18} color="#94A3B8" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 space-y-5 overflow-y-auto px-8 py-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold">Product Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Vintage Walnut Frame" style={{ ...inputStyle, border: fieldErrors.name ? '1px solid #BC0000' : inputStyle.border }} />
            {fieldErrors.name && <p className="text-xs font-semibold text-red-700">{fieldErrors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold">Product ID</label>
              <input type="text" name="productId" value={form.productId} onChange={handleChange} placeholder="SKU-000" style={{ ...inputStyle, border: fieldErrors.productId ? '1px solid #BC0000' : inputStyle.border }} />
              {fieldErrors.productId && <p className="text-xs font-semibold text-red-700">{fieldErrors.productId}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold">Stock</label>
              <input type="number" name="stock" value={form.stock === 0 ? '' : form.stock} placeholder="Enter stock" onChange={handleChange} onWheel={handleNumberWheel} onKeyDown={handleNumberKeyDown} min={0} step={1} inputMode="numeric" style={inputStyle} />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold">Price</label>
              <input type="number" name="price" value={form.price === 0 ? '' : form.price} placeholder="Enter price" onChange={handleChange} onWheel={handleNumberWheel} onKeyDown={handleNumberKeyDown} min={0} step="0.01" inputMode="decimal" style={inputStyle} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold">Product Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Provide detailed information..."
              className="w-full resize-none p-4 outline-none"
              style={{
                background: '#F3F3F8',
                border: fieldErrors.description ? '1px solid #BC0000' : '1px solid #C3C6D4',
                borderRadius: 8,
                fontSize: 16,
                color: '#1A1C1F',
                minHeight: 120,
              }}
            />
            {fieldErrors.description && <p className="text-xs font-semibold text-red-700">{fieldErrors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold">Primary Product Image</label>
              <label className="block cursor-pointer">
                <input type="file" accept="image/*" onChange={e => handleFile(e, 'primary')} className="hidden" />
                <div className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#C3C6D4] bg-[#F8FAFC] p-6">
                  <ImagePlus size={23} color="#94A3B8" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Single Upload</span>
                  <span className="text-xs text-slate-400">
                    {form.primaryImage ? form.primaryImage.name : editingProduct?.primaryImageUrl ? 'Current image saved' : 'Main display image'}
                  </span>
                </div>
              </label>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold">Product Gallery</label>
              <label className="block cursor-pointer">
                <input type="file" accept="image/*" multiple onChange={e => handleFile(e, 'gallery')} className="hidden" />
                <div className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#C3C6D4] bg-[#F8FAFC] p-6">
                  <Images size={25} color="#94A3B8" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Multi Upload</span>
                  <span className="text-xs text-slate-400">
                    {form.galleryImages.length > 0 ? `${form.galleryImages.length} images` : `Up to ${MAX_GALLERY} images`}
                  </span>
                </div>
              </label>
              {galleryError && <p className="mt-1 text-xs font-semibold text-red-700">{galleryError}</p>}
            </div>
          </div>
        </form>

        <div className="flex flex-shrink-0 items-center justify-end gap-3 px-8 py-6" style={{ borderTop: '1px solid #F1F5F9', background: '#FAFAFA' }}>
          <button type="button" onClick={onClose} className="flex h-12 items-center justify-center rounded-xl bg-[#E8E8ED] px-6 text-base font-bold text-[#434652]">
            Cancel
          </button>

          <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="flex h-12 items-center justify-center rounded-xl bg-[#BC0000] px-8 text-base font-bold text-white disabled:opacity-70">
            {isSubmitting ? 'Submitting...' : editingProduct ? 'Update Product' : 'Submit Product'}
          </button>
        </div>
      </div>
    </div>
  );
}
