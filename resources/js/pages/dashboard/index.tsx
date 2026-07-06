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

type MetricCard = {
    label: string;
    value: number;
    trend: string;
    trendTone: 'success' | 'danger';
    icon: string;
};

const monthlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthlySales = [160, 380, 190, 290, 180, 190, 280, 110, 210, 390, 270, 120];
const areaPrimary = [180, 190, 175, 165, 160, 170, 165, 170, 200, 220, 240, 235];
const areaSecondary = [40, 32, 50, 42, 55, 43, 68, 100, 110, 120, 150, 140];

export default function Dashboard({ stats }: DashboardProps) {
    const metrics: MetricCard[] = [
        {
            label: 'Total units',
            value: stats.total_units,
            trend: '+11.01%',
            trendTone: 'success',
            icon: 'users',
        },
        {
            label: 'Available units',
            value: stats.available_units,
            trend: '-9.05%',
            trendTone: 'danger',
            icon: 'box',
        },
    ];

    const summary = [
        ['Target', '$20K', 'down'],
        ['Revenue', '$20K', 'up'],
        ['Today', '$20K', 'up'],
    ] as const;

    return (
        <AppLayout title="Dashboard">
            <div className="grid gap-6 xl:grid-cols-12">
                <div className="space-y-6 xl:col-span-7">
                    <div className="grid gap-4 sm:grid-cols-2">
                        {metrics.map((metric) => (
                            <section
                                key={metric.label}
                                className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                                        <MetricIcon name={metric.icon} />
                                    </div>
                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                            metric.trendTone === 'success'
                                                ? 'bg-emerald-50 text-emerald-600'
                                                : 'bg-rose-50 text-rose-600'
                                        }`}
                                    >
                                        {metric.trendTone === 'success' ? '↑' : '↓'} {metric.trend}
                                    </span>
                                </div>
                                <p className="mt-6 text-sm text-slate-500">{metric.label}</p>
                                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                                    {metric.value.toLocaleString('en-US')}
                                </p>
                            </section>
                        ))}
                    </div>

                    <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-950">
                                    Monthly Sales
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Sales summary for the current period.
                                </p>
                            </div>
                            <button
                                type="button"
                                className="rounded-xl px-2 py-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                                aria-label="Monthly sales options"
                            >
                                <span className="text-2xl leading-none">...</span>
                            </button>
                        </div>

                        <div className="mt-6 flex h-72 items-end gap-4 rounded-[24px] bg-slate-50 px-6 py-6">
                            {monthlySales.map((value, index) => (
                                <div key={monthlyLabels[index]} className="flex flex-1 flex-col items-center gap-3">
                                    <div className="flex h-52 w-full items-end justify-center">
                                        <div
                                            className="w-7 rounded-t-2xl bg-indigo-500"
                                            style={{ height: `${value / 2}px` }}
                                        />
                                    </div>
                                    <span className="text-xs text-slate-500">
                                        {monthlyLabels[index]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] xl:col-span-5">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-950">
                                Monthly Target
                            </h3>
                            <p className="text-sm text-slate-500">
                                Target you&apos;ve set for each month
                            </p>
                        </div>
                        <button
                            type="button"
                            className="rounded-xl px-2 py-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                            aria-label="Monthly target options"
                        >
                            <span className="text-2xl leading-none">...</span>
                        </button>
                    </div>

                    <div className="mt-8 flex flex-col items-center justify-center">
                        <div className="relative flex h-60 w-60 items-center justify-center rounded-full border-[14px] border-slate-200 border-t-indigo-500 border-r-indigo-500">
                            <div className="text-center">
                                <p className="text-4xl font-semibold text-slate-950">
                                    75.55%
                                </p>
                                <p className="mt-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
                                    +10%
                                </p>
                            </div>
                        </div>
                        <p className="mt-6 max-w-sm text-center text-sm leading-6 text-slate-500">
                            You earn $3287 today, it&apos;s higher than last month.
                            Keep up your good work!
                        </p>
                    </div>

                    <div className="mt-6 grid grid-cols-3 border-t border-slate-200 pt-6 text-center">
                        {summary.map(([label, value, trend]) => (
                            <div key={label} className="space-y-1">
                                <p className="text-sm text-slate-500">{label}</p>
                                <p className="text-lg font-semibold text-slate-950">
                                    {value}{' '}
                                    <span
                                        className={
                                            trend === 'down'
                                                ? 'text-rose-500'
                                                : 'text-emerald-500'
                                        }
                                    >
                                        {trend === 'down' ? '↓' : '↑'}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] xl:col-span-12">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-950">
                                Statistics
                            </h3>
                            <p className="text-sm text-slate-500">
                                Target you&apos;ve set for each month
                            </p>
                        </div>
                        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1 text-sm text-slate-500">
                            <button className="rounded-xl bg-white px-3 py-2 font-medium text-slate-950 shadow-sm">
                                Overview
                            </button>
                            <button className="rounded-xl px-3 py-2">
                                Sales
                            </button>
                            <button className="rounded-xl px-3 py-2">
                                Revenue
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 rounded-[24px] bg-slate-50 px-4 py-6">
                        <svg viewBox="0 0 640 260" className="h-72 w-full">
                            <defs>
                                <linearGradient id="areaFillPrimary" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.28" />
                                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.02" />
                                </linearGradient>
                            </defs>
                            <path
                                d={buildAreaPath(areaPrimary)}
                                fill="url(#areaFillPrimary)"
                            />
                            <path
                                d={buildLinePath(areaPrimary)}
                                fill="none"
                                stroke="#6366f1"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d={buildLinePath(areaSecondary)}
                                fill="none"
                                stroke="#93c5fd"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}

function MetricIcon({ name }: { name: string }): React.ReactNode {
    if (name === 'users') {
        return (
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                    d="M15.5 16a4.5 4.5 0 0 0-9 0"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                />
                <path
                    d="M10 10.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                />
                <path
                    d="M4 16a3.8 3.8 0 0 1 3-3.7"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                />
            </svg>
        );
    }

    return (
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
                d="M4.5 6.5 10 3l5.5 3.5L10 10 4.5 6.5Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
            <path
                d="M4.5 6.5V13L10 16.5 15.5 13V6.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
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
