'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useCustomers } from '@/hooks/useCustomers';
import AddCustomerModal from './AddCustomerModal';

const styles: Record<string, React.CSSProperties> = {
  tableContainer: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: '#ffffff',
    border: '1px solid #cbd5e1',
    borderRadius: 16,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
    boxSizing: 'border-box',
  },

  tableHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    padding: '14px 20px',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
  },

  tableTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: 'var(--color-primary-dark)',
  },

  tableActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },

  iconBtn: {
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--border-color)',
    borderRadius: 6,
    color: 'var(--text-muted)',
    background: 'transparent',
    cursor: 'pointer',
    flexShrink: 0,
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
    verticalAlign: 'middle',
    wordBreak: 'break-word',
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
    overflowWrap: 'anywhere',
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
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    padding: '14px 20px',
    backgroundColor: '#ffffff',
    borderTop: '1px solid #e5e7eb',
    flexShrink: 0,
    boxSizing: 'border-box',
  },

  paginationInfo: {
    fontSize: 13,
    color: 'var(--text-muted)',
    minWidth: 0,
  },

  pageControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
    flexWrap: 'wrap',
  },

  pageBtn: {
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid transparent',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    fontSize: 14,
    color: '#334155',
    cursor: 'pointer',
    flexShrink: 0,
  },

  pageBtnActive: {
    backgroundColor: '#003B7A',
    color: '#ffffff',
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
    minWidth: 0,
    textAlign: 'left',
  },

  avatar: {
    width: 32,
    height: 32,
    minWidth: 32,
    borderRadius: '50%',
    background: '#DBEAFE',
    color: '#1E40AF',
    fontSize: 12,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionBtns: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },

  editBtn: {
    width: 50,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    border: '1px solid #cbd5e1',
    color: '#0f172a',
    background: '#ffffff',
    cursor: 'pointer',
    flexShrink: 0,
  },

  statusBtn: {
    minWidth: 76,
    height: 30,
    padding: '0 12px',
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 700,
    cursor: 'pointer',
    flexShrink: 0,
  },

  /* Mobile */
  mobileList: {
    display: 'none',
    width: '100%',
  },

  mobileCard: {
    width: '100%',
    padding: '16px',
    borderBottom: '1px solid #E5E7EB',
    boxSizing: 'border-box',
  },

  mobileTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 14,
  },

  mobileIdentity: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    minWidth: 0,
    flex: 1,
  },

  mobileName: {
    fontSize: 14,
    fontWeight: 600,
    color: '#0F172A',
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
  },

  mobileId: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },

  mobileActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 6,
    flexShrink: 0,
  },

  mobileDetails: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 10,
  },

  mobileDetail: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    minWidth: 0,
  },

  mobileLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: '0.03em',
  },

  mobileValue: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 1.4,
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
  },
};

type CustomerRow = {
  id: string;
  recordId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  initials: string;
  isActive: boolean;
  source?: string;
};

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const normalizeCustomer = (customer: any): CustomerRow => {
  const name =
    customer.customerName ||
    customer.name ||
    `${customer.firstName ?? ''} ${customer.lastName ?? ''}`.trim() ||
    'Unknown';

  return {
    id: String(
      customer.customerId ||
        customer.id ||
        customer._id ||
        customer.recordId ||
        '',
    ),

    recordId: String(
      customer._id ||
        customer.recordId ||
        customer.id ||
        '',
    ),

    name,

    email:
      customer.emailAddress ||
      customer.email ||
      'Not provided',

    phone:
      customer.phoneNumber ||
      customer.phone ||
      'Not provided',

    address:
      customer.customerAddress ||
      customer.address ||
      'Not provided',

    initials: getInitials(name),

    isActive:
      customer.isActive ??
      customer.status !== 'inactive',

    source: customer.source,
  };
};

const extractCustomers = (data: any): any[] => {
  if (Array.isArray(data?.data?.customers)) {
    return data.data.customers;
  }

  if (Array.isArray(data?.data?.items)) {
    return data.data.items;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.customers)) {
    return data.customers;
  }

  if (Array.isArray(data?.items)) {
    return data.items;
  }

  if (Array.isArray(data)) {
    return data;
  }

  return [];
};

type CustomerTableProps = {
  onCustomersChanged?: () => void;
};

const CustomerTable = ({
  onCustomersChanged,
}: CustomerTableProps) => {
  const {
    customers,
    stats,
    loading,
    error,
    page,
    total,
    totalPages,
    limit,
    goToPage,
    refresh,
  } = useCustomers();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingCustomer, setEditingCustomer] =
    useState<CustomerRow | null>(null);

  const [updatingStatusId, setUpdatingStatusId] =
    useState<string | null>(null);

  const [statusError, setStatusError] =
    useState<string | null>(null);

  const [hoveredRow, setHoveredRow] =
    useState<string | number | null>(null);

  const [showFilter, setShowFilter] =
    useState(false);

  const [searchText, setSearchText] =
    useState('');

  const [statusFilter, setStatusFilter] =
    useState<'all' | 'Enable' | 'Disable'>('all');

  const [allCustomers, setAllCustomers] =
    useState<CustomerRow[]>([]);

  const [allCustomersLoading, setAllCustomersLoading] =
    useState(false);

  const currentPageCustomers = useMemo(
    () =>
      customers.map((customer: any) =>
        normalizeCustomer(customer),
      ),
    [customers],
  );

  const fetchAllCustomers = async () => {
    setAllCustomersLoading(true);

    try {
      const res = await fetch(
        '/api/v1/customers?page=1&limit=10000',
      );

      if (!res.ok) {
        throw new Error(
          'Unable to load all customers',
        );
      }

      const data = await res.json();

      const list = extractCustomers(data).map(
        normalizeCustomer,
      );

      setAllCustomers(list);
    } catch {
      setAllCustomers(currentPageCustomers);
    } finally {
      setAllCustomersLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCustomers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, customers.length]);

  const isFiltering =
    searchText.trim() !== '' ||
    statusFilter !== 'all';

  const filterCustomers = (
    list: CustomerRow[],
  ) => {
    const keyword =
      searchText.trim().toLowerCase();

    return list.filter((customer) => {
      const matchesSearch =
        keyword === '' ||
        String(customer.id ?? '')
          .toLowerCase()
          .includes(keyword) ||
        String(customer.name ?? '')
          .toLowerCase()
          .includes(keyword) ||
        String(customer.email ?? '')
          .toLowerCase()
          .includes(keyword) ||
        String(customer.phone ?? '')
          .toLowerCase()
          .includes(keyword) ||
        String(customer.address ?? '')
          .toLowerCase()
          .includes(keyword);

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'Enable' &&
          customer.isActive) ||
        (statusFilter === 'Disable' &&
          !customer.isActive);

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  };

  const filteredAllCustomers = useMemo(() => {
    const source =
      allCustomers.length > 0
        ? allCustomers
        : currentPageCustomers;

    return filterCustomers(source);
  }, [
    allCustomers,
    currentPageCustomers,
    searchText,
    statusFilter,
  ]);

  const tableCustomers = isFiltering
    ? filteredAllCustomers
    : currentPageCustomers;

  const downloadCustomers =
    filteredAllCustomers;

  const escapeCsv = (value: unknown) => {
    const text = String(value ?? '');

    return `"${text.replace(
      /"/g,
      '""',
    )}"`;
  };

  const handleDownload = async () => {
    if (allCustomers.length === 0) {
      await fetchAllCustomers();
    }

    const rowsToDownload =
      downloadCustomers.length > 0
        ? downloadCustomers
        : allCustomers.length > 0
          ? filterCustomers(allCustomers)
          : filterCustomers(
              currentPageCustomers,
            );

    const header = [
      'Customer ID',
      'Customer Name',
      'Email Address',
      'Phone Number',
      'Customer Address',
      'Status',
    ];

    const rows = rowsToDownload.map(
      (customer) => [
        customer.id,
        customer.name,
        customer.email,
        customer.phone,
        customer.address,
        customer.isActive
          ? 'Enable'
          : 'Disable',
      ],
    );

    const csvContent = [
      header,
      ...rows,
    ]
      .map((row) =>
        row
          .map(escapeCsv)
          .join(','),
      )
      .join('\n');

    const blob = new Blob(
      [csvContent],
      {
        type: 'text/csv;charset=utf-8;',
      },
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement('a');

    link.href = url;
    link.download =
      'customers.csv';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const from =
    total === 0
      ? 0
      : (page - 1) * limit + 1;

  const to = Math.min(
    page * limit,
    total,
  );

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  const handleEdit = (
    customer: CustomerRow,
  ) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (
    customer: CustomerRow,
  ) => {
    setUpdatingStatusId(
      customer.id,
    );

    setStatusError(null);

    try {
      const res = await fetch(
        `/api/v1/customers/${customer.recordId}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            isActive:
              !customer.isActive,
            source:
              customer.source,
          }),
        },
      );

      if (!res.ok) {
        const data =
          await res
            .json()
            .catch(() => ({}));

        throw new Error(
          data?.message ??
            `Server error: ${res.status}`,
        );
      }

      await refresh();
      await fetchAllCustomers();

      onCustomersChanged?.();
    } catch (err) {
      setStatusError(
        err instanceof Error
          ? err.message
          : 'Unable to update customer status',
      );
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const getPageBtnStyle = (
    active: boolean,
    disabled: boolean,
  ) => ({
    ...styles.pageBtn,
    ...(active
      ? styles.pageBtnActive
      : {}),
    ...(disabled
      ? styles.pageBtnDisabled
      : {}),
  });

  /*
   * Desktop:
   * Show up to 5 pages.
   *
   * Mobile:
   * Show only 3 pages around current page.
   */
  const firstVisiblePage = Math.max(
    1,
    Math.min(
      page - 2,
      Math.max(
        totalPages - 4,
        1,
      ),
    ),
  );

  const visiblePages = Array.from(
    {
      length: Math.min(
        5,
        totalPages,
      ),
    },
    (_, index) =>
      firstVisiblePage + index,
  );

  const mobileFirstPage = Math.max(
    1,
    Math.min(
      page - 1,
      Math.max(
        totalPages - 2,
        1,
      ),
    ),
  );

  const mobileVisiblePages =
    Array.from(
      {
        length: Math.min(
          3,
          totalPages,
        ),
      },
      (_, index) =>
        mobileFirstPage + index,
    );

  return (
    <>
      <div
        style={styles.tableContainer}
      >
        {/* HEADER */}
        <div
          style={styles.tableHeader}
        >
          <div
            style={{
              display: 'flex',
              alignItems:
                'center',
              gap: 10,
              minWidth: 0,
              flexWrap:
                'wrap',
            }}
          >
            <span
              style={
                styles.tableTitle
              }
            >
              Active Directory
            </span>

            {stats.newToday > 0 && (
              <span
                style={{
                  background:
                    '#E0E7FF',
                  color:
                    '#1D4ED8',
                  padding:
                    '4px 10px',
                  borderRadius:
                    20,
                  fontSize: 11,
                  fontWeight: 700,
                  whiteSpace:
                    'nowrap',
                }}
              >
                +{stats.newToday}{' '}
                New Today
              </span>
            )}
          </div>

          <div
            style={
              styles.tableActions
            }
          >
            <button
              type="button"
              style={
                styles.iconBtn
              }
              aria-label="Filter customers"
              onClick={() => {
                setShowFilter(
                  (prev) => {
                    const next =
                      !prev;

                    if (next) {
                      void fetchAllCustomers();
                    }

                    return next;
                  },
                );
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </button>

            <button
              type="button"
              style={{
                ...styles.iconBtn,
                opacity:
                  downloadCustomers.length ===
                    0 ||
                  allCustomersLoading
                    ? 0.5
                    : 1,
              }}
              aria-label="Download customers"
              onClick={
                handleDownload
              }
              disabled={
                downloadCustomers.length ===
                  0 ||
                allCustomersLoading
              }
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line
                  x1="12"
                  y1="15"
                  x2="12"
                  y2="3"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* FILTER */}
        {showFilter && (
          <div
            className="customerFilter"
            style={{
              display: 'flex',
              gap: 10,
              padding:
                '14px 20px',
              borderBottom:
                '1px solid #e5e7eb',
              background:
                '#F8FAFC',
              flexWrap:
                'wrap',
              alignItems:
                'center',
              boxSizing:
                'border-box',
            }}
          >
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={
                searchText
              }
              onChange={(e) =>
                setSearchText(
                  e.target.value,
                )
              }
              style={{
                flex:
                  '1 1 240px',
                minWidth: 0,
                height: 38,
                border:
                  '1px solid #CBD5E1',
                borderRadius: 8,
                padding:
                  '0 12px',
                fontSize: 14,
                outline:
                  'none',
                boxSizing:
                  'border-box',
              }}
            />

            <select
              value={
                statusFilter
              }
              onChange={(e) => {
                setStatusFilter(
                  e.target
                    .value as
                    | 'all'
                    | 'Enable'
                    | 'Disable',
                );

                void fetchAllCustomers();
              }}
              style={{
                flex:
                  '0 1 160px',
                minWidth: 130,
                height: 38,
                border:
                  '1px solid #CBD5E1',
                borderRadius: 8,
                padding:
                  '0 12px',
                fontSize: 14,
                background:
                  '#fff',
                outline:
                  'none',
              }}
            >
              <option value="all">
                All Status
              </option>

              <option value="Enable">
                Enable
              </option>

              <option value="Disable">
                Disable
              </option>
            </select>

            <button
              type="button"
              onClick={() => {
                setSearchText('');
                setStatusFilter(
                  'all',
                );
              }}
              style={{
                height: 38,
                border:
                  '1px solid #CBD5E1',
                borderRadius: 8,
                padding:
                  '0 14px',
                background:
                  '#fff',
                cursor:
                  'pointer',
                fontWeight: 600,
                color:
                  '#334155',
              }}
            >
              Clear
            </button>

            <span
              style={{
                fontSize: 12,
                color:
                  '#64748B',
              }}
            >
              {allCustomersLoading
                ? 'Loading all customers...'
                : `${filteredAllCustomers.length} result(s)`}
            </span>
          </div>
        )}

        {/* ERROR */}
        {statusError && (
          <div
            role="alert"
            style={{
              padding:
                '10px 20px',
              color:
                '#b91c1c',
              background:
                '#fef2f2',
              borderBottom:
                '1px solid #fecaca',
              fontSize: 13,
              fontWeight: 600,
              overflowWrap:
                'anywhere',
            }}
          >
            {statusError}
          </div>
        )}

        {/* DESKTOP TABLE */}
        <div
          className="desktopCustomerTable"
          style={
            styles.tableScroll
          }
        >
          <table
            style={styles.table}
          >
            <colgroup>
              <col
                style={{
                  width:
                    '11%',
                }}
              />

              <col
                style={{
                  width:
                    '17%',
                }}
              />

              <col
                style={{
                  width:
                    '22%',
                }}
              />

              <col
                style={{
                  width:
                    '14%',
                }}
              />

              <col
                style={{
                  width:
                    '23%',
                }}
              />

              <col
                style={{
                  width:
                    '15%',
                }}
              />
            </colgroup>

            <thead>
              <tr>
                <th
                  style={
                    styles.th
                  }
                >
                  Customer ID
                </th>

                <th
                  style={
                    styles.th
                  }
                >
                  Customer Name
                </th>

                <th
                  style={
                    styles.th
                  }
                >
                  Email Address
                </th>

                <th
                  style={
                    styles.th
                  }
                >
                  Phone Number
                </th>

                <th
                  style={
                    styles.th
                  }
                >
                  Customer Address
                </th>

                <th
                  style={
                    styles.th
                  }
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ||
              allCustomersLoading ? (
                <tr>
                  <td
                    colSpan={6}
                  >
                    <div
                      style={
                        styles.emptyState
                      }
                    >
                      Loading
                      customers...
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={6}
                  >
                    <div
                      style={{
                        ...styles.emptyState,
                        color:
                          '#d32f2f',
                      }}
                    >
                      Error:{' '}
                      {error}
                    </div>
                  </td>
                </tr>
              ) : tableCustomers.length ===
                0 ? (
                <tr>
                  <td
                    colSpan={6}
                  >
                    <div
                      style={
                        styles.emptyState
                      }
                    >
                      No customers
                      found.{' '}
                      <button
                        type="button"
                        style={
                          styles.emptyAddBtn
                        }
                        onClick={() =>
                          setIsModalOpen(
                            true,
                          )
                        }
                      >
                        Add your
                        first
                        customer
                        →
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                tableCustomers.map(
                  (
                    customer,
                  ) => (
                    <tr
                      key={
                        customer.id
                      }
                      style={
                        hoveredRow ===
                        customer.id
                          ? {
                              ...styles.tr,
                              ...styles.trHover,
                            }
                          : styles.tr
                      }
                      onMouseEnter={() =>
                        setHoveredRow(
                          customer.id,
                        )
                      }
                      onMouseLeave={() =>
                        setHoveredRow(
                          null,
                        )
                      }
                    >
                      <td
                        style={
                          styles.td
                        }
                      >
                        <span
                          style={
                            styles.idBadge
                          }
                        >
                          #
                          {
                            customer.id
                          }
                        </span>
                      </td>

                      <td
                        style={
                          styles.td
                        }
                      >
                        <div
                          style={
                            styles.customerCell
                          }
                        >
                          <span
                            style={
                              styles.avatar
                            }
                          >
                            {
                              customer.initials
                            }
                          </span>

                          <span
                            style={{
                              overflowWrap:
                                'anywhere',
                            }}
                          >
                            {
                              customer.name
                            }
                          </span>
                        </div>
                      </td>

                      <td
                        style={{
                          ...styles.td,
                          ...styles.emailCell,
                        }}
                      >
                        {
                          customer.email
                        }
                      </td>

                      <td
                        style={
                          styles.td
                        }
                      >
                        {
                          customer.phone
                        }
                      </td>

                      <td
                        style={
                          styles.td
                        }
                      >
                        <div
                          style={
                            styles.addressCell
                          }
                        >
                          {
                            customer.address
                          }
                        </div>
                      </td>

                      <td
                        style={
                          styles.td
                        }
                      >
                        <div
                          style={
                            styles.actionBtns
                          }
                        >
                          {customer.isActive && (
                            <button
                              type="button"
                              style={
                                styles.editBtn
                              }
                              aria-label="Edit customer"
                              onClick={() =>
                                handleEdit(
                                  customer,
                                )
                              }
                            >
                              <EditIcon />
                            </button>
                          )}

                          <button
                            type="button"
                            style={{
                              ...styles.statusBtn,
                              color:
                                customer.isActive
                                  ? '#b91c1c'
                                  : '#166534',
                              borderWidth: 1,
                              borderStyle: 'solid',
                              borderColor:  customer.isActive
                                    ? '#fecaca'
                                    : '#bbf7d0',
                              background:
                                customer.isActive
                                  ? '#fef2f2'
                                  : '#f0fdf4',
                              opacity:
                                updatingStatusId ===
                                customer.id
                                  ? 0.55
                                  : 1,
                            }}
                            onClick={() =>
                              handleStatusChange(
                                customer,
                              )
                            }
                            disabled={
                              updatingStatusId ===
                              customer.id
                            }
                          >
                            {updatingStatusId ===
                            customer.id
                              ? 'Updating...'
                              : customer.isActive
                                ? 'Disable'
                                : 'Enable'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ),
                )
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE CUSTOMER CARDS */}
        <div
          className="mobileCustomerList"
          style={
            styles.mobileList
          }
        >
          {loading ||
          allCustomersLoading ? (
            <div
              style={
                styles.emptyState
              }
            >
              Loading
              customers...
            </div>
          ) : error ? (
            <div
              style={{
                ...styles.emptyState,
                color:
                  '#d32f2f',
              }}
            >
              Error: {error}
            </div>
          ) : tableCustomers.length ===
            0 ? (
            <div
              style={
                styles.emptyState
              }
            >
              No customers
              found.{' '}
              <button
                type="button"
                style={
                  styles.emptyAddBtn
                }
                onClick={() =>
                  setIsModalOpen(
                    true,
                  )
                }
              >
                Add your
                first customer
                →
              </button>
            </div>
          ) : (
            tableCustomers.map(
              (customer) => (
                <div
                  key={
                    customer.id
                  }
                  style={
                    styles.mobileCard
                  }
                >
                  {/* MOBILE TOP */}
                  <div
                    style={
                      styles.mobileTop
                    }
                  >
                    <div
                      style={
                        styles.mobileIdentity
                      }
                    >
                      <span
                        style={
                          styles.avatar
                        }
                      >
                        {
                          customer.initials
                        }
                      </span>

                      <div
                        style={{
                          minWidth: 0,
                        }}
                      >
                        <div
                          style={
                            styles.mobileName
                          }
                        >
                          {
                            customer.name
                          }
                        </div>

                        <div
                          style={
                            styles.mobileId
                          }
                        >
                          #
                          {
                            customer.id
                          }
                        </div>
                      </div>
                    </div>

                    {/* MOBILE ACTIONS */}
                    <div
                      style={
                        styles.mobileActions
                      }
                    >
                      {/* EDIT ICON */}
                      {customer.isActive && (
                        <button
                          type="button"
                          style={
                            styles.editBtn
                          }
                          aria-label="Edit customer"
                          onClick={() =>
                            handleEdit(
                              customer,
                            )
                          }
                        >
                          <EditIcon />
                        </button>
                      )}

                      {/* ENABLE / DISABLE */}
                      <button
                        type="button"
                        style={{
                          ...styles.statusBtn,
                          minWidth: 68,
                          padding:
                            '0 8px',
                          color:
                            customer.isActive
                              ? '#b91c1c'
                              : '#166534',
                          border:
                            `1px solid ${
                              customer.isActive
                                ? '#fecaca'
                                : '#bbf7d0'
                            }`,
                          background:
                            customer.isActive
                              ? '#fef2f2'
                              : '#f0fdf4',
                          opacity:
                            updatingStatusId ===
                            customer.id
                              ? 0.55
                              : 1,
                        }}
                        onClick={() =>
                          handleStatusChange(
                            customer,
                          )
                        }
                        disabled={
                          updatingStatusId ===
                          customer.id
                        }
                      >
                        {updatingStatusId ===
                        customer.id
                          ? '...'
                          : customer.isActive
                            ? 'Disable'
                            : 'Enable'}
                      </button>
                    </div>
                  </div>

                  {/* MOBILE DETAILS */}
                  <div
                    style={
                      styles.mobileDetails
                    }
                  >
                    <div
                      style={
                        styles.mobileDetail
                      }
                    >
                      <span
                        style={
                          styles.mobileLabel
                        }
                      >
                        Email
                      </span>

                      <span
                        style={
                          styles.mobileValue
                        }
                      >
                        {
                          customer.email
                        }
                      </span>
                    </div>

                    <div
                      style={
                        styles.mobileDetail
                      }
                    >
                      <span
                        style={
                          styles.mobileLabel
                        }
                      >
                        Phone
                      </span>

                      <span
                        style={
                          styles.mobileValue
                        }
                      >
                        {
                          customer.phone
                        }
                      </span>
                    </div>

                    <div
                      style={
                        styles.mobileDetail
                      }
                    >
                      <span
                        style={
                          styles.mobileLabel
                        }
                      >
                        Address
                      </span>

                      <span
                        style={
                          styles.mobileValue
                        }
                      >
                        {
                          customer.address
                        }
                      </span>
                    </div>
                  </div>
                </div>
              ),
            )
          )}
        </div>

        {/* PAGINATION */}
        <div
          className="customerPagination"
          style={
            styles.pagination
          }
        >
          <div
            style={
              styles.paginationInfo
            }
          >
            {isFiltering
              ? `Showing ${tableCustomers.length} filtered customer(s)`
              : total > 0
                ? `Showing ${from}–${to} of ${total} customers`
                : 'No customers'}
          </div>

          {!isFiltering &&
            totalPages > 1 && (
              <>
                {/* DESKTOP PAGINATION */}
                <div className="desktopPagination">
                  <div
                    style={
                      styles.pageControls
                    }
                  >
                    <button
                      type="button"
                      style={getPageBtnStyle(
                        false,
                        page <=
                          1,
                      )}
                      onClick={() =>
                        goToPage(
                          page - 1,
                        )
                      }
                      disabled={
                        page <=
                        1
                      }
                    >
                      &lt;
                    </button>

                    {visiblePages.map(
                      (p) => (
                        <button
                          type="button"
                          key={
                            p
                          }
                          style={getPageBtnStyle(
                            p ===
                              page,
                            false,
                          )}
                          onClick={() =>
                            goToPage(
                              p,
                            )
                          }
                        >
                          {p}
                        </button>
                      ),
                    )}

                    <button
                      type="button"
                      style={getPageBtnStyle(
                        false,
                        page >=
                          totalPages,
                      )}
                      onClick={() =>
                        goToPage(
                          page + 1,
                        )
                      }
                      disabled={
                        page >=
                        totalPages
                      }
                    >
                      &gt;
                    </button>
                  </div>
                </div>

                {/* MOBILE PAGINATION */}
                <div className="mobilePagination">
                  <button
                    type="button"
                    style={getPageBtnStyle(
                      false,
                      page <=
                        1,
                    )}
                    onClick={() =>
                      goToPage(
                        page - 1,
                      )
                    }
                    disabled={
                      page <= 1
                    }
                  >
                    &lt;
                  </button>

                  {mobileVisiblePages.map(
                    (p) => (
                      <button
                        type="button"
                        key={
                          p
                        }
                        style={getPageBtnStyle(
                          p ===
                            page,
                          false,
                        )}
                        onClick={() =>
                          goToPage(
                            p,
                          )
                        }
                      >
                        {p}
                      </button>
                    ),
                  )}

                  <button
                    type="button"
                    style={getPageBtnStyle(
                      false,
                      page >=
                        totalPages,
                    )}
                    onClick={() =>
                      goToPage(
                        page + 1,
                      )
                    }
                    disabled={
                      page >=
                      totalPages
                    }
                  >
                    &gt;
                  </button>
                </div>
              </>
            )}
        </div>
      </div>

      <AddCustomerModal
        isOpen={
          isModalOpen
        }
        onClose={
          closeModal
        }
        onSuccess={async () => {
          await refresh();
          await fetchAllCustomers();
          onCustomersChanged?.();
        }}
        initialData={
          editingCustomer
        }
      />

      {/* RESPONSIVE CSS */}
      <style jsx>{`
        .desktopCustomerTable {
          display: block;
          width: 100%;
        }

        .mobileCustomerList {
          display: none !important;
        }

        .desktopPagination {
          display: block;
        }

        .mobilePagination {
          display: none;
        }

        @media (max-width: 900px) {
          .desktopCustomerTable {
            display: none !important;
          }

          .mobileCustomerList {
            display: block !important;
          }
        }

        @media (max-width: 640px) {
          .customerFilter {
            flex-direction: column;
            align-items: stretch !important;
          }

          .customerFilter input,
          .customerFilter select,
          .customerFilter button {
            width: 100% !important;
            flex: none !important;
          }

          .customerFilter span {
            width: 100%;
          }
        }

        @media (max-width: 600px) {
          .desktopPagination {
            display: none !important;
          }

          .mobilePagination {
            display: flex !important;
            align-items: center;
            justify-content: center;
            gap: 5px;
            width: 100%;
          }

          .customerPagination {
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 10px !important;
            padding: 12px 14px !important;
          }

          .customerPagination > div:first-child {
            width: 100%;
            text-align: center;
            font-size: 12px;
          }

          .mobilePagination button {
            width: 34px !important;
            height: 34px !important;
            border-radius: 7px !important;
            font-size: 13px !important;
          }
        }

        @media (max-width: 480px) {
          .mobileCustomerCard {
            padding: 14px !important;
          }

          .mobileCustomerTop {
            align-items: flex-start !important;
          }

          .mobileCustomerActions {
            gap: 5px !important;
          }

          .customerPagination {
            padding-left: 10px !important;
            padding-right: 10px !important;
          }

          .mobilePagination {
            gap: 4px !important;
          }

          .mobilePagination button {
            width: 32px !important;
            height: 32px !important;
          }
        }
      `}</style>
    </>
  );
};

/* EDIT ICON */
const EditIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export default CustomerTable;