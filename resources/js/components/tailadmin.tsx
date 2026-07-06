import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

type SectionHeaderProps = {
    eyebrow: string;
    title: string;
    description: string;
    action?: ReactNode;
};

type SurfaceProps = {
    children: ReactNode;
    className?: string;
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

type DataTableProps = {
    headers: string[];
    children: ReactNode;
    emptyState?: ReactNode;
};

type StatusBadgeProps = {
    tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
    children: ReactNode;
};

export function SectionHeader({
    eyebrow,
    title,
    description,
    action,
}: SectionHeaderProps): ReactNode {
    return (
        <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-500">
                    {eyebrow}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
                    {title}
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                    {description}
                </p>
            </div>
            {action ? <div>{action}</div> : null}
        </div>
    );
}

export function Surface({ children, className = '' }: SurfaceProps): ReactNode {
    return (
        <section
            className={`overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-sm dark:border-white/10 dark:bg-slate-950/70 ${className}`}
        >
            {children}
        </section>
    );
}

export function SurfaceBody({
    children,
    className = '',
}: SurfaceProps): ReactNode {
    return <div className={`p-6 ${className}`}>{children}</div>;
}

export function FormGrid({
    children,
    className = '',
}: SurfaceProps): ReactNode {
    return (
        <div
            className={`grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5 ${className}`}
        >
            {children}
        </div>
    );
}

export function Field({
    label,
    hint,
    children,
    className = '',
}: {
    label: string;
    hint?: string;
    children: ReactNode;
    className?: string;
}): ReactNode {
    return (
        <label
            className={`grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 ${className}`}
        >
            <span className="flex items-center justify-between gap-3">
                <span>{label}</span>
                {hint ? (
                    <span className="text-xs font-normal text-slate-400">
                        {hint}
                    </span>
                ) : null}
            </span>
            {children}
        </label>
    );
}

const baseFieldClass =
    'rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 dark:border-white/10 dark:bg-slate-950/50 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-cyan-400 dark:focus:ring-cyan-400/15';

export function Input(props: InputProps): ReactNode {
    return <input {...props} className={[baseFieldClass, props.className].join(' ')} />;
}

export function Textarea(props: TextareaProps): ReactNode {
    return (
        <textarea
            {...props}
            className={[baseFieldClass, 'min-h-28', props.className].join(' ')}
        />
    );
}

export function Select(props: SelectProps): ReactNode {
    return <select {...props} className={[baseFieldClass, props.className].join(' ')} />;
}

export function SubmitButton({
    children,
    className = '',
    type = 'submit',
}: {
    children: ReactNode;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}): ReactNode {
    return (
        <button
            type={type}
            className={`inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 dark:bg-cyan-400 dark:text-black dark:hover:bg-cyan-300 ${className}`}
        >
            {children}
        </button>
    );
}

export function DangerButton({
    children,
    className = '',
    type = 'submit',
}: {
    children: ReactNode;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}): ReactNode {
    return (
        <button
            type={type}
            className={`inline-flex items-center justify-center rounded-full border border-rose-200 bg-white px-3 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 hover:text-rose-500 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:bg-rose-500/15 ${className}`}
        >
            {children}
        </button>
    );
}

export function TableShell({
    headers,
    children,
    emptyState,
}: DataTableProps): ReactNode {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950/60">
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 dark:bg-white/5 dark:text-slate-400">
                        <tr>
                            {headers.map((header) => (
                                <th
                                    key={header}
                                    className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.25em]"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-white/10">
                        {children}
                    </tbody>
                </table>
            </div>
            {emptyState ? (
                <div className="border-t border-slate-200 px-5 py-8 dark:border-white/10">
                    {emptyState}
                </div>
            ) : null}
        </div>
    );
}

export function RowValue({
    children,
    align = 'left',
}: {
    children: ReactNode;
    align?: 'left' | 'right';
}): ReactNode {
    return (
        <td
            className={`px-5 py-4 text-slate-700 dark:text-slate-200 ${
                align === 'right' ? 'text-right' : ''
            }`}
        >
            {children}
        </td>
    );
}

export function StatusBadge({ tone = 'neutral', children }: StatusBadgeProps): ReactNode {
    const tones: Record<NonNullable<StatusBadgeProps['tone']>, string> = {
        neutral: 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200',
        success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
        warning: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
        danger: 'bg-rose-500/10 text-rose-700 dark:text-rose-300',
        info: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}
        >
            {children}
        </span>
    );
}

export function EmptyState({
    title,
    description,
    action,
}: {
    title: string;
    description: string;
    action?: ReactNode;
}): ReactNode {
    return (
        <div className="grid gap-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-white/10 dark:bg-white/5">
            <div>
                <p className="text-lg font-semibold text-slate-950 dark:text-white">
                    {title}
                </p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {description}
                </p>
            </div>
            {action ? <div className="mx-auto">{action}</div> : null}
        </div>
    );
}

export function PillLink({
    href,
    children,
}: {
    href: string;
    children: ReactNode;
}): ReactNode {
    return (
        <Link
            href={href}
            className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-300"
        >
            {children}
        </Link>
    );
}
