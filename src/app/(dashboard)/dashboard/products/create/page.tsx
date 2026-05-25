'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ProductFormData } from '@/types/product';
import AddProductModal from '@/components/dashboard/products/AddProductModal';

export default function CreateProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();

 const handleSubmit = async (formData: ProductFormData) => {
  try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("productId", formData.productId);
    data.append("category", formData.category);
    data.append("price", String(formData.price));
    data.append("stock", String(formData.stock));
    data.append("description", formData.description);

    // primary image
    if (formData.primaryImage) {
      data.append("primaryImage", formData.primaryImage);
    }

    // gallery images
    formData.galleryImages.forEach((file) => {
      data.append("galleryImages", file);
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create product");
    }

    alert("Product Added Successfully");

    setIsModalOpen(false);
    router.push('/admin/products');

  } catch (error) {
    console.error('Error creating product:', error);
    alert("Error adding product");
  }
};

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push('/admin/products');
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
