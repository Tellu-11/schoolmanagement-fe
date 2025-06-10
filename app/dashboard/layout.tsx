import Header from "@/shared/components/header";
import Sidebar from "@/shared/components/sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6 lg:ml-80 pt-16">
          <div className="m-16">{children}</div>
        </main>
      </div>
    </div>
  );
}
