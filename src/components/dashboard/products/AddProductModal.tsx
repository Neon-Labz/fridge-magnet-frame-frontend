'use client';

import { useState } from 'react';
import type { ChangeEvent, CSSProperties } from 'react';
import { ImagePlus, Images, Plus, Trash2, X } from 'lucide-react';
import type { PersonalizationFormOption, ProductFormData } from '@/types/product';

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

const DEFAULT_PERSONALIZATION_OPTIONS: PersonalizationFormOption[] = [
  { label: 'Without Frame', price: 1500, note: '' },
  { label: 'With Frame', price: 2500, note: 'With frame contain White and Black' },
];

const getDefaultPersonalizationOptions = () =>
  DEFAULT_PERSONALIZATION_OPTIONS.map(option => ({ ...option }));

const MAX_GALLERY = 5;

type FieldErrors = Partial<Record<'name' | 'productId' | 'description', string>>;

export default function AddProductModal({ isOpen, onClose, onSubmit }: AddProductModalProps) {
  const [form, setForm] = useState<ProductFormData>(EMPTY);
  const [personalizationOptions, setPersonalizationOptions] = useState<PersonalizationFormOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [galleryError, setGalleryError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

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

  const compactInputStyle: CSSProperties = {
    ...inputStyle,
    height: 40,
    fontSize: 14,
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

  const updatePersonalizationOption = (
    idx: number,
    field: keyof Pick<PersonalizationFormOption, 'label' | 'price' | 'note'>,
    value: string,
  ) => {
    setPersonalizationOptions(prev =>
      prev.map((option, optionIdx) =>
        optionIdx === idx
          ? { ...option, [field]: field === 'price' ? parseFloat(value) || 0 : value }
          : option,
      ),
    );
  };

  const addPersonalizationOption = () => {
    setPersonalizationOptions(prev => {
      if (prev.length > 0) {
        return prev;
      }

      return getDefaultPersonalizationOptions();
    });
  };

  const removePersonalizationOption = (idx: number) => {
    setPersonalizationOptions(prev => prev.filter((_, optionIdx) => optionIdx !== idx));
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

  const getCleanPersonalizationOptions = () =>
    personalizationOptions
      .map(option => ({
        ...option,
        label: option.label.trim(),
        note: option.note?.trim() ?? '',
        price: Number(option.price) || 0,
      }))
      .filter(option => option.label);

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (galleryError) return;

    const finalPersonalizationOptions = getCleanPersonalizationOptions();
    const productPrice = finalPersonalizationOptions[0]?.price ?? 0;

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
        price: productPrice,
        personalization: finalPersonalizationOptions.length > 0,
        personalizationEnabled: finalPersonalizationOptions.length > 0,
        personalizationOptions: finalPersonalizationOptions,
      };

      const shouldReset = await onSubmit?.(submitData);

      if (shouldReset !== false) {
        setForm(EMPTY);
        setPersonalizationOptions([]);
        setGalleryError(null);
        setFieldErrors({});
      }
    } catch {
      // Parent submit handler owns the user-facing error message.
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
        <div
          className="flex flex-shrink-0 items-start justify-between px-8 pb-6 pt-8"
          style={{ borderBottom: '1px solid #F1F5F9' }}
        >
          <div>
            <h2
              className="text-2xl font-bold"
              style={{ color: '#002B73', fontFamily: 'var(--font-manrope, Manrope, sans-serif)' }}
            >
              Add New Product
            </h2>
            <p className="mt-1 text-sm" style={{ color: '#64748B' }}>
              Enter details for the new gallery item.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="ml-4 flex flex-shrink-0 items-center justify-center rounded-full hover:bg-slate-100"
            style={{ width: 32, height: 32 }}
          >
            <X size={18} color="#94A3B8" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 space-y-5 overflow-y-auto px-8 py-6">
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
                  className="cursor-pointer appearance-none"
                  style={inputStyle}
                >
                  {CATEGORIES.map(category => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  v
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
            {fieldErrors.description && (
              <p className="text-xs font-semibold" style={{ color: '#BC0000' }}>{fieldErrors.description}</p>
            )}
          </div>

          <div className="pt-2" style={{ borderTop: '1px solid #F1F5F9' }}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold" style={{ color: '#1A1C1F' }}>
                  Personalization Options
                </p>
                <p className="mt-0.5 text-xs" style={{ color: '#64748B' }}>
                  Allow customers to add custom text or engravings
                </p>
              </div>

              <button
                type="button"
                onClick={addPersonalizationOption}
                className="flex items-center justify-center rounded-full transition hover:bg-blue-50"
                style={{ width: 36, height: 36, color: '#002B73' }}
                title="Add personalization option"
              >
                <Plus size={22} />
              </button>
            </div>

            {personalizationOptions.length > 0 && (
              <div className="mt-4 space-y-3">
                {personalizationOptions.map((option, idx) => (
                  <div key={idx}>
                    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_36px] gap-3">
                      <input
                        type="text"
                        value={option.label}
                        onChange={(e) => updatePersonalizationOption(idx, 'label', e.target.value)}
                        placeholder="Without Frame"
                        style={compactInputStyle}
                      />

                      <div className="relative">
                        <span
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold"
                          style={{ color: '#747784' }}
                        >
                          Rs
                        </span>
                        <input
                          type="number"
                          className="no-spinner"
                          value={option.price}
                          onChange={(e) => updatePersonalizationOption(idx, 'price', e.target.value)}
                          min={0}
                          placeholder="0.00"
                          style={{ ...compactInputStyle, paddingLeft: 42 }}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => removePersonalizationOption(idx)}
                        disabled={personalizationOptions.length <= 1}
                        className="flex items-center justify-center rounded-lg transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30"
                        style={{ height: 40, color: '#BC0000' }}
                        title="Remove personalization option"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {option.note && (
                      <p className="mt-1 pl-4 text-[11px]" style={{ color: '#747784' }}>
                        Note: {option.note}
                      </p>
                    )}
                  </div>
                ))}
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
                <p className="mt-1 text-xs font-semibold" style={{ color: '#BC0000' }}>
                  {galleryError}
                </p>
              )}
            </div>
          </div>
        </form>

        <div
          className="flex flex-shrink-0 items-center justify-end gap-3 px-8 py-6"
          style={{ borderTop: '1px solid #F1F5F9', background: '#FAFAFA' }}
        >
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center text-base font-bold transition hover:opacity-80"
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
            className="flex items-center justify-center text-base font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
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
