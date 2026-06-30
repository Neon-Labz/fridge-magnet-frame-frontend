'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ProductFormData } from '@/types/product';
import AddProductModal from '@/components/dashboard/products/AddProductModal';
import { apiV1Url } from '@/lib/backendUrl';
import { useToastStore } from '@/store/toastStore';

const getProductStatus = (stock: number) => {
  if (stock > 10) return 'In Stock';
  if (stock > 0) return 'Low Stock';
  return 'Out of Stock';
};

export default function CreateProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();
  const { addToast } = useToastStore();

 const handleSubmit = async (formData: ProductFormData) => {
  try {
    const data = new FormData();

    data.append("productName", formData.name);
    data.append("productId", formData.productId);
    data.append("category", formData.category);
    data.append("stock", String(formData.stock));
    data.append("description", formData.description);
    data.append("status", getProductStatus(formData.stock));

    // BUG-011 FIX: Append personalization fields that the modal adds.
    // Without this, personalizationEnabled and personalization options
    // were silently dropped from the request every time.
    const personalizationEnabled: boolean =
      formData.personalizationEnabled ?? formData.personalization ?? false;
    data.append("personalizationEnabled", String(personalizationEnabled));

    const personalizationOptions: {
      label: string;
      price?: number;
      note?: string;
      imageFile?: File | null;
    }[] =
      formData.personalizationOptions ?? [];
    const productPrice = Number(formData.price || personalizationOptions[0]?.price || 0);
    data.append("price", String(productPrice));

    if (personalizationOptions.length > 0) {
      const optionsPayload = personalizationOptions.map((opt, index) => ({
        label: opt.label,
        price: Number(opt.price) || 0,
        note: opt.note ?? '',
        imageField: opt.imageFile ? `personalizationImage_${index}` : null,
      }));

      data.append("personalization", JSON.stringify(optionsPayload));

      personalizationOptions.forEach((opt, index) => {
        if (opt.imageFile) {
          data.append(`personalizationImage_${index}`, opt.imageFile);
        }
      });
    }

    // primary image
    if (formData.primaryImage) {
      data.append("primaryImage", formData.primaryImage);
    }

    // gallery images
    formData.galleryImages.forEach((file) => {
      data.append("galleryImages", file);
    });

    const response = await fetch(
      apiV1Url('/api/products'),
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const errorMessage = body?.message || 'Failed to create product. Please try again.';
      addToast(errorMessage, 'error');
      return false;
    }

    setIsModalOpen(false);
    router.push('/dashboard/products');

  } catch (error) {
    console.error('Error creating product:', error);
    addToast('Failed to create product. Please try again.', 'error');
    return false;
  }
};

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push('/dashboard/products');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AddProductModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
