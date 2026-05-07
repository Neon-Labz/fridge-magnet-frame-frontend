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
      // Here you would typically send the data to your API
      console.log('Product created:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Close modal and redirect
      setIsModalOpen(false);
      router.push('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
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
