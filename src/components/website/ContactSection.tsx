"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Send } from "lucide-react";

const subjectOptions = [
  "General Inquiry",
  "Order Support",
  "Custom Order",
  "Feedback",
  "Other",
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
      <h2 className="font-manrope text-[24px] font-bold leading-[1.2] text-[#001E50]">
        Send a Message
      </h2>

      <p className="mb-6 mt-2 font-inter text-[14px] text-[#6B7280]">
        Fill out the form and we&apos;ll get back to you soon.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="w-full">
            <label className="mb-2 block font-manrope text-[14px] font-bold text-[#001E50]">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              required
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              className="h-[58px] w-full rounded-lg border border-[#E5E7EB] bg-white px-4 text-[16px] outline-none placeholder:text-[#6B7280] focus:border-[#0040A1]"
            />
          </div>

          <div className="w-full">
            <label className="mb-2 block font-manrope text-[14px] font-bold text-[#001E50]">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="h-[58px] w-full rounded-lg border border-[#E5E7EB] bg-white px-4 text-[16px] outline-none placeholder:text-[#6B7280] focus:border-[#0040A1]"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-manrope text-[14px] font-bold text-[#001E50]">
            Subject
          </label>
          <div className="relative">
            <select
              id="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="h-[58px] w-full appearance-none truncate rounded-lg border border-[#E5E7EB] bg-white pl-4 pr-12 text-[16px] outline-none focus:border-[#0040A1]"
            >
              <option value="" disabled>
                How can we help you?
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
          <label className="mb-2 block font-manrope text-[14px] font-bold text-[#001E50]">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            required
            placeholder="Type your message here..."
            value={formData.message}
            onChange={handleChange}
            className="h-[154px] w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-4 text-[16px] outline-none placeholder:text-[#6B7280] focus:border-[#0040A1]"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-[60px] w-full items-center justify-center gap-3 rounded-lg bg-[#D10A0A] font-manrope text-[18px] font-bold text-white shadow-[0px_10px_15px_-3px_#FECACA,0px_4px_6px_-4px_#FECACA] transition hover:bg-[#b50909] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {!isSubmitting && (
            <Send className="h-5 w-5 -rotate-[15deg]" aria-hidden="true" />
          )}
          <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
        </button>
      </form>
    </div>
  );
}
