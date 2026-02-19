import React from "react";
import Image from "next/image";

export function AdminHeader() {
  return (
    <header className="h-20 flex items-center justify-between px-6 md:px-10 border-b border-border bg-surface-elevated shadow-sm">
      <div className="font-heading text-lg text-primary font-bold tracking-tight">Panel de administración</div>
      <div className="flex items-center gap-3">
        <span className="font-body text-sm text-primary-secondary">Admin</span>
        <Image
          src="/images/admin-avatar.png"
          alt="Admin avatar"
          width={36}
          height={36}
          className="rounded-full border border-border shadow"
        />
      </div>
    </header>
  );
}
