'use client';

import React, { useEffect, useState } from 'react';

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialData?: {
    id?: string;
    recordId?: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  } | null;
}

const AddCustomerModal = ({
  isOpen,
  onClose,
  onSuccess = () => {},
  initialData = null,
}: AddCustomerModalProps) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setForm({
        name: initialData?.name ?? '',
        email: initialData?.email ?? '',
        phone: initialData?.phone ?? '',
        address: initialData?.address ?? '',
      });
      setError(null);
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setError('Name and email are required.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const customerUpdateId = initialData?.recordId || initialData?.id;
      const url = customerUpdateId
        ? `/api/v1/customers/${encodeURIComponent(customerUpdateId)}`
        : '/api/v1/customers';

      const res = await fetch(url, {
        method: customerUpdateId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message ?? `Server error: ${res.status}`);
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="header">
            <div>
              <h2 className="title">
                {initialData?.id ? 'Edit Customer' : 'Add New Customer'}
              </h2>
              <p className="subtitle">
                {initialData?.id
                  ? 'Update the customer profile and keep the directory current.'
                  : 'Create a new profile for shipping and order tracking.'}
              </p>
            </div>

            <button className="closeBtn" onClick={onClose} aria-label="Close">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="body">
            <div className="section">
              <div className="sectionHeader">
                <svg
                  className="sectionIcon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Personal Details
              </div>

              <div className="formGroup">
                <label className="formLabel">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="formInput"
                  placeholder="e.g. Jonathan Apple"
                />
              </div>

              <div className="formRow">
                <div className="formGroup">
                  <label className="formLabel">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="formInput"
                    placeholder="jon@example.com"
                  />
                </div>

                <div className="formGroup">
                  <label className="formLabel">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="formInput"
                    placeholder="+94 77 000 0000"
                  />
                </div>
              </div>
            </div>

            <div className="section">
              <div className="sectionHeader">
                <svg
                  className="sectionIcon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                Shipping Address
              </div>

              <div className="formGroup">
                <label className="formLabel">Full Address</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="formInput"
                  placeholder="No 123, Main Street, Jaffna"
                />
              </div>
            </div>

            {error && <p className="errorMsg">{error}</p>}
          </div>

          <div className="footer">
            <button className="btnCancel" onClick={onClose} disabled={submitting}>
              Cancel
            </button>

            <button
              className="btnSubmit"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting
                ? initialData?.id
                  ? 'Saving...'
                  : 'Adding...'
                : initialData?.id
                  ? 'Save Changes'
                  : 'Add Customer'}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(15, 23, 42, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .modal {
          background: #ffffff;
          border-radius: 16px;
          width: 100%;
          max-width: 680px;
          max-height: calc(100vh - 40px);
          box-shadow: 0 24px 60px rgba(15, 23, 42, 0.24);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .header {
          padding: 24px 32px 20px;
          border-bottom: 1px solid #e5e7eb;
          position: relative;
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }

        .title {
          color: #111827;
          font-size: 26px;
          font-weight: 800;
          margin: 0 0 5px;
          letter-spacing: -0.03em;
        }

        .subtitle {
          color: #475569;
          font-size: 14px;
          margin: 0;
        }

        .closeBtn {
          width: 38px;
          height: 38px;
          border: none;
          border-radius: 12px;
          background: transparent;
          color: #111827;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .closeBtn:hover {
          background: #f1f5f9;
        }

        .body {
          padding: 24px 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          overflow-y: auto;
        }

        .section {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .sectionHeader {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #111827;
          font-weight: 800;
          font-size: 17px;
        }

        .sectionIcon {
          color: #0f3b82;
        }

        .formGroup {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;
        }

        .formRow {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          width: 100%;
        }

        .formLabel {
          font-size: 11px;
          font-weight: 800;
          color: #111827;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .formInput {
          width: 100%;
          height: 46px;
          padding: 0 14px;
          border: 1px solid #cbd5e1;
          border-radius: 9px;
          background: #ffffff;
          color: #111827;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          transition:
            border-color 0.2s,
            box-shadow 0.2s;
        }

        .formInput::placeholder {
          color: #94a3b8;
        }

        .formInput:focus {
          border-color: #174092;
          box-shadow: 0 0 0 4px rgba(23, 64, 146, 0.12);
        }

        .errorMsg {
          margin: 0;
          padding: 12px 14px;
          border: 1px solid #fecaca;
          border-radius: 12px;
          background: #fef2f2;
          color: #dc2626;
          font-size: 14px;
          font-weight: 600;
        }

        .footer {
          padding: 18px 32px;
          background: #f8fafc;
          border-top: 1px solid #e5e7eb;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }

        .btnCancel,
        .btnSubmit {
          min-width: 132px;
          height: 46px;
          border-radius: 10px;
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          transition:
            transform 0.15s,
            box-shadow 0.15s,
            background-color 0.15s;
        }

        .btnCancel {
          background: #ffffff;
          color: #0f3b82;
          border: 2px solid #0f3b82;
        }

        .btnCancel:hover {
          background: #eff6ff;
        }

        .btnSubmit {
          background: #174092;
          color: #ffffff;
          border: 2px solid #174092;
        }

        .btnSubmit:hover {
          background: #0f3b82;
          box-shadow: 0 10px 18px rgba(23, 64, 146, 0.22);
        }

        .btnCancel:disabled,
        .btnSubmit:disabled {
          opacity: 0.55;
          cursor: not-allowed;
          box-shadow: none;
        }

        @media (max-width: 768px) {
          .overlay {
            padding: 14px;
            align-items: flex-start;
          }

          .modal {
            max-height: 94vh;
            border-radius: 16px;
          }

          .header {
            padding: 24px 22px 18px;
          }

          .title {
            font-size: 24px;
          }

          .subtitle {
            font-size: 14px;
          }

          .body {
            padding: 24px 22px;
          }

          .formRow {
            grid-template-columns: 1fr;
          }

          .footer {
            padding: 18px 22px 22px;
            flex-direction: column;
          }

          .btnCancel,
          .btnSubmit {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default AddCustomerModal;
