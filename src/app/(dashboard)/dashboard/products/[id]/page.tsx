'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import ViewProductModal from '@/components/dashboard/products/ViewProductModal';

export default function ProductDetailPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const product = PRODUCTS.find(p => p.id === productId);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push('/dashboard/products');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {product && (
        <ViewProductModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          product={product}
        />
      )}
    </div>
  );
}
