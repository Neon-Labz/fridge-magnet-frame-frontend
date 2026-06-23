"use client";

import { apiV1Url } from "@/lib/backendUrl";

export interface FeedbackPayload {
  rating: number;
  comment: string;
  orderNumber?: string;
  customerName?: string;
  email?: string;
}

export const submitFeedback = async (payload: FeedbackPayload): Promise<void> => {
  const body: Record<string, unknown> = {
    rating: payload.rating,
  };

  if (payload.comment?.trim()) body.comment = payload.comment.trim();
  if (payload.orderNumber) body.orderNumber = payload.orderNumber;
  if (payload.customerName?.trim()) body.customerName = payload.customerName.trim();
  if (payload.email?.trim()) body.email = payload.email.trim();

  const response = await fetch(apiV1Url("/feedback"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data?.message || `Feedback failed: ${response.status}`);
  }
};
