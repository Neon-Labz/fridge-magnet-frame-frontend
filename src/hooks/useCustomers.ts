'use client';

import { useState, useEffect, useCallback } from 'react';
import { Customer, CustomerStats, CustomerApiResponse } from '@/types/customer';

// Use a relative API base so the frontend calls the same origin the app is served from.
// This avoids port mismatches during `next dev` where Next may switch ports.
const API_BASE = '/api/v1';

type RawCustomer = {
  _id?: string;
  id?: string;
  customerId?: string;
  customerName?: string;
  name?: string;
  emailAddress?: string;
  email?: string;
  phoneNumber?: string;
  phone?: string;
  customerAddress?: string;
  address?: string;
  createdAt?: string;
  isActive?: boolean;
  source?: 'user' | 'customer';
  recordId?: string;
};

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?';

const mapCustomer = (customer: RawCustomer): Customer => {
  const name = customer.customerName || customer.name || 'Website Customer';
  const id = customer.customerId || customer.id || customer._id || '';

  return {
    ...customer,
    id: String(id).replace(/^#/, ''),
    name,
    initials: getInitials(name),
    email: customer.emailAddress || customer.email || '',
    phone: customer.phoneNumber || customer.phone || 'Not provided',
    address: customer.customerAddress || customer.address || 'Not provided',
    isActive: customer.isActive === true,
    source: customer.source || 'customer',
    recordId: customer.recordId || customer._id || id,
  };
};

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
  // The customer directory design shows four complete rows per page so the
  // table footer and pagination remain visible inside the dashboard viewport.
  const [limit] = useState(4);
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

      const enriched = (json.data || []).map(mapCustomer);
      const today = new Date().toDateString();
      const newToday = (json.data || []).filter((customer) => {
        if (!customer.createdAt) return false;
        return new Date(customer.createdAt).toDateString() === today;
      }).length;

      setCustomers(enriched);
      setTotal(json.total);
      setTotalPages(json.totalPages);
      setStats({
        totalActiveCustomers: json.total,
        satisfactionRate: json.total > 0 ? 100 : 0,
        newToday,
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
 
