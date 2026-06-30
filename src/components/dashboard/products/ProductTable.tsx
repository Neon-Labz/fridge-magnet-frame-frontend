import { Eye, Trash2 } from 'lucide-react';
import type { Product } from '@/types/product';
import ProductThumb from './ProductThumb';
import StockBadge from './StockBadge';

interface ProductTableProps {
  products: Product[];
  onDelete: (product: Product) => void;
  onView: (product: Product) => void;
}

export default function ProductTable({ products, onDelete, onView }: ProductTableProps) {
  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-100" style={{ borderBottom: '2px solid #F1F5F9' }}>
            {['Product ID', 'Product Details', 'Price', 'Stock Status', 'Actions'].map((h, i) => (
              <th key={h} className="py-5 text-sm text-blue-300 font-semibold uppercase" style={{
                paddingLeft: 32, paddingRight: i === 4 ? 32 : 0,
                textAlign: i === 4 ? 'right' : 'left',
               color: '#002B73',
                letterSpacing: '0.07em',
                borderBottom: '2px solid #F1F5F9',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product,index) => (
            <tr
              key={`${product.id}-${index}`}
              className="transition hover:bg-slate-50/50"
              style={{ borderBottom: '1px solid #E8ECF4' }}
            >
              <td className="pl-8 font-mono text-sm" style={{ height: 115, color: '#94A3B8', whiteSpace: 'nowrap' }}>
                {product.sku || product.id}
              </td>
              <td className="pr-8">
                <div className="flex items-center gap-5">
                  <ProductThumb gradient={product.gradient} imageUrl={product.primaryImageUrl} isPopular={product.isPopular} />
                  <div>
                    <p className="text-base font-bold leading-6" style={{ color: '#002B73' }}>{product.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{product.series}</p>
                  </div>
                </div>
              </td>
              <td className="pl-8 text-base font-bold" style={{ color: '#1A1C1F', whiteSpace: 'nowrap' }}>
                LKR {product.price.toFixed(2)}
              </td>
              <td className="pl-8">
                <StockBadge status={product.stockStatus} count={product.stockCount} />
              </td>
              <td className="pr-8">
                <div className="flex items-center justify-end gap-2">
                  <button onClick={() => onView(product)}
                    className="flex items-center justify-center rounded-xl transition hover:bg-blue-50"
                    style={{ width: 36, height: 38 }}>
                    <Eye size={18} color="#002B73" />
                  </button>
                  <button onClick={() => onDelete(product)}
                    className="flex items-center justify-center rounded-xl transition hover:bg-red-50"
                    style={{ width: 36, height: 38 }}>
                    <Trash2 size={16} color="#BC0000" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
