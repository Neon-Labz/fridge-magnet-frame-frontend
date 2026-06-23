'use client';

import { useState } from 'react';
import type { ChangeEvent, CSSProperties } from 'react';
import { X, ImagePlus, Images, Plus } from 'lucide-react';
import type { ProductFormData } from '@/types/product';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: ProductFormData) => boolean | void | Promise<boolean | void>;
}

const CATEGORIES = ['Wooden Frames', 'Metal Frames', 'Shadow Boxes', 'Gallery Frames', 'Heritage Frames'];

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

type FieldErrors = Partial<Record<'name' | 'productId' | 'description' | 'price', string>>;

export default function AddProductModal({ isOpen, onClose, onSubmit }: AddProductModalProps) {
  const [form, setForm] = useState<ProductFormData>(EMPTY);
  const [personalizationText, setPersonalizationText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [galleryError, setGalleryError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

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

  const handleFile = (e: ChangeEvent<HTMLInputElement>, type: 'primary' | 'gallery') => {
    if (!e.target.files) return;

    if (type === 'primary') {
      setForm(prev => ({ ...prev, primaryImage: e.target.files![0] ?? null }));
    } else {
      const files = Array.from(e.target.files!);
      if (files.length > MAX_GALLERY) {
        setGalleryError(`You can upload a maximum of ${MAX_GALLERY} gallery images.`);
        return;
      }
      setGalleryError(null);
      setForm(prev => ({ ...prev, galleryImages: files }));
    }
  };

  const handleSubmit = async (e: { preventDefault(): void }) => {
  e.preventDefault();
  if (galleryError) return;

  const errors: FieldErrors = {};
  if (!form.name.trim()) errors.name = 'Product name is required.';
  if (!form.productId.trim()) errors.productId = 'Product ID is required.';
  if (!form.description.trim()) errors.description = 'Description is required.';
  if (!form.price || form.price <= 0) errors.price = 'Price must be greater than 0.';
  if (Object.keys(errors).length > 0) {
    setFieldErrors(errors);
    return;
  }

  setIsSubmitting(true);

  try {
    const submitData = {
      ...form,

      personalizationEnabled: form.personalization,

      personalizationOptions: personalizationText
        .split(',')
        .map(item => item.trim())
        .filter(Boolean),
    };

    const shouldReset = await onSubmit?.(
      submitData as unknown as ProductFormData
    );

    if (shouldReset !== false) {
      setForm(EMPTY);
      setPersonalizationText('');
      setGalleryError(null);
      setFieldErrors({});
    }
  } catch {
    // Parent submit handler owns the user-facing error message.
  } finally {
    setIsSubmitting(false);
  }
};

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div
        className="relative flex flex-col w-full overflow-hidden"
        style={{
          maxWidth: 520,
          maxHeight: '92vh',
          background: '#FFFFFF',
          borderRadius: 16,
          boxShadow: '0px 20px 50px rgba(0,0,0,0.2)',
        }}
      >
        <div
          className="flex-shrink-0 flex items-start justify-between px-8 pt-8 pb-6"
          style={{ borderBottom: '1px solid #F1F5F9' }}
        >
          <div>
            <h2
              className="font-bold text-2xl"
              style={{
                color: '#002B73',
                fontFamily: 'var(--font-manrope, Manrope, sans-serif)',
              }}
            >
              Add New Product
            </h2>
            <p className="text-sm mt-1" style={{ color: '#64748B' }}>
              Enter details for the new gallery item.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center rounded-full hover:bg-slate-100 flex-shrink-0 ml-4"
            style={{ width: 32, height: 32 }}
          >
            <X size={18} color="#94A3B8" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-6 space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-semibold" style={{ color: '#1A1C1F' }}>
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Vintage Walnut Frame"
              style={{ ...inputStyle, border: fieldErrors.name ? '1px solid #BC0000' : inputStyle.border }}
            />
            {fieldErrors.name && (
              <p className="text-xs font-semibold" style={{ color: '#BC0000' }}>{fieldErrors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold" style={{ color: '#1A1C1F' }}>
                Product ID
              </label>
              <input
                type="text"
                name="productId"
                value={form.productId}
                onChange={handleChange}
                placeholder="SKU-000"
                style={{ ...inputStyle, border: fieldErrors.productId ? '1px solid #BC0000' : inputStyle.border }}
              />
              {fieldErrors.productId && (
                <p className="text-xs font-semibold" style={{ color: '#BC0000' }}>{fieldErrors.productId}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold" style={{ color: '#1A1C1F' }}>
                Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="appearance-none cursor-pointer"
                  style={inputStyle}
                >
                  {CATEGORIES.map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                  ▾
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold" style={{ color: '#1A1C1F' }}>
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                min={0}
                style={inputStyle}
              />
            </div>

            <div className="space-y-2">
              <label className="no-spinner block text-sm font-semibold" style={{ color: '#1A1C1F' }}>
                Price
              </label>
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold"
                  style={{ color: '#747784' }}
                >
                  LKR
                </span>

                <input
                  type="number"
                  className="no-spinner"
                  name="price"
                  value={form.price}
                  min={0}
                  onChange={handleChange}
                  placeholder="1200"
                  style={{ ...inputStyle, paddingLeft: 60, border: fieldErrors.price ? '1px solid #BC0000' : inputStyle.border }}
                />
              </div>
              {fieldErrors.price && (
                <p className="text-xs font-semibold" style={{ color: '#BC0000' }}>{fieldErrors.price}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold" style={{ color: '#1A1C1F' }}>
              Product Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Provide detailed information about the craftsmanship, materials, and artistic value..."
              className="w-full resize-none outline-none p-4"
              style={{
                background: '#F3F3F8',
                border: fieldErrors.description ? '1px solid #BC0000' : '1px solid #C3C6D4',
                borderRadius: 8,
                fontSize: 16,
                color: '#1A1C1F',
                minHeight: 120,
              }}
            />
            {fieldErrors.description && (
              <p className="text-xs font-semibold" style={{ color: '#BC0000' }}>{fieldErrors.description}</p>
            )}
          </div>

          <div className="pt-2" style={{ borderTop: '1px solid #F1F5F9' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold" style={{ color: '#1A1C1F' }}>
                  Personalization Options
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>
                  Add options separated by comma
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setForm(prev => ({
                    ...prev,
                    personalization: !prev.personalization,
                  }))
                }
                className="flex items-center justify-center rounded-full transition hover:bg-blue-50"
                style={{ width: 36, height: 36, color: '#002B73' }}
              >
                <Plus size={22} />
              </button>
            </div>

            {form.personalization && (
  <div className="mt-4 space-y-4">
    <div>
      <label className="block text-sm font-semibold mb-2">
        Frame Option
      </label>

      <select
        value={personalizationText}
        onChange={(e) => setPersonalizationText(e.target.value)}
        style={inputStyle}
      >
        <option value="">Select option</option>
        <option value="With Frame">With Frame</option>
        <option value="Without Frame">Without Frame</option>
      </select>
    </div>

    {personalizationText === "With Frame" && (
      <div>
        <label className="block text-sm font-semibold mb-2">
          Select Color
        </label>

        <select
          onChange={(e) =>
            setPersonalizationText(`With Frame, ${e.target.value}`)
          }
          style={inputStyle}
        >
          <option value="">Select color</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
        </select>
      </div>
    )}
  </div>
)}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold" style={{ color: '#1A1C1F' }}>
                Primary Product Image
              </label>
              <label className="block cursor-pointer">
                <input type="file" accept="image/*" onChange={e => handleFile(e, 'primary')} className="hidden" />
                <div
                  className="flex flex-col items-center justify-center gap-2 p-6"
                  style={{
                    background: '#F8FAFC',
                    border: '2px dashed #C3C6D4',
                    borderRadius: 12,
                    minHeight: 120,
                  }}
                >
                  <ImagePlus size={23} color="#94A3B8" />
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#64748B' }}>
                    Single Upload
                  </span>
                  <span className="text-xs" style={{ color: '#94A3B8' }}>
                    {form.primaryImage ? form.primaryImage.name : 'Main display image'}
                  </span>
                </div>
              </label>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold" style={{ color: '#1A1C1F' }}>
                Product Gallery
              </label>
              <label className="block cursor-pointer">
                <input type="file" accept="image/*" multiple onChange={e => handleFile(e, 'gallery')} className="hidden" />
                <div
                  className="flex flex-col items-center justify-center gap-2 p-6"
                  style={{
                    background: '#F8FAFC',
                    border: `2px dashed ${galleryError ? '#BC0000' : '#C3C6D4'}`,
                    borderRadius: 12,
                    minHeight: 120,
                  }}
                >
                  <Images size={25} color={galleryError ? '#BC0000' : '#94A3B8'} />
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#64748B' }}>
                    Multi Upload
                  </span>
                  <span className="text-xs" style={{ color: '#94A3B8' }}>
                    {form.galleryImages.length > 0 ? `${form.galleryImages.length} images` : `Up to ${MAX_GALLERY} images`}
                  </span>
                </div>
              </label>
              {galleryError && (
                <p className="text-xs font-semibold mt-1" style={{ color: '#BC0000' }}>
                  {galleryError}
                </p>
              )}
            </div>
          </div>
        </form>

        <div
          className="flex-shrink-0 flex items-center justify-end gap-3 px-8 py-6"
          style={{ borderTop: '1px solid #F1F5F9', background: '#FAFAFA' }}
        >
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center font-bold text-base transition hover:opacity-80"
            style={{
              height: 48,
              padding: '0 24px',
              background: '#E8E8ED',
              borderRadius: 12,
              color: '#434652',
            }}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center justify-center font-bold text-base text-white transition hover:opacity-90"
            style={{
              height: 48,
              padding: '0 32px',
              background: '#BC0000',
              borderRadius: 12,
              boxShadow: '0px 10px 15px -3px rgba(188,0,0,0.25)',
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Product'}
          </button>
        </div>
      </div>
    </div>
  );
}