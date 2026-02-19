"use client";

import React from "react";
import { Sidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { Dashboard } from "@/components/admin/dashboard";

export default function AdminPage() {
  return (
    <div className="min-h-screen flex bg-surface">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <AdminHeader />
        <main className="flex-1 p-6 md:p-10 bg-surface">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
