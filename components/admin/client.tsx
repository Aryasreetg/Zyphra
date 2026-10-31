"use client";

import React from "react";
import { useFormStatus } from "react-dom";

/** Submit button that asks for confirmation first (used for deletes). */
export function ConfirmSubmit({
  children,
  message,
  className,
  style,
}: {
  children: React.ReactNode;
  message: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={className}
      style={style}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {pending ? "Working…" : children}
    </button>
  );
}

/** Submit button that shows a pending label while the server action runs. */
export function PendingSubmit({
  children,
  pendingText = "Saving…",
  className,
  style,
}: {
  children: React.ReactNode;
  pendingText?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className} style={style}>
      {pending ? pendingText : children}
    </button>
  );
}

/** <select> that submits its form as soon as the value changes. */
export function AutoSubmitSelect({
  name,
  defaultValue,
  options,
  className,
  style,
}: {
  name: string;
  defaultValue: string;
  options: { value: string; label: string }[];
  className?: string;
  style?: React.CSSProperties;
}) {
  const { pending } = useFormStatus();
  return (
    <select
      name={name}
      defaultValue={defaultValue}
      disabled={pending}
      className={className}
      style={style}
      aria-label="Change status"
      onChange={(e) => e.currentTarget.form?.requestSubmit()}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
