'use client';

import React, { useEffect, useState } from 'react';
import { useCustomers } from '@/hooks/useCustomers';
import AddCustomerModal from './AddCustomerModal';

const styles: Record<string, React.CSSProperties> = {
  tableContainer: {
    backgroundColor: 'var(--bg-panel)',
    border: '1px solid var(--border-color)',
    borderRadius: 8,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    borderBottom: '1px solid var(--border-color)',
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
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '16px 24px',
    backgroundColor: 'var(--bg-table-header)',
    color: 'var(--text-muted)',
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '1px solid var(--border-color)',
  },
  td: {
    padding: '20px 24px',
    fontSize: 14,
    color: 'var(--text-main)',
    borderBottom: '1px solid var(--border-color)',
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
    backgroundColor: 'var(--bg-table-header)',
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
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'var(--border-color)',
    backgroundColor: 'white',
    borderRadius: 4,
    fontSize: 14,
    color: 'var(--text-muted)',
    transition: 'all 0.2s',
    cursor: 'pointer',
  },
  pageBtnActive: {
    backgroundColor: 'var(--color-primary-dark)',
    color: 'white',
    borderColor: 'var(--color-primary-dark)',
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
    width: 34,
    height: 34,
    borderRadius: '50%',
    backgroundColor: '#e0e7ff',
    color: '#174092',
    fontSize: 12,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
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
    borderRadius: 6,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'var(--border-color)',
    color: 'var(--text-muted)',
    transition: 'all 0.2s',
    background: 'transparent',
    cursor: 'pointer',
  },
  deleteBtn: {
    width: 30,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'var(--border-color)',
    color: '#dc2626',
    transition: 'all 0.2s',
    background: 'transparent',
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
  const [customerToDelete, setCustomerToDelete] = useState<typeof customers[number] | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<string | number | null>(null);
  const [isSmallViewport, setIsSmallViewport] = useState(false);

  useEffect(() => {
    const updateViewport = () => setIsSmallViewport(window.innerWidth <= 768);
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

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

  const handleDelete = async () => {
    if (!customerToDelete) return;

    setDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch(`/api/v1/customers?id=${customerToDelete.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message ?? `Server error: ${res.status}`);
      }

      setCustomerToDelete(null);
      await refresh();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setDeleting(false);
    }
  };

  const getPageBtnStyle = (active: boolean, disabled: boolean) => ({
    ...styles.pageBtn,
    ...(active ? styles.pageBtnActive : {}),
    ...(disabled ? styles.pageBtnDisabled : {}),
  });

  const deleteMessageStyle: React.CSSProperties = isSmallViewport
    ? { ...styles.deleteMessage, margin: '0 20px', padding: '22px', fontSize: 15 }
    : (styles.deleteMessage as React.CSSProperties);

  const deleteActionsStyle: React.CSSProperties = {
    ...styles.deleteActions,
    flexDirection: isSmallViewport ? 'column' : 'row',
  };

  const deleteCancelBtnStyle: React.CSSProperties = isSmallViewport
    ? { ...styles.deleteCancelBtn, width: '100%', minWidth: 0 }
    : (styles.deleteCancelBtn as React.CSSProperties);

  const deleteConfirmBtnStyle: React.CSSProperties = isSmallViewport
    ? { ...styles.deleteConfirmBtn, width: '100%', minWidth: 0 }
    : (styles.deleteConfirmBtn as React.CSSProperties);

  return (
    <>
      <div style={styles.tableContainer}>
        <div style={styles.tableHeader}>
          <div style={styles.tableTitleGroup}>
            <h2 style={styles.tableTitle}>Active Directory</h2>
            {stats.newToday > 0 && (
              <span style={styles.newPill}>+{stats.newToday} New Today</span>
            )}
          </div>
          <div style={styles.tableActions}>
            <button type="button" style={styles.iconBtn} aria-label="Filter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
            </button>
            <button type="button" style={styles.iconBtn} aria-label="Download">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
          </div>
        </div>

        <table style={styles.table}>
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
                  <td style={styles.td}>{customer.email}</td>
                  <td style={styles.td}>{customer.phone}</td>
                  <td style={styles.td}>{customer.address}</td>
                  <td style={styles.td}>
                    <div style={styles.actionBtns}>
                      <button type="button" style={styles.editBtn} aria-label="Edit" onClick={() => handleEdit(customer)}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button type="button" style={styles.deleteBtn} aria-label="Delete" onClick={() => setCustomerToDelete(customer)}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
                          <path d="M10 11v6"></path>
                          <path d="M14 11v6"></path>
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
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

      {customerToDelete && (
        <div style={styles.deleteOverlay} onClick={() => setCustomerToDelete(null)}>
          <div style={styles.deleteModal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.deleteTopBar} />
            <div style={styles.deleteIconWrap}>
              <div style={styles.deleteIconCircle}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3l-8.47-14.14a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
            </div>
            <h3 style={styles.deleteTitle}>Delete Customer Profile</h3>
            <div style={deleteMessageStyle}>
              Are you sure you want to permanently delete the profile for <strong>{customerToDelete.name}</strong> (ID: <strong>#{customerToDelete.id}</strong>)? This action cannot be undone.
            </div>
            {deleteError && <p style={styles.deleteError}>{deleteError}</p>}
            <div style={deleteActionsStyle}>
              <button type="button" style={deleteCancelBtnStyle} onClick={() => setCustomerToDelete(null)} disabled={deleting}>
                Cancel
              </button>
              <button type="button" style={deleteConfirmBtnStyle} onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
            <div style={styles.deleteFooter}>Confirmation required • System audit log will be updated</div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerTable;
