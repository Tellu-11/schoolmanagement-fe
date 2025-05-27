import Header from '@/shared/components/Header'
import Sidebar from '@/shared/components/Sidebar'
import React from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6 lg:ml-80 pt-16">
          <div className="max-w-7xl mx-auto mt-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}