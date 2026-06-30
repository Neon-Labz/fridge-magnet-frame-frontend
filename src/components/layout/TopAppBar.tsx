'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Bell, Menu, Package, ShoppingBag, UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import { apiV1Url } from '@/lib/backendUrl';

type NotifItem = {
  id: string;
  type: 'order' | 'stock-low' | 'stock-out';
  title: string;
  sub: string;
  href: string;
  createdAt?: string;
};

type ApiOrder = {
  _id?: string;
  orderId: string;
  customerName: string;
  status: string;
  createdAt?: string;
};

type ApiProduct = {
  _id?: string;
  productName: string;
  productId: string;
  status: string;
  stock: number;
};

const LAST_SEEN_KEY = 'admin_notif_last_seen';

function getLastSeenTimestamp(): number {
  if (typeof window === 'undefined') return 0;
  const val = localStorage.getItem(LAST_SEEN_KEY);
  return val ? parseInt(val, 10) : 0;
}

function setLastSeenTimestamp(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LAST_SEEN_KEY, Date.now().toString());
}

async function fetchNotifications(): Promise<NotifItem[]> {
  const items: NotifItem[] = [];

  try {
    const [ordersRes, lowRes, outRes] = await Promise.all([
      fetch(apiV1Url('/orders?status=PENDING'), { cache: 'no-store' }),
      fetch(apiV1Url('/api/products?status=Low+Stock&limit=5'), { cache: 'no-store' }),
      fetch(apiV1Url('/api/products?status=Out+of+Stock&limit=5'), { cache: 'no-store' }),
    ]);

    if (ordersRes.ok) {
      const orders = (await ordersRes.json()) as ApiOrder[];
      const recent = orders.slice(0, 10);
      for (const o of recent) {
        items.push({
          id: `order-${o._id || o.orderId}`,
          type: 'order',
          title: `New order #${o.orderId}`,
          sub: `${o.customerName} · ${o.status.charAt(0) + o.status.slice(1).toLowerCase()}`,
          href: `/dashboard/orders`,
          createdAt: o.createdAt,
        });
      }
    }

    const extractProducts = async (res: Response): Promise<ApiProduct[]> => {
      if (!res.ok) return [];
      const body = await res.json();
      if (Array.isArray(body)) return body as ApiProduct[];
      return (body?.data?.products ?? body?.products ?? []) as ApiProduct[];
    };

    const [lowProducts, outProducts] = await Promise.all([
      extractProducts(lowRes),
      extractProducts(outRes),
    ]);

    for (const p of outProducts.slice(0, 3)) {
      items.push({
        id: `stock-out-${p._id || p.productId}`,
        type: 'stock-out',
        title: `Out of stock: ${p.productName}`,
        sub: `SKU ${p.productId} · 0 units remaining`,
        href: `/dashboard/products`,
      });
    }

    for (const p of lowProducts.slice(0, 3)) {
      items.push({
        id: `stock-low-${p._id || p.productId}`,
        type: 'stock-low',
        title: `Low stock: ${p.productName}`,
        sub: `SKU ${p.productId} · ${p.stock} units left`,
        href: `/dashboard/products`,
      });
    }
  } catch {
    // silently return whatever was collected before the error
  }

  return items;
}

const iconFor = (type: NotifItem['type']) => {
  if (type === 'order') return <ShoppingBag size={15} color="#002B73" />;
  if (type === 'stock-out') return <Package size={15} color="#BC0000" />;
  return <Package size={15} color="#D97706" />;
};

const dotColor = (type: NotifItem['type']) => {
  if (type === 'order') return '#DAE2FF';
  if (type === 'stock-out') return '#FFE4E4';
  return '#FEF3C7';
};

/** Polling interval in ms — check for new notifications every 15 seconds */
const POLL_INTERVAL = 15_000;

export default function TopAppBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifs, setNotifs] = useState<NotifItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Calculate unread count based on last-seen timestamp
  const calcUnread = useCallback((items: NotifItem[]) => {
    const lastSeen = getLastSeenTimestamp();
    if (lastSeen === 0) {
      // First visit — show total count
      return items.length;
    }
    // Count items created after last seen
    const newItems = items.filter((item) => {
      if (!item.createdAt) return true; // no timestamp = treat as new
      return new Date(item.createdAt).getTime() > lastSeen;
    });
    return newItems.length;
  }, []);

  // Fetch and update notifications
  const refresh = useCallback(async () => {
    const data = await fetchNotifications();
    setNotifs(data);
    setUnreadCount(calcUnread(data));
    return data;
  }, [calcUnread]);

  // Initial fetch + start polling
  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const data = await fetchNotifications();
      if (!active) return;
      setNotifs(data);
      setUnreadCount(calcUnread(data));
      setLoading(false);
    })();

    // Poll for new notifications
    pollRef.current = setInterval(async () => {
      if (!active) return;
      const data = await fetchNotifications();
      if (!active) return;
      setNotifs(data);
      setUnreadCount(calcUnread(data));
    }, POLL_INTERVAL);

    return () => {
      active = false;
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [calcUnread]);

  const handleBellClick = useCallback(async () => {
    if (open) {
      setOpen(false);
      return;
    }

    setOpen(true);
    // Mark as seen when user opens the dropdown
    setLastSeenTimestamp();
    setUnreadCount(0);

    // Refresh on open
    setLoading(true);
    await refresh();
    setLoading(false);
  }, [open, refresh]);

  return (
    <>
      <style>{`
        .topappbar {
          height: 89px;
          background: rgba(255, 255, 255, 0.92);
          border-bottom: 1px solid #E2E8F0;
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .profile-button {
          padding: 4px 16px 4px 4px;
          border: 1px solid #E2E8F0;
        }
        .profile-avatar {
          width: 40px;
          height: 40px;
          background: rgba(0, 43, 115, 0.1);
          flex-shrink: 0;
        }
        .profile-name {
          color: #1E3A8A;
          font-size: 14px;
          line-height: 14px;
        }
        .profile-role {
          font-size: 10px;
          line-height: 15px;
          color: #64748B;
        }

        @media (max-width: 640px) {
          .topappbar {
            height: 72px;
            padding-left: 12px;
            padding-right: 12px;
          }
          .profile-button > .flex.flex-col {
            display: none;
          }
          .profile-avatar {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>

      {/* Backdrop — closes dropdown on outside click */}
      {open && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      <header className="topappbar fixed top-0 right-0 z-40 flex items-center justify-between px-4 sm:px-6 left-0 lg:left-[252px]">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuClick}
          className="flex items-center justify-center rounded-lg transition hover:bg-slate-100 lg:hidden"
          style={{ width: 40, height: 40 }}
          aria-label="Toggle menu"
        >
          <Menu size={22} color="#475569" />
        </button>

        {/* Right controls */}
        <div className="flex items-center gap-3 sm:gap-6 ml-auto">

          {/* Bell with dropdown */}
          <div className="relative">
            <button
              onClick={handleBellClick}
              className="flex items-center justify-center rounded-full transition hover:bg-slate-100"
              style={{ width: 36, height: 40 }}
              aria-label="Notifications"
              aria-expanded={open}
            >
              <Bell size={20} color={open ? '#002B73' : '#64748B'} />
              {unreadCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full bg-red-500 text-white font-bold"
                  style={{
                    minWidth: 18,
                    height: 18,
                    fontSize: 10,
                    padding: '0 4px',
                    lineHeight: 1,
                  }}
                  aria-label={`${unreadCount} new notifications`}
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>

            {open && (
              <div
                className="absolute right-0 top-full mt-3 z-50 flex flex-col overflow-hidden"
                style={{
                  width: 360,
                  background: '#fff',
                  border: '1px solid #E2E8F0',
                  borderRadius: 16,
                  boxShadow: '0px 12px 32px rgba(0,0,0,0.12)',
                  maxHeight: 480,
                }}
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between px-5 py-4 flex-shrink-0"
                  style={{ borderBottom: '1px solid #F1F5F9' }}
                >
                  <span className="font-bold text-sm" style={{ color: '#002B73' }}>
                    Notifications
                  </span>
                  {notifs.length > 0 && (
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: '#EEF2FF', color: '#002B73' }}
                    >
                      {notifs.length}
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="overflow-y-auto flex-1">
                  {loading ? (
                    <div className="flex items-center justify-center py-10">
                      <span className="text-sm font-medium" style={{ color: '#94A3B8' }}>
                        Loading…
                      </span>
                    </div>
                  ) : notifs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-2 py-10 px-6 text-center">
                      <Bell size={28} color="#CBD5E1" />
                      <p className="text-sm font-semibold" style={{ color: '#94A3B8' }}>
                        All caught up — no new notifications
                      </p>
                    </div>
                  ) : (
                    <ul>
                      {notifs.map((n, idx) => (
                        <li
                          key={n.id}
                          style={{ borderTop: idx === 0 ? 'none' : '1px solid #F1F5F9' }}
                        >
                          <Link
                            href={n.href}
                            onClick={() => setOpen(false)}
                            className="flex items-start gap-3 px-5 py-4 transition hover:bg-slate-50"
                          >
                            <span
                              className="flex-shrink-0 flex items-center justify-center rounded-full mt-0.5"
                              style={{
                                width: 30,
                                height: 30,
                                background: dotColor(n.type),
                              }}
                            >
                              {iconFor(n.type)}
                            </span>
                            <div className="min-w-0">
                              <p
                                className="text-sm font-semibold leading-snug truncate"
                                style={{ color: '#1A1C1F' }}
                              >
                                {n.title}
                              </p>
                              <p
                                className="text-xs font-medium mt-0.5 truncate"
                                style={{ color: '#64748B' }}
                              >
                                {n.sub}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Footer */}
                {notifs.length > 0 && (
                  <div
                    className="flex-shrink-0 px-5 py-3 text-center"
                    style={{ borderTop: '1px solid #F1F5F9' }}
                  >
                    <Link
                      href="/dashboard/orders"
                      onClick={() => setOpen(false)}
                      className="text-xs font-bold"
                      style={{ color: '#002B73' }}
                    >
                      View all orders →
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User profile */}
          <button className="profile-button flex items-center gap-3 rounded-full bg-white transition hover:shadow-md">
            <div className="profile-avatar flex items-center justify-center rounded-full">
              <UserCircle2 size={20} color="#002B73" />
            </div>
            <div className="flex flex-col items-start">
              <span className="profile-name font-bold">Admin</span>
              <span className="profile-role font-medium">System Manager</span>
            </div>
          </button>
        </div>
      </header>
    </>
  );
}
