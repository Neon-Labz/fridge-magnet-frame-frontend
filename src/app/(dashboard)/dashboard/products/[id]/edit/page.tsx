'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import type { ProductFormData } from '@/types/product';
import AddProductModal from '@/components/dashboard/products/AddProductModal';

export default function EditProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const handleSubmit = async (formData: ProductFormData) => {
    try {
      // Here you would typically send the updated data to your API
      console.log('Product updated:', { id: productId, ...formData });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Close modal and redirect
      setIsModalOpen(false);
      router.push('/dashboard/products');
    } catch (error) {
      console.error('Error updating product:', error);
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
