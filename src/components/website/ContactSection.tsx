"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const subjectOptions = [
  "General Inquiry",
  "Photo Restoration",
  "Custom Album",
  "Order Support",
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/v1/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent successfully!");

      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="relative w-full max-w-[760px] rounded-[12px] px-3 sm:px-5 lg:px-0">
        <div className="relative z-10">
          <h2 className="text-[30px] font-bold leading-[36px] text-[#1A1C1F]">
            Send a Message
          </h2>

          <p className="mt-2 text-[16px] leading-[24px] text-[#434652]">
            Fill out the form and we&apos;ll get back to you soon.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[14px] font-semibold text-[#434652]">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="h-[40px] w-full rounded-[8px] border border-[#C3C6D4] bg-white px-4 text-[16px] outline-none placeholder:text-[#C3C6D4] focus:border-[#0040A1]"
                />
              </div>

              <div>
                <label className="mb-1 block text-[14px] font-semibold text-[#434652]">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-[40px] w-full rounded-[8px] border border-[#C3C6D4] bg-white px-4 text-[16px] outline-none placeholder:text-[#C3C6D4] focus:border-[#0040A1]"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-[14px] font-semibold text-[#434652]">
                Subject
              </label>
              <div className="relative">
                <select
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="h-[40px] w-full appearance-none truncate rounded-[8px] border border-[#C3C6D4] bg-white pl-4 pr-12 text-[16px] outline-none focus:border-[#0040A1]"
                >
                  <option value="" disabled>
                    Select subject
                  </option>
                  {subjectOptions.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-[14px] font-semibold text-[#434652]">
                Your Message
              </label>
              <textarea
                id="message"
                rows={4}
                required
                placeholder="Tell us about your project or inquiry..."
                value={formData.message}
                onChange={handleChange}
                className="h-[100px] w-full rounded-[8px] border border-[#C3C6D4] bg-white px-4 py-3 text-[16px] outline-none placeholder:text-[#C3C6D4] focus:border-[#0040A1]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-[8px] bg-[#E61C10] text-[16px] font-bold text-white shadow-[0px_10px_15px_-3px_rgba(188,0,0,0.2),0px_4px_6px_-4px_rgba(188,0,0,0.2)] transition hover:bg-[#d0190e] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="flex items-center gap-2">
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                {!isSubmitting && (
                  <span
                    className="flex items-center justify-center pt-0.5 text-[24px] leading-none"
                    aria-hidden="true"
                  >
                    &#x27A3;
                  </span>
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
