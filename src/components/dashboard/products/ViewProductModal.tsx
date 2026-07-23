'use client';

import { useEffect, useState } from 'react';
import { X, Package, MapPin, History, Images } from 'lucide-react';
import type { Product } from '@/types/product';
import { apiV1Url } from '@/lib/backendUrl';

interface ViewProductModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onUpdate?: (
    product: Product,
    newStock: string,
  ) => boolean | void | Promise<boolean | void>;
}

type StockLogEntry = {
  previousStock: number;
  newStock: number;
  changedBy: string;
  changedAt: string;
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
  const [stockLog, setStockLog] = useState<StockLogEntry[]>([]);
  const [isLoadingLog, setIsLoadingLog] = useState(false);
  const [logError, setLogError] = useState<string | null>(null);

  // BUG-013 fix: gallery images are shown independently of the primary
  // image, so they need their own "which one is active" state.
  const [activeGalleryImage, setActiveGalleryImage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setExtraStock(0);
      setShowLog(false);
      setStockLog([]);
      setLogError(null);
      setActiveGalleryImage(null);
    }
  }, [isOpen, product?.id]);

  if (!isOpen || !product) return null;

  const currentStock = Number(product.stockCount ?? 0);
  const updatedStock = currentStock + extraStock;

  // BUG-013 fix: gallery images render regardless of whether a primary
  // image exists — the two are independent, not a fallback chain.
  const galleryImages = product.galleryImageUrls ?? [];
  const hasGallery = galleryImages.length > 0;

  const getStatus = (stock: number) => {
    if (stock > 10) return 'In Stock';
    if (stock > 4) return 'Low Stock';
    return 'Out of Stock';
  };

  const currentLabel = getStatus(currentStock);
  const updatedStatus = getStatus(updatedStock);

  const handleViewLog = async () => {
    const next = !showLog;
    setShowLog(next);
    if (!next) return;
    setIsLoadingLog(true);
    setLogError(null);
    try {
      const res = await fetch(apiV1Url(`/api/products/${product.id}/stock-log`));
      if (!res.ok) throw new Error('Failed to fetch stock log');
      const json = await res.json();
      setStockLog(json.data ?? []);
    } catch (err) {
      setLogError(err instanceof Error ? err.message : 'Failed to fetch stock log');
    } finally {
      setIsLoadingLog(false);
    }
  };

  const cardRadius = 16;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Full-size preview overlay for a clicked gallery image */}
      {activeGalleryImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-8"
          onClick={() => setActiveGalleryImage(null)}
        >
          <img
            src={activeGalleryImage}
            alt="Gallery preview"
            className="max-h-full max-w-full rounded-xl object-contain"
          />
        </div>
      )}

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
            className="flex items-center justify-center rounded-full hover:bg-slate-100"
            style={{ width: 32, height: 32 }}
          >
            <X size={18} color="#94A3B8" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-20 py-6">
          <div className="grid grid-cols-[650px_350px] gap-[22px]">
            {/* LEFT PRODUCT BOX */}
            <div
              className="flex flex-col p-8 md:p-10"
              style={{
                border: '1.2px solid #E2E4ED',
                borderRadius: cardRadius,
                background: '#fff',
              }}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
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
                    <div className="w-full h-full bg-white border-[12px] border-[#A67C52]" />
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

              {/* BUG-013 fix: Gallery Images — independent of Primary Image.
                  Renders whenever gallery images exist, whether or not a
                  primary image is set. */}
              {hasGallery && (
                <div className="mt-8 pt-6" style={{ borderTop: '1px solid #F1F5F9' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Images size={18} color="#0040A1" />
                    <h4 className="text-sm font-bold uppercase tracking-wide" style={{ color: '#002B73' }}>
                      Product Gallery ({galleryImages.length})
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {galleryImages.map((url, idx) => (
                      <button
                        key={`${url}-${idx}`}
                        type="button"
                        onClick={() => setActiveGalleryImage(url)}
                        className="flex-shrink-0 overflow-hidden rounded-xl transition hover:opacity-80"
                        style={{
                          width: 84,
                          height: 84,
                          border: '1px solid #E2E4ED',
                          background: '#F8F8FB',
                        }}
                      >
                        <img
                          src={url}
                          alt={`${product.name} gallery ${idx + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* BLUE BOX */}
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

                  <span className="text-2xl font-bold text-white">
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
                  <span className="font-bold text-white">
                    {currentStock}
                  </span>
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
                  onChange={(e) =>
                    setExtraStock(Number(e.target.value) || 0)
                  }
                  className="w-full px-6 text-white font-bold text-lg outline-none"
                  style={{
                    height: 60,
                    background: '#0040A1',
                    borderRadius: 12,
                  }}
                />

                <p className="text-lg font-medium mt-3" style={{ color: '#98B3FF' }}>
                  Updated Stock:{' '}
                  <span className="font-bold text-white">
                    {updatedStock}
                  </span>
                </p>

                <p className="text-lg font-medium" style={{ color: '#98B3FF' }}>
                  Auto Status:{' '}
                  <span className="font-bold text-white uppercase">
                    {updatedStatus}
                  </span>
                </p>
              </div>
            </div>

            {/* BOTTOM BOXES */}
            <div className="col-span-2 mt-[12px] grid grid-cols-[350px_650px] gap-[25px]">
              {/* WAREHOUSE */}
              <div
                className="flex items-center gap-4"
                style={{
                  height: 110,
                  borderRadius: cardRadius,
                  background: '#F5F6FB',
                  border: '1px solid #E5E7EB',
                  padding: '24px 28px',
                }}
              >
                <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center bg-white rounded-full shadow-sm">
                  <MapPin size={22} color="#0040A1" strokeWidth={2.5} />
                </div>

                <div>
                  <h4
                    className="text-lg font-bold"
                    style={{ color: '#002B73' }}
                  >
                    Warehouse Location
                  </h4>

                  <p
                    className="text-[19px] font-bold leading-tight"
                    style={{ color: '#1A1C1F' }}
                  >
                    {product.warehouseLocation || 'Kokuvil'}
                  </p>

                  <p
                    className="text-sm font-medium mt-0.5"
                    style={{ color: '#5C5F6C' }}
                  >
                    {product.warehouseCenter || 'west,Jaffna'}
                  </p>
                </div>
              </div>

              {/* LAST UPDATED */}
              <div
                className="flex items-center justify-between"
                style={{
                  height: 110,
                  borderRadius: cardRadius,
                  background: '#F5F6FB',
                  border: '1px solid #E5E7EB',
                  padding: '24px 28px',
                }}
              >
                <div>
                  <h4
                    className="text-lg font-bold"
                    style={{ color: '#002B73' }}
                  >
                    Last Updated
                  </h4>

                  <p
                    className="text-lg font-medium"
                    style={{ color: '#5C5F6C' }}
                  >
                    Adjusted by{' '}
                    <span className="font-bold text-[#1A1C1F]">
                      {product.lastUpdatedBy || 'Admin'}
                    </span>{' '}
                   on {product.lastUpdatedDate
                      ? new Date(product.lastUpdatedDate).toLocaleDateString()
                      : 'Today'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleViewLog}
                  className="flex items-center gap-2 text-base font-bold"
                  style={{ color: '#002B73' }}
                >
                  {showLog ? 'Hide Log' : 'View Log'}

                  <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm">
                    <History size={16} />
                  </div>
                </button>
              </div>
            </div>

            {/* STOCK LOG PANEL */}
            {showLog && (
              <div className="col-span-2 mt-2">
                <h3
                  className="font-bold text-lg mb-4"
                  style={{ color: '#002B73' }}
                >
                  Stock Modification History
                </h3>

                {isLoadingLog ? (
                  <p className="text-sm" style={{ color: '#64748B' }}>
                    Loading...
                  </p>
                ) : logError ? (
                  <p className="text-sm text-red-500">{logError}</p>
                ) : stockLog.length === 0 ? (
                  <p className="text-sm" style={{ color: '#64748B' }}>
                    No stock changes recorded yet.
                  </p>
                ) : (
                  <div
                    style={{
                      border: '1px solid #E5E7EB',
                      borderRadius: 12,
                      overflow: 'hidden',
                    }}
                  >
                    <table className="w-full text-sm">
                      <thead style={{ background: '#F5F6FB' }}>
                        <tr>
                          {['Date', 'Previous', 'Change', 'New Stock', 'Changed By'].map((h) => (
                            <th
                              key={h}
                              className="text-left px-5 py-3 font-bold"
                              style={{ color: '#002B73' }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {stockLog.map((entry, idx) => {
                          const change = entry.newStock - entry.previousStock;
                          return (
                            <tr
                              key={idx}
                              style={{
                                borderTop: idx > 0 ? '1px solid #F1F5F9' : undefined,
                              }}
                            >
                              <td className="px-5 py-3" style={{ color: '#5C5F6C' }}>
                                {new Date(entry.changedAt).toLocaleString()}
                              </td>
                              <td className="px-5 py-3 font-medium" style={{ color: '#1A1C1F' }}>
                                {entry.previousStock}
                              </td>
                              <td
                                className="px-5 py-3 font-bold"
                                style={{ color: change >= 0 ? '#008000' : '#BC0000' }}
                              >
                                {change >= 0 ? `+${change}` : change}
                              </td>
                              <td className="px-5 py-3 font-medium" style={{ color: '#1A1C1F' }}>
                                {entry.newStock}
                              </td>
                              <td className="px-5 py-3" style={{ color: '#5C5F6C' }}>
                                {entry.changedBy}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* BUTTONS */}
        <div
          className="flex-shrink-0 flex items-center justify-end gap-4 px-8 py-6"
          style={{
            borderTop: '1px solid #F1F5F9',
            background: '#FAFAFA',
          }}
        >
          <button
            onClick={onClose}
            className="flex items-center justify-center font-bold text-lg"
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
            className="flex items-center justify-center font-bold text-lg text-white"
            style={{
              width: 280,
              height: 60,
              background: '#BC0000',
              borderRadius: 12,
            }}
          >
            {isUpdating ? 'Updating...' : 'Confirm Stock Update'}
          </button>
        </div>
      </div>
    </div>
  );
}