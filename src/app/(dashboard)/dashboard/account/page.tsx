'use client';

export default function AccountPage() {
  return (
    <>
      <style>{`
        .account-container {
          padding: 2rem;
        }
        .account-title {
          color: #002B73;
        }
        .account-description {
          color: #64748B;
        }
      `}</style>
      <div className="account-container">
        <h1 className="text-3xl font-bold account-title">
          Account
        </h1>
        <p className="mt-2 text-sm account-description">
          Account settings page coming soon.
        </p>
      </div>
    </>
  );
}
