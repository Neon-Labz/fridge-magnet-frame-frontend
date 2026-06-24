'use client';

import { Shield } from 'lucide-react';

export interface PasswordFields {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface SecurityCardProps {
  passwords: PasswordFields;
  twoFactorEnabled: boolean;
  onPasswordChange: (patch: Partial<PasswordFields>) => void;
  onToggleTwoFactor: (value: boolean) => void;
}

export default function SecurityCard({
  passwords,
  twoFactorEnabled,
  onPasswordChange,
  onToggleTwoFactor,
}: SecurityCardProps) {
  return (
    <section className="w-full rounded-xl border border-[#C3C6D4] bg-white p-6 shadow-sm lg:w-[339px] lg:shrink-0">
      <div className="mb-6 flex items-center gap-2">
        <Shield className="h-6 w-6 text-[#0040A1]" />
        <h2 className="text-[20px] font-semibold text-[#1A1C1F]">Security</h2>
      </div>

      <div className="flex flex-col gap-5">
        <PasswordField
          id="currentPassword"
          label="Current Password"
          value={passwords.currentPassword}
          onChange={(value) => onPasswordChange({ currentPassword: value })}
          filled
        />
        <PasswordField
          id="newPassword"
          label="New Password"
          value={passwords.newPassword}
          onChange={(value) => onPasswordChange({ newPassword: value })}
        />
        <PasswordField
          id="confirmPassword"
          label="Confirm Password"
          value={passwords.confirmPassword}
          onChange={(value) => onPasswordChange({ confirmPassword: value })}
        />
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-[#E8E8ED] pt-5">
        <div>
          <p className="text-[15px] font-semibold text-[#1A1C1F]">Two-Factor Auth</p>
          <p className="text-[13px] text-[#434652]">Secure your account via SMS</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={twoFactorEnabled}
          onClick={() => onToggleTwoFactor(!twoFactorEnabled)}
          className="relative h-[27px] w-[50px] rounded-full transition-colors"
          style={{ background: twoFactorEnabled ? '#0040A1' : '#C3C6D4' }}
        >
          <span
            className="absolute top-[2.5px] h-[22px] w-[22px] rounded-full bg-white shadow transition-all"
            style={{ left: twoFactorEnabled ? '25px' : '3px' }}
          />
        </button>
      </div>
    </section>
  );
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  filled = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  filled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[13px] font-semibold uppercase tracking-[0.7px] text-[#747784]"
      >
        {label}
      </label>
      <input
        id={id}
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="new-password"
        className="h-[43px] rounded-lg border border-[#C3C6D4] px-3 text-[#1A1C1F] outline-none focus:border-[#0040A1]"
        style={{ background: filled ? '#F3F3F8' : '#FFFFFF' }}
      />
    </div>
  );
}
