'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Contact, Pencil, Loader2 } from 'lucide-react';
import type { AccountProfile } from '@/hooks/useAccount';

interface ProfileInformationCardProps {
  profile: AccountProfile;
  loading: boolean;
  onChange: (patch: Partial<AccountProfile>) => void;
  onUploadAvatar: (file: File) => Promise<void>;
  onError: (message: string) => void;
}

export default function ProfileInformationCard({
  profile,
  loading,
  onChange,
  onUploadAvatar,
  onError,
}: ProfileInformationCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const initials =
    profile.fullName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || 'A';

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    // Reset the input so selecting the same file again still fires onChange.
    event.target.value = '';
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      onError('Image must be smaller than 2MB.');
      return;
    }

    setUploading(true);
    try {
      await onUploadAvatar(file);
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="flex-1 rounded-xl border border-[#C3C6D4] bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <Contact className="h-6 w-6 text-[#0040A1]" />
        <h2 className="text-[22px] font-semibold text-[#1A1C1F]">
          Profile Information
        </h2>
      </div>

      <div className="flex flex-col gap-6 border-b border-[#E8E8ED] pb-8 sm:flex-row sm:items-center">
        <div className="relative h-[109px] w-[109px] shrink-0">
          <div
            className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-[#1A1C1F] text-2xl font-semibold text-white"
            style={{ boxShadow: '0 0 0 4.5px #EDEDF2' }}
          >
            {profile.avatar ? (
              <Image
                src={profile.avatar}
                alt="Profile"
                width={109}
                height={109}
                className="h-full w-full object-cover"
                unoptimized
              />
            ) : (
              <span>{initials}</span>
            )}
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50">
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="absolute -bottom-2 -right-2 flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-[#0040A1] shadow-md disabled:opacity-60"
            aria-label="Change profile picture"
          >
            <Pencil className="h-3 w-3 text-white" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <div className="flex-1">
          <h3 className="text-[20px] font-semibold text-[#1A1C1F]">Your Photo</h3>
          <p className="mt-1 text-[15px] text-[#434652]">
            This will be displayed on your profile and internal communications.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="rounded-lg bg-[#DAE2FF] px-4 py-2 text-[15px] font-semibold text-[#002B73] hover:bg-[#c9d6ff] disabled:opacity-60"
            >
              {uploading ? 'Uploading...' : 'Upload New'}
            </button>
            <button
              type="button"
              onClick={() => onChange({ avatar: '' })}
              disabled={uploading || !profile.avatar}
              className="rounded-lg px-4 py-2 text-[15px] font-semibold text-[#BA1A1A] hover:bg-red-50 disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-[15px] font-semibold text-[#1A1C1F]">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={profile.fullName}
            onChange={(e) => onChange({ fullName: e.target.value })}
            placeholder={loading ? 'Loading...' : 'Your full name'}
            disabled={loading}
            className="rounded-lg border border-[#C3C6D4] px-4 py-3 text-[17px] text-[#1A1C1F] outline-none focus:border-[#0040A1]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-[15px] font-semibold text-[#1A1C1F]">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={profile.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder={loading ? 'Loading...' : 'you@example.com'}
            disabled={loading}
            className="rounded-lg border border-[#C3C6D4] px-4 py-3 text-[17px] text-[#1A1C1F] outline-none focus:border-[#0040A1]"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <label htmlFor="bio" className="text-[15px] font-semibold text-[#1A1C1F]">
          Bio
        </label>
        <textarea
          id="bio"
          value={profile.bio}
          onChange={(e) => onChange({ bio: e.target.value })}
          rows={4}
          disabled={loading}
          placeholder="Tell us a little about yourself."
          className="resize-none rounded-lg border border-[#C3C6D4] px-4 py-3 text-[17px] leading-7 text-[#1A1C1F] outline-none focus:border-[#0040A1]"
        />
      </div>
    </section>
  );
}
