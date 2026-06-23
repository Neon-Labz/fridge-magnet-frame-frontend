'use client';

import React, { useState } from 'react';
import { useCustomers } from '@/hooks/useCustomers';
import AddCustomerModal from './AddCustomerModal';

const styles: Record<string, React.CSSProperties> = {
 tableContainer: {
  width: '100%',
  backgroundColor: '#ffffff',
  border: '1px solid #cbd5e1',
  borderRadius: 16,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
 boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
},

tableScroll: {
  width: '100%',
  overflowX: 'auto',
  overflowY: 'visible',
},

table: {
  width: '100%',
  minWidth: 1100,
  tableLayout: 'fixed',
  borderCollapse: 'separate',
  borderSpacing: 0,
},
  tableHeader: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '18px 24px',
  borderBottom: '1px solid #e5e7eb',
  backgroundColor: '#ffffff',
},
  tableTitleGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: 'var(--color-primary-dark)',
  },
  newPill: {
    backgroundColor: '#e0e7ff',
    color: 'var(--color-primary-dark)',
    padding: '4px 12px',
    borderRadius: 16,
    fontSize: 12,
    fontWeight: 600,
  },
  tableActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'var(--border-color)',
    borderRadius: 6,
    color: 'var(--text-muted)',
    transition: 'all 0.2s',
    background: 'transparent',
    cursor: 'pointer',
  },
 th: {
  textAlign: 'center',
  padding: '14px',
  backgroundColor: '#F8FAFC',
  color: '#64748B',
  fontSize: 11,
  fontWeight: 700,
  borderBottom: '1px solid #E5E7EB',

},
 td: {
  padding: '10px 14px',
  borderBottom: '1px solid #E5E7EB',
  textAlign: 'center',
  background: '#fff',
  color: '#0F172A',
  fontSize: 14,
},
  emailCell: {
    overflowWrap: 'anywhere',
    lineHeight: 1.35,
  },
  addressCell: {
    maxWidth: 230,
    margin: '0 auto',
    color: '#334155',
    lineHeight: 1.4,
    textAlign: 'left',
    whiteSpace: 'normal',
    overflowWrap: 'break-word',
  },
  emptyState: {
    padding: '60px 24px',
    textAlign: 'center',
    color: 'var(--text-muted)',
    fontSize: 14,
  },
  emptyAddBtn: {
    color: '#174092',
    fontWeight: 600,
    textDecoration: 'underline',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontSize: 'inherit',
  },
 pagination: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 24px',
  backgroundColor: '#ffffff',
  borderTop: '1px solid #e5e7eb',
  flexShrink: 0,
},
  paginationInfo: {
    fontSize: 14,
    color: 'var(--text-muted)',
  },
  pageControls: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  pageBtn: {
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'transparent',
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 16,
    color: '#334155',
    transition: 'all 0.2s',
    cursor: 'pointer',
  },
  pageBtnActive: {
    backgroundColor: '#003B7A',
    color: 'white',
    borderColor: '#003B7A',
    boxShadow: '0 4px 10px rgba(0, 59, 122, 0.18)',
  },
  pageBtnDisabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
  tr: {
    transition: 'background-color 0.15s',
  },
  trHover: {
    backgroundColor: '#f8fafc',
  },
  idBadge: {
    fontSize: 13,
    color: 'var(--text-muted)',
    fontFamily: 'monospace',
  },
  customerCell: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
  width: 32,
  height: 32,
  borderRadius: '50%',
  background: '#DBEAFE',
  color: '#1E40AF',
  fontSize: 12,
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
},
viewBtn: {
  width: 34,
  height: 34,
  borderRadius: 8,
  border: '1px solid #CBD5E1',
  background: '#fff',
  color: '#1E3A8A',
  cursor: 'pointer',
},
  actionBtns: {
    display: 'flex',
    gap: 8,
  },
  editBtn: {
  width: 30,
  height: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  border: '1px solid #cbd5e1',
  color: '#0f172a',
  background: '#ffffff',
  cursor: 'pointer',
},

  statusBtn: {
    minWidth: 76,
    height: 30,
    padding: '0 12px',
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 700,
    cursor: 'pointer',
  },
  deleteOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(17, 24, 39, 0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    zIndex: 1100,
    backdropFilter: 'blur(3px)',
  },
  deleteModal: {
    width: '100%',
    maxWidth: 700,
    background: '#fff',
    borderRadius: 28,
    boxShadow: '0 28px 60px rgba(15, 23, 42, 0.24)',
    overflow: 'hidden',
  },
  deleteTopBar: {
    height: 8,
    background: 'linear-gradient(90deg, #b91c1c 0%, #ef4444 55%, #dc2626 100%)',
  },
  deleteIconWrap: {
    display: 'flex',
    justifyContent: 'center',
    padding: '32px 24px 8px',
  },
  deleteIconCircle: {
    width: 92,
    height: 92,
    borderRadius: 999,
    background: '#fde8e8',
    color: '#c62828',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteTitle: {
    margin: '8px 24px 20px',
    textAlign: 'center',
    color: '#1f2937',
    fontSize: 30,
    fontWeight: 800,
    letterSpacing: '-0.02em',
  },
  deleteMessage: {
    margin: '0 56px',
    padding: '28px 34px',
    borderRadius: 22,
    background: '#f7f7fb',
    border: '1px solid #e5e7eb',
    color: '#4b5563',
    fontSize: 18,
    lineHeight: 1.7,
    textAlign: 'center',
  },
  deleteError: {
    margin: '18px 56px 0',
    color: '#dc2626',
    textAlign: 'center',
    fontSize: 14,
  },
  deleteActions: {
    display: 'flex',
    gap: 16,
    justifyContent: 'center',
    padding: '36px 56px 24px',
  },
  deleteCancelBtn: {
    minWidth: 280,
    height: 64,
    borderRadius: 22,
    fontSize: 17,
    fontWeight: 800,
    letterSpacing: '0.02em',
    transition: 'transform 0.15s, box-shadow 0.15s, background-color 0.15s',
    cursor: 'pointer',
    background: '#fff',
    color: '#0f3b82',
    border: '3px solid #0f3b82',
  },
  deleteConfirmBtn: {
    minWidth: 280,
    height: 64,
    borderRadius: 22,
    fontSize: 17,
    fontWeight: 800,
    letterSpacing: '0.02em',
    transition: 'transform 0.15s, box-shadow 0.15s, background-color 0.15s',
    cursor: 'pointer',
    background: '#d01919',
    color: '#fff',
    border: '3px solid #d01919',
  },
  deleteFooter: {
    padding: '18px 24px 22px',
    borderTop: '1px solid #eef2f7',
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
};

const CustomerTable = () => {
  const { customers, stats, loading, error, page, total, totalPages, limit, goToPage, refresh } = useCustomers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<typeof customers[number] | null>(null);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | number | null>(null);

  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  const handleEdit = (customer: typeof customers[number]) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (customer: typeof customers[number]) => {
    setUpdatingStatusId(customer.id);
    setStatusError(null);
    try {
      const res = await fetch(`/api/v1/customers/${customer.recordId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isActive: !customer.isActive,
          source: customer.source,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message ?? `Server error: ${res.status}`);
      }

      await refresh();
    } catch (err) {
      setStatusError(
        err instanceof Error ? err.message : 'Unable to update customer status',
      );
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const getPageBtnStyle = (active: boolean, disabled: boolean) => ({
    ...styles.pageBtn,
    ...(active ? styles.pageBtnActive : {}),
    ...(disabled ? styles.pageBtnDisabled : {}),
  });

  const firstVisiblePage = Math.max(
    1,
    Math.min(page - 2, Math.max(totalPages - 4, 1)),
  );
  const visiblePages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => firstVisiblePage + index,
  );

  return (
    <>
      <div style={styles.tableContainer}>
       <div
  style={{
    ...styles.tableHeader,
    background: '#fff',
    padding: '14px 20px',
  }}
>
  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
    <h2 style={styles.tableTitle}>Active Directory</h2>

    {stats.newToday > 0 && (
      <span
        style={{
          background: '#E0E7FF',
          color: '#1D4ED8',
          padding: '4px 10px',
          borderRadius: 20,
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        +{stats.newToday} New Today
      </span>
    )}
  </div>

  <div style={styles.tableActions}>
    <button type="button" style={styles.iconBtn} aria-label="Filter customers">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    </button>

    <button type="button" style={styles.iconBtn} aria-label="Download customers">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    </button>
  </div>
</div>

{statusError && (
  <div
    role="alert"
    style={{
      padding: '10px 20px',
      color: '#b91c1c',
      background: '#fef2f2',
      borderBottom: '1px solid #fecaca',
      fontSize: 13,
      fontWeight: 600,
    }}
  >
    {statusError}
  </div>
)}

<div style={styles.tableScroll}>
        <table style={styles.table}>
          <colgroup>
            <col style={{ width: '11%' }} />
            <col style={{ width: '17%' }} />
            <col style={{ width: '22%' }} />
            <col style={{ width: '14%' }} />
            <col style={{ width: '23%' }} />
            <col style={{ width: '13%' }} />
          </colgroup>
          <thead>
            <tr>
              <th style={styles.th}>Customer ID</th>
              <th style={styles.th}>Customer Name</th>
              <th style={styles.th}>Email Address</th>
              <th style={styles.th}>Phone Number</th>
              <th style={styles.th}>Customer Address</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>
                  <div style={styles.emptyState}>Loading customers...</div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6}>
                  <div style={{ ...styles.emptyState, color: '#d32f2f' }}>
                    Error: {error}
                  </div>
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div style={styles.emptyState}>
                    No customers found.{' '}
                    <button type="button" style={styles.emptyAddBtn} onClick={() => setIsModalOpen(true)}>
                      Add your first customer →
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr
                  key={customer.id}
                  style={
                    hoveredRow === customer.id
                      ? { ...styles.tr, ...styles.trHover }
                      : styles.tr
                  }
                  onMouseEnter={() => setHoveredRow(customer.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td style={styles.td}>
                    <span style={styles.idBadge}>#{customer.id}</span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.customerCell}>
                      <span style={styles.avatar}>{customer.initials}</span>
                      <span>{customer.name}</span>
                    </div>
                  </td>
                  <td style={{ ...styles.td, ...styles.emailCell }}>{customer.email}</td>
                  <td style={styles.td}>{customer.phone}</td>
                  <td style={styles.td}>
                    <div style={styles.addressCell}>{customer.address}</div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionBtns}>
                      {customer.isActive && (
                        <button type="button" style={styles.editBtn} aria-label="Edit" onClick={() => handleEdit(customer)}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                      )}
                      <button
                        type="button"
                        style={{
                          ...styles.statusBtn,
                          color: customer.isActive ? '#b91c1c' : '#166534',
                          border: `1px solid ${customer.isActive ? '#fecaca' : '#bbf7d0'}`,
                          background: customer.isActive ? '#fef2f2' : '#f0fdf4',
                          opacity: updatingStatusId === customer.id ? 0.55 : 1,
                        }}
                        onClick={() => handleStatusChange(customer)}
                        disabled={updatingStatusId === customer.id}
                      >
                        {updatingStatusId === customer.id
                          ? 'Updating...'
                          : customer.isActive
                            ? 'Disable'
                            : 'Enable'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
</div>
        <div style={styles.pagination}>
          <div style={styles.paginationInfo}>
            {total > 0 ? `Showing ${from}–${to} of ${total} customers` : 'No customers'}
          </div>
          <div style={styles.pageControls}>
            <button
              type="button"
              style={getPageBtnStyle(false, page <= 1)}
              onClick={() => goToPage(page - 1)}
              disabled={page <= 1}
            >
              &lt;
            </button>
            {visiblePages.map((p) => (
              <button
                type="button"
                key={p}
                style={getPageBtnStyle(p === page, false)}
                onClick={() => goToPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              style={getPageBtnStyle(false, page >= totalPages)}
              onClick={() => goToPage(page + 1)}
              disabled={page >= totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSuccess={() => {
          refresh();
        }}
        initialData={editingCustomer}
      />

    </>
  );
};

export default CustomerTable;
