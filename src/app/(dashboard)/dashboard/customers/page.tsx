import TopCards from '@/components/dashboard/TopCards';
import CustomerTable from '@/components/dashboard/Customer/CustomerTable';

export default function CustomersPage() {
  return (
    <div className="ml-[100px] p-6 sm:p-8">
      <h1 className="text-3xl font-bold" style={{ color: '#002B73' }}>
        Customers
      </h1>

      <p className="mt-2 text-sm" style={{ color: '#64748B' }}>
        Customer page is ready for your customer list and details.
      </p>

      <div className="mt-6">
        <TopCards />
        <CustomerTable />
      </div>
    </div>
  );
}