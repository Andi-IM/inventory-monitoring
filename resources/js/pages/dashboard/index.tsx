import { AppLayout } from '@/components/app-layout';

type DashboardProps = {
    stats: Record<
        | 'total_units'
        | 'available_units'
        | 'borrowed_units'
        | 'active_loans'
        | 'overdue_loans',
        number
    >;
};

const labels: Record<keyof DashboardProps['stats'], string> = {
    total_units: 'Total unit',
    available_units: 'Unit tersedia',
    borrowed_units: 'Unit dipinjam',
    active_loans: 'Transaksi aktif',
    overdue_loans: 'Transaksi overdue',
};

export default function Dashboard({ stats }: DashboardProps) {
    return (
        <AppLayout title="Dashboard">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {Object.entries(stats).map(([key, value]) => (
                    <section
                        key={key}
                        className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                    >
                        <p className="text-sm text-zinc-500">
                            {labels[key as keyof DashboardProps['stats']]}
                        </p>
                        <p className="mt-2 text-3xl font-semibold">{value}</p>
                    </section>
                ))}
            </div>
        </AppLayout>
    );
}
