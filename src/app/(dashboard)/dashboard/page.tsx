'use client'

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            This is a sample dashboard route inside the new route group structure.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <p className="text-sm font-medium text-gray-500">Revenue</p>
            <p className="mt-3 text-3xl font-semibold text-gray-900">$24,800</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <p className="text-sm font-medium text-gray-500">Orders</p>
            <p className="mt-3 text-3xl font-semibold text-gray-900">128</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <p className="text-sm font-medium text-gray-500">Customers</p>
            <p className="mt-3 text-3xl font-semibold text-gray-900">3,241</p>
          </div>
          
        </section>
      </div>
    </main>
  )
}
