'use client';

import { useEffect, useState } from 'react';
import { X, Package, MapPin, History } from 'lucide-react';
import type { Product } from '@/types/product';

interface ViewProductModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onUpdate?: (
    product: Product,
    newStock: string,
  ) => boolean | void | Promise<boolean | void>;
}

type StockLog = {
  productId: string;
  productName: string;
  date: string;
  previousStock: number;
  addedStock: number;
  updatedStock: number;
  updatedBy: string;
};

export default function ViewProductModal({
  isOpen,
  product,
  onClose,
  onUpdate,
}: ViewProductModalProps) {
  const [extraStock, setExtraStock] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [stockLogs, setStockLogs] = useState<StockLog[]>([]);

  useEffect(() => {
    if (isOpen) {
      setExtraStock(0);
      setShowLog(false);
    }
  }, [isOpen, product?.id]);

  if (!isOpen || !product) return null;

const currentStock = Number(product.stockCount ?? 0);
  const updatedStock = currentStock + extraStock;

  const getStatus = (stock: number) => {
    if (stock > 10) return 'In Stock';
    if (stock > 4) return 'Low Stock';
    return 'Out of Stock';
  };

  const currentLabel = getStatus(currentStock);
  const updatedStatus = getStatus(updatedStock);

  const selectedProductLogs = stockLogs.filter(
    (log) => log.productId === product.id,
  );

  const addStockLog = () => {
    const newLog: StockLog = {
      productId: product.id,
      productName: product.name,
      date: new Date().toLocaleString(),
      previousStock: currentStock,
      addedStock: extraStock,
      updatedStock,
      updatedBy: 'Admin',
    };

    setStockLogs((prev) => [newLog, ...prev]);
  };

  const cardRadius = 16;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div
        className="relative flex flex-col w-full overflow-y-auto"
        style={{
          maxWidth: 1200,
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
              Manage Stock Level
            </h2>
            <p className="text-sm mt-1" style={{ color: '#64748B' }}>
              Add extra stock for this product. Status will update automatically.
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-full hover:bg-slate-100 flex-shrink-0 ml-4"
            style={{ width: 32, height: 32 }}
          >
            <X size={18} color="#94A3B8" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-10"
              style={{
                border: '1.2px solid #E2E4ED',
                borderRadius: cardRadius,
                background: '#fff',
              }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center bg-[#F8F8FB] rounded-2xl p-4"
                style={{
                  width: 200,
                  height: 200,
                  border: '1px solid #EDEDF2',
                }}
              >
                {product.primaryImageUrl ? (
                  <img
                    src={product.primaryImageUrl}
                    alt={product.name}
                    className="h-full w-full rounded-2xl object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white border-[12px] border-[#A67C52] shadow-md flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 border-[1px] border-black/10" />
                    <div className="w-[70%] h-[70%] bg-[#FDFDFD] border border-gray-100 flex items-center justify-center text-[10px] text-gray-400 font-bold text-center p-2 uppercase tracking-wider">
                      {product.name}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 min-w-0">
                <p
                  className="text-xs font-bold uppercase tracking-[0.15em]"
                  style={{ color: '#0040A1' }}
                >
                  SKU: {product.sku}
                </p>

                <h2
                  className="font-bold leading-tight"
                  style={{
                    fontFamily: 'var(--font-manrope, Manrope, sans-serif)',
                    fontSize: 32,
                    color: '#002B73',
                  }}
                >
                  {product.name}
                </h2>

                <p
                  className="text-base leading-relaxed font-medium"
                  style={{ color: '#5C5F6C' }}
                >
                  {product.description}
                </p>
              </div>
            </div>

            <div
              className="flex flex-col justify-between p-8 md:p-10"
              style={{
                background: '#002B73',
                borderRadius: cardRadius,
                boxShadow: '0px 10px 25px -5px rgba(0, 43, 115, 0.2)',
              }}
            >
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <Package size={28} color="#DAE2FF" strokeWidth={2.5} />
                  <span className="text-2xl font-bold text-white tracking-tight">
                    Add Extra Stock
                  </span>
                </div>

                <p className="text-lg font-medium" style={{ color: '#98B3FF' }}>
                  Current Availability:{' '}
                  <span className="font-bold text-white uppercase ml-1">
                    {currentLabel}
                  </span>
                </p>

                <p className="text-lg font-medium" style={{ color: '#98B3FF' }}>
                  Current Stock:{' '}
                  <span className="font-bold text-white">{currentStock}</span>
                </p>
              </div>

              <div className="flex flex-col gap-3 mt-8">
                <label
                  className="text-[11px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: '#98B3FF' }}
                >
                  Extra Stock Quantity
                </label>

                <input
                  type="number"
                  min={0}
                  value={extraStock}
                  onChange={(e) => setExtraStock(Number(e.target.value) || 0)}
                  className="w-full px-6 text-white font-bold text-lg outline-none"
                  style={{
                    height: 60,
                    background: '#0040A1',
                    borderRadius: 12,
                  }}
                />

                <p className="text-lg font-medium mt-3" style={{ color: '#98B3FF' }}>
                  Updated Stock:{' '}
                  <span className="font-bold text-white">{updatedStock}</span>
                </p>

                <p className="text-lg font-medium" style={{ color: '#98B3FF' }}>
                  Auto Status:{' '}
                  <span className="font-bold text-white uppercase">
                    {updatedStatus}
                  </span>
                </p>
              </div>
            </div>

            <div
              className="flex flex-col justify-center gap-4 px-8 py-8"
              style={{
                background: '#F8F8FB',
                border: '1px solid #EDEDF2',
                borderRadius: cardRadius,
              }}
            >
              <h4 className="text-lg font-bold" style={{ color: '#002B73' }}>
                Warehouse Location
              </h4>

              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center bg-white rounded-full shadow-sm">
                  <MapPin size={22} color="#0040A1" strokeWidth={2.5} />
                </div>

                <div>
                  <p
                    className="text-[19px] font-bold leading-tight"
                    style={{ color: '#1A1C1F' }}
                  >
                    {product.warehouseLocation || 'Main Warehouse'}
                  </p>
                  <p
                    className="text-sm font-medium mt-0.5"
                    style={{ color: '#5C5F6C' }}
                  >
                    {product.warehouseCenter || 'Distribution Center'}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="relative flex items-center justify-between px-8 py-8"
              style={{
                background: '#F8F8FB',
                border: '1px solid #EDEDF2',
                borderRadius: cardRadius,
              }}
            >
              <div className="flex flex-col gap-1.5">
                <h4 className="text-lg font-bold" style={{ color: '#002B73' }}>
                  Last Updated
                </h4>

                <p className="text-lg font-medium" style={{ color: '#5C5F6C' }}>
                  Adjusted by{' '}
                  <span className="font-bold text-[#1A1C1F]">
                    {product.lastUpdatedBy || 'Admin'}
                  </span>{' '}
                  on {product.lastUpdatedDate || new Date().toISOString()}
                </p>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowLog((prev) => !prev)}
                  className="flex items-center gap-2 text-base font-bold transition hover:text-[#0040A1] flex-shrink-0"
                  style={{ color: '#002B73' }}
                >
                  View Log
                  <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm ml-1">
                    <History size={16} />
                  </div>
                </button>

                {showLog && (
                  <div
                    className="absolute right-0 mt-3 w-[420px] bg-white shadow-2xl z-50 p-5"
                    style={{
                      borderRadius: 16,
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    <h3
                      className="text-lg font-bold mb-1"
                      style={{ color: '#002B73' }}
                    >
                      Stock Update Logs
                    </h3>

                    <p className="mb-4 text-sm text-slate-500">
                      {product.name}
                    </p>

                    {selectedProductLogs.length === 0 ? (
                      <p className="text-sm text-slate-500">
                        No stock updates yet for this product.
                      </p>
                    ) : (
                      <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
                        {selectedProductLogs.map((log, index) => (
                          <div
                            key={index}
                            className="border rounded-xl p-4"
                            style={{ borderColor: '#E2E8F0' }}
                          >
                            <p className="text-sm font-semibold text-[#002B73]">
                              {log.date}
                            </p>

                            <p className="text-sm mt-2">
                              Product:
                              <span className="font-bold ml-1">
                                {log.productName}
                              </span>
                            </p>

                            <p className="text-sm">
                              Previous Stock:
                              <span className="font-bold ml-1">
                                {log.previousStock}
                              </span>
                            </p>

                            <p className="text-sm">
                              Added Stock:
                              <span className="font-bold text-green-600 ml-1">
                                +{log.addedStock}
                              </span>
                            </p>

                            <p className="text-sm">
                              Updated Stock:
                              <span className="font-bold ml-1">
                                {log.updatedStock}
                              </span>
                            </p>

                            <p className="text-sm">
                              Updated By:
                              <span className="font-bold ml-1">
                                {log.updatedBy}
                              </span>
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex-shrink-0 flex items-center justify-end gap-4 px-8 py-6"
          style={{ borderTop: '1px solid #F1F5F9', background: '#FAFAFA' }}
        >
          <button
            onClick={onClose}
            className="flex items-center justify-center font-bold text-lg transition hover:bg-gray-50"
            style={{
              width: 140,
              height: 60,
              border: '2px solid #002B73',
              borderRadius: 12,
              color: '#002B73',
            }}
          >
            Cancel
          </button>

          <button
            onClick={async () => {
              setIsUpdating(true);

              try {
                addStockLog();

                const shouldStayOpen = await onUpdate?.(
                  product,
                  String(updatedStock),
                );

                if (shouldStayOpen !== false) {
                  onClose();
                }
              } finally {
                setIsUpdating(false);
              }
            }}
            disabled={isUpdating || extraStock <= 0}
            className="flex items-center justify-center font-bold text-lg text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              width: 280,
              height: 60,
              background: '#BC0000',
              borderRadius: 12,
              boxShadow: '0px 4px 12px rgba(188, 0, 0, 0.2)',
            }}
          >
            {isUpdating ? 'Updating...' : 'Confirm Stock Update'}
          </button>
        </div>
      </div>
    </div>
  );
}