import { redirect } from 'next/navigation';

type LegacyEditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LegacyEditProductPage({
  params,
}: LegacyEditProductPageProps) {
  const { id } = await params;

  redirect(`/dashboard/products/${id}/edit`);
}
