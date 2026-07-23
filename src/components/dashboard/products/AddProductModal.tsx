'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, CSSProperties, KeyboardEvent, WheelEvent } from 'react';
import { ImagePlus, Images, X } from 'lucide-react';
import type { PersonalizationFormOption, Product, ProductFormData } from '@/types/product';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: ProductFormData) => boolean | void | Promise<boolean | void>;
  editingProduct?: Product | null;
  // Auto-generated Product ID for CREATE mode (e.g. "MG-011"), computed by
  // the parent page. Ignored when editingProduct is set, since edit mode
  // always locks to the product's existing sku.
  autoProductId?: string;
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

type FieldErrors = Partial<Record<'name' | 'productId' | 'description' | 'price' | 'primaryImage', string>>;

export default function AddProductModal({
  isOpen,
  onClose,
  onSubmit,
  editingProduct = null,
  autoProductId = '',
}: AddProductModalProps) {
  const [form, setForm] = useState<ProductFormData>(EMPTY);
  const [personalizationOptions, setPersonalizationOptions] = useState<PersonalizationFormOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [galleryError, setGalleryError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  // BUG-FIX (gallery not showing in edit mode): saved gallery URLs live on
  // editingProduct.galleryImageUrls, separate from any newly-picked Files.
  // We track them here, plus which of them the user has removed.
  const [existingGalleryUrls, setExistingGalleryUrls] = useState<string[]>([]);
  const [removedGalleryUrls, setRemovedGalleryUrls] = useState<string[]>([]);

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
      setExistingGalleryUrls(editingProduct.galleryImageUrls ?? []);
    } else {
      // BUG fix: Product ID is auto-generated (e.g. "MG-011"), not typed by
      // the admin. The parent page computes this and passes it in.
      setForm({ ...EMPTY, productId: autoProductId });
      setExistingGalleryUrls([]);
    }

    setRemovedGalleryUrls([]);
    setPersonalizationOptions([]);
    setGalleryError(null);
    setFieldErrors({});
  }, [isOpen, editingProduct, autoProductId]);

  // BUG-013 fix: build an actual preview URL for the primary image —
  // a freshly picked file gets an object URL, otherwise fall back to the
  // product's already-saved image when editing.
  const primaryImagePreviewUrl = useMemo(() => {
    if (form.primaryImage) {
      return URL.createObjectURL(form.primaryImage);
    }
    return editingProduct?.primaryImageUrl || null;
  }, [form.primaryImage, editingProduct?.primaryImageUrl]);

  useEffect(() => {
    return () => {
      if (form.primaryImage && primaryImagePreviewUrl) {
        URL.revokeObjectURL(primaryImagePreviewUrl);
      }
    };
  }, [form.primaryImage, primaryImagePreviewUrl]);

  // BUG-013 fix: same idea for gallery thumbnails (newly picked files only —
  // saved gallery URLs are already plain URLs and need no object URL).
  const galleryPreviewUrls = useMemo(
    () => form.galleryImages.map((file) => URL.createObjectURL(file)),
    [form.galleryImages],
  );

  useEffect(() => {
    return () => {
      galleryPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [galleryPreviewUrls]);

  // Existing (saved) gallery images still kept, i.e. not marked for removal.
  const visibleExistingGalleryUrls = useMemo(
    () => existingGalleryUrls.filter((url) => !removedGalleryUrls.includes(url)),
    [existingGalleryUrls, removedGalleryUrls],
  );

  const totalGalleryCount = visibleExistingGalleryUrls.length + form.galleryImages.length;

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
      const file = e.target.files[0] ?? null;
      setForm(prev => ({ ...prev, primaryImage: file }));
      if (file) {
        setFieldErrors(prev => ({ ...prev, primaryImage: undefined }));
      }
      return;
    }

    const newFiles = Array.from(e.target.files);
    // Append to whatever new files are already picked, so adding more via the
    // "+" tile doesn't wipe out earlier picks.
    const combinedNewFiles = [...form.galleryImages, ...newFiles];
    const totalAfterAdd = visibleExistingGalleryUrls.length + combinedNewFiles.length;

    if (totalAfterAdd > MAX_GALLERY) {
      setGalleryError(`You can have a maximum of ${MAX_GALLERY} gallery images in total.`);
      e.target.value = '';
      return;
    }

    setGalleryError(null);
    setForm(prev => ({ ...prev, galleryImages: combinedNewFiles }));
    e.target.value = '';
  };

  const handleRemovePrimaryImage = () => {
    setForm(prev => ({ ...prev, primaryImage: null }));
  };

  const handleRemoveExistingGalleryImage = (url: string) => {
    setRemovedGalleryUrls(prev => [...prev, url]);
    setGalleryError(null);
  };

  const handleRemoveNewGalleryImage = (idx: number) => {
    setForm(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== idx),
    }));
    setGalleryError(null);
  };

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (galleryError) return;

    const errors: FieldErrors = {};
    if (!form.name.trim()) errors.name = 'Product name is required.';
    if (!form.productId.trim()) errors.productId = 'Product ID is required.';
    if (!form.description.trim()) errors.description = 'Description is required.';

    if (!form.price || Number(form.price) <= 0) {
      errors.price = 'Price is required.';
    }

    if (!form.primaryImage && !editingProduct?.primaryImageUrl) {
      errors.primaryImage = 'Primary image is required.';
    }

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
        existingGalleryUrls: visibleExistingGalleryUrls,
        removedGalleryUrls,
      };

      const shouldReset = await onSubmit?.(submitData);

      if (shouldReset !== false) {
        setForm(EMPTY);
        setExistingGalleryUrls([]);
        setRemovedGalleryUrls([]);
        setPersonalizationOptions([]);
        setGalleryError(null);
        setFieldErrors({});
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const canAddMoreGallery = totalGalleryCount < MAX_GALLERY;

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
              {/* BUG fix: Product ID is auto-generated on create and fixed on
                  edit — never manually typed, so it's always read-only. */}
              <input
                type="text"
                name="productId"
                value={form.productId || (editingProduct ? '' : 'Generating…')}
                readOnly
                disabled
                placeholder="Auto-generated"
                style={{ ...inputStyle, background: '#EDEEF3', color: '#64748B', cursor: 'not-allowed' }}
              />
              {fieldErrors.productId && <p className="text-xs font-semibold text-red-700">{fieldErrors.productId}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold">Stock</label>
              <input type="number" name="stock" value={form.stock === 0 ? '' : form.stock} placeholder="Enter stock" onChange={handleChange} onWheel={handleNumberWheel} onKeyDown={handleNumberKeyDown} min={0} step={1} inputMode="numeric" style={inputStyle} />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold">Price</label>
              <input
                type="number"
                name="price"
                value={form.price === 0 ? '' : form.price}
                placeholder="Enter price"
                onChange={handleChange}
                onWheel={handleNumberWheel}
                onKeyDown={handleNumberKeyDown}
                min={0}
                step="0.01"
                inputMode="decimal"
                style={{ ...inputStyle, border: fieldErrors.price ? '1px solid #BC0000' : inputStyle.border }}
              />
              {fieldErrors.price && <p className="text-xs font-semibold text-red-700">{fieldErrors.price}</p>}
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

              {/* BUG-013 fix: show the actual image (new pick or saved one) instead of just text */}
              {primaryImagePreviewUrl ? (
                <div
                  className="relative overflow-hidden rounded-xl"
                  style={{ height: 120, border: `2px solid ${fieldErrors.primaryImage ? '#BC0000' : '#C3C6D4'}` }}
                >
                  <img src={primaryImagePreviewUrl} alt="Primary preview" className="h-full w-full object-cover" />

                  <button
                    type="button"
                    onClick={handleRemovePrimaryImage}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white"
                  >
                    <X size={14} color="#434652" />
                  </button>

                  <label className="absolute bottom-0 left-0 right-0 cursor-pointer bg-black/50 py-1.5 text-center text-xs font-semibold text-white">
                    Replace image
                    <input type="file" accept="image/*" onChange={e => handleFile(e, 'primary')} className="hidden" />
                  </label>
                </div>
              ) : (
                <label className="block cursor-pointer">
                  <input type="file" accept="image/*" onChange={e => handleFile(e, 'primary')} className="hidden" />
                  <div
                    className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6"
                    style={{ borderColor: fieldErrors.primaryImage ? '#BC0000' : '#C3C6D4', background: '#F8FAFC' }}
                  >
                    <ImagePlus size={23} color="#94A3B8" />
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Single Upload</span>
                    <span className="text-xs text-slate-400">Main display image</span>
                  </div>
                </label>
              )}
              {fieldErrors.primaryImage && <p className="text-xs font-semibold text-red-700">{fieldErrors.primaryImage}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold">Product Gallery</label>

              {/* BUG fix: show saved gallery images (visibleExistingGalleryUrls)
                  alongside any newly-picked files (galleryPreviewUrls). Each
                  thumbnail — saved or new — has its own remove button. */}
              {totalGalleryCount > 0 ? (
                <div
                  className="flex min-h-[120px] flex-wrap content-start gap-2 rounded-xl border-2 border-dashed p-3"
                  style={{ borderColor: '#C3C6D4', background: '#F8FAFC' }}
                >
                  {visibleExistingGalleryUrls.map((url) => (
                    <div key={url} className="relative h-14 w-14 overflow-hidden rounded-lg border border-[#E2E4ED]">
                      <img src={url} alt="Saved gallery image" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveExistingGalleryImage(url)}
                        className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white/90"
                      >
                        <X size={10} color="#434652" />
                      </button>
                    </div>
                  ))}

                  {galleryPreviewUrls.map((url, idx) => (
                    <div key={url} className="relative h-14 w-14 overflow-hidden rounded-lg border border-[#E2E4ED]">
                      <img src={url} alt={`New gallery ${idx + 1}`} className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveNewGalleryImage(idx)}
                        className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white/90"
                      >
                        <X size={10} color="#434652" />
                      </button>
                    </div>
                  ))}

                  {canAddMoreGallery && (
                    <label className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg border border-dashed border-[#C3C6D4] bg-white">
                      <input type="file" accept="image/*" multiple onChange={e => handleFile(e, 'gallery')} className="hidden" />
                      <Images size={18} color="#94A3B8" />
                    </label>
                  )}
                </div>
              ) : (
                <label className="block cursor-pointer">
                  <input type="file" accept="image/*" multiple onChange={e => handleFile(e, 'gallery')} className="hidden" />
                  <div className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#C3C6D4] bg-[#F8FAFC] p-6">
                    <Images size={25} color="#94A3B8" />
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Multi Upload</span>
                    <span className="text-xs text-slate-400">Up to {MAX_GALLERY} images</span>
                  </div>
                </label>
              )}
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