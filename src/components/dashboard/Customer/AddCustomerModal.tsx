'use client';

import React, { useEffect, useState } from 'react';

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // called after successful creation to refresh list
  initialData?: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  } | null;
}

/**
 * AddCustomerModal
 *
 * Modal used to create or edit a customer profile.
 * - Prevents body scroll when open.
 * - Initializes form with `initialData` when provided.
 * - Validates required fields (name, email) and posts to `/api/v1/customers`.
 *
 * Props:
 * - `isOpen`: controls visibility
 * - `onClose`: invoked to close the modal
 * - `onSuccess`: optional callback invoked after successful create/update
 * - `initialData`: optional customer object used to pre-fill the form when editing
 */
const AddCustomerModal = ({ isOpen, onClose, onSuccess = () => {}, initialData = null }: AddCustomerModalProps) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Reset form when modal opens (or when `initialData` changes)
  useEffect(() => {
    if (isOpen) {
      queueMicrotask(() => {
        setForm({
          name: initialData?.name ?? '',
          email: initialData?.email ?? '',
          phone: initialData?.phone ?? '',
          address: initialData?.address ?? '',
        });
        setError(null);
      });
    }
  }, [initialData, isOpen]);

  // Update a single field in the local form state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Validate inputs and POST/PATCH to the customers API endpoint.
  // On success, call `onSuccess` (if provided) and close the modal.
  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setError('Name and email are required.');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const url = initialData?.id
        ? `/api/v1/customers/${initialData.id}`
        : '/api/v1/customers';

      const res = await fetch(url, {
        method: initialData?.id ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message ?? `Server error: ${res.status}`);
      }
      // Refresh parent list and close modal
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  // Do not render modal markup when not open
  if (!isOpen) return null;

  return (
    <>
      <div className="overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="header">
            <h2 className="title">{initialData?.id ? 'Edit Customer' : 'Add New Customer'}</h2>
            <p className="subtitle">
              {initialData?.id ? 'Update the customer profile and keep the directory current.' : 'Create a new profile for shipping and order tracking.'}
            </p>
            <button className="closeBtn" onClick={onClose} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="body">
            {/* Personal Details Section */}
            <div className="section">
              <div className="sectionHeader">
                <svg className="sectionIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
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
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </div>

            <div className="section">
              <div className="sectionHeader">
                <svg className="sectionIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
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
                  placeholder="123 Gallery Way, Suite 100, San Francisco, CA 94103"
                />
              </div>
            </div>

            {error && <p className="errorMsg">{error}</p>}
          </div>

          <div className="footer">
            <button className="btnCancel" onClick={onClose} disabled={submitting}>Cancel</button>
            <button className="btnSubmit" onClick={handleSubmit} disabled={submitting}>
              {submitting ? (initialData?.id ? 'Saving...' : 'Adding...') : (initialData?.id ? 'Save Changes' : 'Add Customer')}
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(2px);
        }

        .modal {
          background-color: white;
          border-radius: 12px;
          width: 100%;
          max-width: 600px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .header {
          padding: 24px 32px;
          border-bottom: 1px solid var(--border-color);
          position: relative;
        }

        .title {
          color: var(--color-primary-dark);
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 14px;
        }

        .closeBtn {
          position: absolute;
          top: 24px;
          right: 24px;
          color: var(--text-muted);
          transition: color 0.2s;
          background: none;
          border: none;
          cursor: pointer;
        }

        .closeBtn:hover {
          color: var(--text-main);
        }

        .body {
          padding: 24px 32px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .sectionHeader {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-main);
          font-weight: 600;
          font-size: 16px;
        }

        .sectionIcon {
          color: var(--color-primary-dark);
        }

        .formGroup {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .formRow {
          display: flex;
          gap: 16px;
          width: 100%;
        }

        .formLabel {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .formInput {
          padding: 12px 16px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          font-size: 14px;
          font-family: inherit;
          color: var(--text-main);
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
        }

        .formInput::placeholder {
          color: #94a3b8;
        }

        .formInput:focus {
          border-color: var(--color-primary);
        }

        .footer {
          padding: 24px 32px;
          background-color: #f8fafc;
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: flex-end;
          gap: 16px;
        }

        .btnCancel {
          padding: 12px 24px;
          background-color: white;
          color: var(--color-primary-dark);
          border: 1px solid var(--color-primary-dark);
          border-radius: 6px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btnCancel:hover {
          background-color: #f1f5f9;
        }

        .btnSubmit {
          padding: 12px 24px;
          background-color: var(--color-accent);
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .btnSubmit:hover {
          background-color: var(--color-accent-hover);
        }
      `}</style>
    </>
  );
};

export default AddCustomerModal;
