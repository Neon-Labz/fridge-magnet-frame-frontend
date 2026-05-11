'use client';

import { useState, useEffect, useCallback } from 'react';
import { Customer, CustomerStats, CustomerApiResponse } from '@/types/customer';

// Use a relative API base so the frontend calls the same origin the app is served from.
// This avoids port mismatches during `next dev` where Next may switch ports.
const API_BASE = '/api/v1';

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [stats, setStats] = useState<CustomerStats>({
    totalActiveCustomers: 0,
    satisfactionRate: 0,
    newToday: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchCustomers = useCallback(async (currentPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/customers?page=${currentPage}&limit=${limit}`, {
        signal: AbortSignal.timeout(3000)
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const json: CustomerApiResponse = await res.json();

      // Derive initials if not provided by backend
      const enriched = (json.data || []).map((c) => ({
        ...c,
        id: String(c.id),
        initials: c.initials ?? (typeof c.name === 'string' ? c.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2) : '?'),
      }));

      setCustomers(enriched);
      setTotal(json.total);
      setTotalPages(json.totalPages);
      setStats({
        totalActiveCustomers: 0,
        satisfactionRate: 0,
        newToday: 0,
      });
    } catch {
      setCustomers([]);
      setTotal(0);
      setTotalPages(0);
      setStats({
        totalActiveCustomers: 0,
        satisfactionRate: 0,
        newToday: 0,
      });
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchCustomers(page);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [page, fetchCustomers]);

  const goToPage = (p: number) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  return {
    customers,
    stats,
    loading,
    error,
    page,
    total,
    totalPages,
    limit,
    goToPage,
    refresh: () => fetchCustomers(page),
  };
};
 