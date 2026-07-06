import { AppLayout } from '@/components/app-layout';

import {
    SectionHeader,
    StatusBadge,
    Surface,
    SurfaceBody,
} from '@/components/tailadmin';

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

type StatCard = {
    label: string;
    value: number;
    tone: 'success' | 'warning' | 'danger' | 'info';
    detail: string;
};

const weeklyBorrowing = [7, 11, 9, 15, 13, 16, 12];
const weeklyReturns = [4, 7, 6, 8, 10, 9, 11];
const weeklyLabels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

export default function Dashboard({ stats }: DashboardProps) {
    return <DashboardOverview stats={stats} />;
}

function DashboardOverview({ stats }: DashboardProps) {
    const totalTracked = Math.max(stats.total_units, 1);
    const availableRate = Math.round(
        (stats.available_units / totalTracked) * 100,
    );
    const utilization = Math.round((stats.borrowed_units / totalTracked) * 100);
    const overdueRate = Math.round(
        (stats.overdue_loans / Math.max(stats.active_loans || 1, 1)) * 100,
    );

    const statCards: StatCard[] = [
        {
            label: 'Total unit',
            value: stats.total_units,
            tone: 'info',
            detail: 'Seluruh unit yang tercatat dalam inventaris.',
        },
        {
            label: 'Unit tersedia',
            value: stats.available_units,
            tone: 'success',
            detail: `${availableRate}% siap dipinjam tanpa proses tambahan.`,
        },
        {
            label: 'Unit dipinjam',
            value: stats.borrowed_units,
            tone: 'warning',
            detail: `${utilization}% inventaris sedang berada di transaksi aktif.`,
        },
        {
            label: 'Pinjaman aktif',
            value: stats.active_loans,
            tone: stats.overdue_loans > 0 ? 'danger' : 'info',
            detail: `${overdueRate}% dari pinjaman aktif melewati jatuh tempo.`,
        },
    ];

    const stockPressure = [
        ['Available', stats.available_units, 'success'],
        ['Borrowed', stats.borrowed_units, 'info'],
        ['Overdue loans', stats.overdue_loans, 'danger'],
    ] as const;

    return (
        <AppLayout title="Dashboard">
            <div className="space-y-6">
                <Surface>
                    <SurfaceBody className="space-y-6">
                        <SectionHeader
                            eyebrow="Dashboard"
                            title="Inventory control center"
                            description="Ringkasan operasional inventaris, peminjaman, dan status yang perlu perhatian."
                            action={
                                <StatusBadge
                                    tone={
                                        stats.overdue_loans > 0
                                            ? 'danger'
                                            : 'success'
                                    }
                                >
                                    {stats.overdue_loans > 0
                                        ? 'Needs review'
                                        : 'Healthy'}
                                </StatusBadge>
                            }
                        />

                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {statCards.map((card) => (
                                <article
                                    key={card.label}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div
                                            className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${
                                                card.tone === 'success'
                                                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
                                                    : card.tone === 'warning'
                                                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-300'
                                                      : card.tone === 'danger'
                                                        ? 'bg-rose-500/10 text-rose-600 dark:text-rose-300'
                                                        : 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-300'
                                            }`}
                                        >
                                            <StatIcon tone={card.tone} />
                                        </div>
                                        <StatusBadge tone={card.tone}>
                                            {card.label}
                                        </StatusBadge>
                                    </div>
                                    <p className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                                        {card.value.toLocaleString('id-ID')}
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                        {card.detail}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </SurfaceBody>
                </Surface>

                <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)]">
                    <Surface>
                        <SurfaceBody className="space-y-5">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                                        Borrowing activity
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Perbandingan aliran peminjaman dan
                                        pengembalian selama tujuh hari terakhir.
                                    </p>
                                </div>
                                <StatusBadge tone="info">
                                    Utilization {utilization}%
                                </StatusBadge>
                            </div>

                            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-slate-950/50">
                                <svg
                                    viewBox="0 0 640 280"
                                    className="h-72 w-full"
                                    role="img"
                                    aria-label="Borrowing activity chart"
                                >
                                    <defs>
                                        <linearGradient
                                            id="borrowFill"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#465FFF"
                                                stopOpacity="0.32"
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor="#465FFF"
                                                stopOpacity="0.02"
                                            />
                                        </linearGradient>
                                    </defs>
                                    <line
                                        x1="0"
                                        y1="230"
                                        x2="640"
                                        y2="230"
                                        stroke="currentColor"
                                        className="text-slate-200 dark:text-white/10"
                                    />
                                    <path
                                        d={buildAreaPath(weeklyBorrowing)}
                                        fill="url(#borrowFill)"
                                    />
                                    <path
                                        d={buildLinePath(weeklyBorrowing)}
                                        fill="none"
                                        stroke="#465FFF"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d={buildLinePath(weeklyReturns)}
                                        fill="none"
                                        stroke="#06B6D4"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeDasharray="8 8"
                                    />
                                </svg>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-3">
                                {weeklyLabels.map((label, index) => (
                                    <div
                                        key={label}
                                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5"
                                    >
                                        <p className="text-xs font-semibold tracking-[0.24em] text-slate-400 uppercase">
                                            {label}
                                        </p>
                                        <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
                                            {weeklyBorrowing[index]}
                                        </p>
                                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                            borrow events
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </SurfaceBody>
                    </Surface>

                    <Surface>
                        <SurfaceBody className="space-y-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                                        Stock pressure
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Distribusi unit yang paling memengaruhi
                                        ketersediaan.
                                    </p>
                                </div>
                                <StatusBadge
                                    tone={
                                        stats.overdue_loans > 0
                                            ? 'danger'
                                            : 'success'
                                    }
                                >
                                    {stats.overdue_loans > 0
                                        ? 'Attention'
                                        : 'Stable'}
                                </StatusBadge>
                            </div>

                            <div className="flex justify-center">
                                <div className="relative flex h-64 w-64 items-center justify-center">
                                    <svg
                                        viewBox="0 0 220 220"
                                        className="h-full w-full"
                                    >
                                        <circle
                                            cx="110"
                                            cy="110"
                                            r="84"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="16"
                                            className="text-slate-200 dark:text-white/10"
                                        />
                                        <circle
                                            cx="110"
                                            cy="110"
                                            r="84"
                                            fill="none"
                                            stroke="#465FFF"
                                            strokeWidth="16"
                                            strokeLinecap="round"
                                            strokeDasharray={`${2 * Math.PI * 84}`}
                                            strokeDashoffset={`${2 * Math.PI * 84 * (1 - utilization / 100)}`}
                                            transform="rotate(-90 110 110)"
                                        />
                                        <circle
                                            cx="110"
                                            cy="110"
                                            r="62"
                                            fill="none"
                                            stroke="#06B6D4"
                                            strokeWidth="10"
                                            strokeLinecap="round"
                                            strokeDasharray={`${2 * Math.PI * 62}`}
                                            strokeDashoffset={`${2 * Math.PI * 62 * (1 - availableRate / 100)}`}
                                            transform="rotate(-90 110 110)"
                                            opacity="0.8"
                                        />
                                    </svg>

                                    <div className="absolute text-center">
                                        <p className="text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
                                            {utilization}%
                                        </p>
                                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                            borrowed utilization
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {stockPressure.map(([label, value, tone]) => (
                                    <div
                                        key={label}
                                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className={`h-2.5 w-2.5 rounded-full ${
                                                        tone === 'success'
                                                            ? 'bg-emerald-500'
                                                            : tone === 'danger'
                                                              ? 'bg-rose-500'
                                                              : 'bg-cyan-500'
                                                    }`}
                                                />
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                                    {label}
                                                </span>
                                            </div>
                                            <span className="text-sm font-semibold text-slate-950 dark:text-white">
                                                {value.toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                        <div className="mt-3 h-2 rounded-full bg-slate-100 dark:bg-white/10">
                                            <div
                                                className={`h-2 rounded-full ${
                                                    tone === 'success'
                                                        ? 'bg-emerald-500'
                                                        : tone === 'danger'
                                                          ? 'bg-rose-500'
                                                          : 'bg-cyan-500'
                                                }`}
                                                style={{
                                                    width: `${Math.max((value / totalTracked) * 100, 8)}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </SurfaceBody>
                    </Surface>
                </div>
            </div>
        </AppLayout>
    );
}

function StatIcon({ tone }: { tone: StatCard['tone'] }): React.ReactNode {
    if (tone === 'success') {
        return (
            <svg
                viewBox="0 0 20 20"
                className="h-5 w-5"
                fill="none"
                aria-hidden="true"
            >
                <path
                    d="M4 10.5 8 14 16 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }

    if (tone === 'warning') {
        return (
            <svg
                viewBox="0 0 20 20"
                className="h-5 w-5"
                fill="none"
                aria-hidden="true"
            >
                <path
                    d="M10 4 3.5 15h13L10 4Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                />
                <path
                    d="M10 8v3.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
                <circle cx="10" cy="13.5" r="0.9" fill="currentColor" />
            </svg>
        );
    }

    if (tone === 'danger') {
        return (
            <svg
                viewBox="0 0 20 20"
                className="h-5 w-5"
                fill="none"
                aria-hidden="true"
            >
                <path
                    d="M10 3.5 16.5 10 10 16.5 3.5 10 10 3.5Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                />
                <path
                    d="M10 7.2v3.7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                />
                <circle cx="10" cy="13.2" r="0.9" fill="currentColor" />
            </svg>
        );
    }

    return (
        <svg
            viewBox="0 0 20 20"
            className="h-5 w-5"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M4 10h12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <path
                d="M10 4v12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
            <circle
                cx="10"
                cy="10"
                r="6"
                stroke="currentColor"
                strokeWidth="1.2"
                opacity="0.45"
            />
        </svg>
    );
}

function buildLinePath(values: number[]): string {
    const width = 640;
    const height = 260;
    const step = width / (values.length - 1);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = Math.max(max - min, 1);

    return values
        .map((value, index) => {
            const x = Math.round(index * step);
            const y = Math.round(height - ((value - min) / range) * 120 - 40);

            return `${index === 0 ? 'M' : 'L'}${x} ${y}`;
        })
        .join(' ');
}

function buildAreaPath(values: number[]): string {
    const linePath = buildLinePath(values);

    return `${linePath} L640 260 L0 260 Z`;
}
