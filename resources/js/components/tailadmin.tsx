import { Link } from '@inertiajs/react';
import { useEffect, useId, useRef } from 'react';
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

type ModalProps = {
    open: boolean;
    title: string;
    description: string;
    children: ReactNode;
    onClose: () => void;
    size?: 'md' | 'lg' | 'xl';
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
                <p className="text-xs font-semibold tracking-[0.35em] text-cyan-500 uppercase">
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

export function Modal({
    open,
    title,
    description,
    children,
    onClose,
    size = 'lg',
}: ModalProps): ReactNode {
    const titleId = useId();
    const onCloseRef = useRef(onClose);
    const modalRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        if (!open) {
            if (previousFocusRef.current) {
                previousFocusRef.current.focus();
                previousFocusRef.current = null;
            }

            return;
        }

        previousFocusRef.current = document.activeElement as HTMLElement | null;

        if (modalRef.current) {
            const focusableElements = modalRef.current.querySelectorAll(
                'button:not(:disabled), [href]:not([disabled]), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"]):not(:disabled)',
            ) as NodeListOf<HTMLElement>;

            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }

        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                onCloseRef.current();

                return;
            }

            if (event.key === 'Tab' && modalRef.current) {
                const focusableElements = modalRef.current.querySelectorAll(
                    'button:not(:disabled), [href]:not([disabled]), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"]):not(:disabled)',
                ) as NodeListOf<HTMLElement>;

                if (focusableElements.length === 0) {
                    return;
                }

                const firstElement = focusableElements[0];
                const lastElement =
                    focusableElements[focusableElements.length - 1];

                if (event.shiftKey) {
                    if (
                        document.activeElement === firstElement ||
                        !modalRef.current.contains(document.activeElement)
                    ) {
                        lastElement.focus();
                        event.preventDefault();
                    }
                } else {
                    if (
                        document.activeElement === lastElement ||
                        !modalRef.current.contains(document.activeElement)
                    ) {
                        firstElement.focus();
                        event.preventDefault();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open]);

    if (!open) {
        return null;
    }

    const widths: Record<NonNullable<ModalProps['size']>, string> = {
        md: 'max-w-xl',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
        >
            <button
                type="button"
                tabIndex={-1}
                className="fixed inset-0 h-full w-full bg-slate-400/50 backdrop-blur-sm dark:bg-slate-950/70"
                onClick={onClose}
                aria-label="Tutup modal"
            />
            <div
                ref={modalRef}
                className={`relative flex max-h-[calc(100vh-3rem)] w-full ${widths[size]} flex-col overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-slate-900`}
            >
                <button
                    type="button"
                    className="absolute top-5 right-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 focus:ring-3 focus:ring-indigo-500/15 focus:outline-none dark:bg-white/[0.05] dark:text-slate-400 dark:hover:bg-white/[0.07] dark:hover:text-slate-200"
                    onClick={onClose}
                    aria-label="Tutup modal"
                >
                    <svg
                        viewBox="0 0 20 20"
                        className="h-5 w-5"
                        fill="none"
                        aria-hidden="true"
                    >
                        <path
                            d="M6 6 L 14 14 M14 6 L 6 14"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>

                <div className="border-b border-slate-200 px-6 pt-6 pr-16 pb-5 lg:px-8 lg:pt-8 dark:border-white/10">
                    <h2
                        id={titleId}
                        className="text-xl font-semibold text-slate-950 lg:text-2xl dark:text-white"
                    >
                        {title}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {description}
                    </p>
                </div>

                <div className="overflow-y-auto px-6 py-6 lg:px-8">
                    {children}
                </div>
            </div>
        </div>
    );
}

export function FormGrid({
    children,
    className = '',
}: SurfaceProps): ReactNode {
    return (
        <div
            className={`grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5 ${className}`}
        >
            {children}
        </div>
    );
}

export function Field({
    label,
    hint,
    required,
    children,
    className = '',
}: {
    label: string;
    hint?: string;
    required?: boolean;
    children: ReactNode;
    className?: string;
}): ReactNode {
    return (
        <label
            className={`grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 ${className}`}
        >
            <span className="flex items-center justify-between gap-3">
                <span>
                    {label}
                    {required && <span className="ml-1 text-rose-500">*</span>}
                </span>
                {hint ? (
                    <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                        {hint}
                    </span>
                ) : null}
            </span>
            {children}
        </label>
    );
}

const baseFieldClass =
    'h-11 w-full rounded-lg border border-slate-300 bg-transparent px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-indigo-400 focus:ring-3 focus:ring-indigo-500/10 disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-500 disabled:placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-white/90 dark:placeholder:text-white/40 dark:focus:border-cyan-400 dark:focus:ring-cyan-400/10 dark:disabled:border-slate-800 dark:disabled:bg-white/[0.03] dark:disabled:text-white/40 dark:disabled:placeholder:text-white/20';

export function Input(props: InputProps): ReactNode {
    return (
        <input
            {...props}
            className={[baseFieldClass, props.className].join(' ')}
        />
    );
}

export function Textarea(props: TextareaProps): ReactNode {
    return (
        <textarea
            {...props}
            className={[
                baseFieldClass,
                'min-h-28 resize-y',
                props.className,
            ].join(' ')}
        />
    );
}

export function Select(props: SelectProps): ReactNode {
    const selectSizing = props.multiple ? 'min-h-32 py-2' : 'h-11';

    return (
        <select
            {...props}
            className={[
                baseFieldClass,
                selectSizing,
                props.multiple ? '' : 'pr-10',
                props.className,
            ].join(' ')}
        />
    );
}

export function SubmitButton({
    children,
    className = '',
    type = 'submit',
    onClick,
}: {
    children: ReactNode;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
}): ReactNode {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`inline-flex h-11 items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 focus:ring-3 focus:ring-indigo-500/15 focus:outline-none disabled:cursor-not-allowed disabled:bg-indigo-100 disabled:text-indigo-500 dark:bg-cyan-400 dark:text-black dark:hover:bg-cyan-300 dark:focus:ring-cyan-400/15 dark:disabled:bg-cyan-950 dark:disabled:text-cyan-500 ${className}`}
        >
            {children}
        </button>
    );
}

export function SecondaryButton({
    children,
    className = '',
    type = 'button',
    onClick,
}: {
    children: ReactNode;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
}): ReactNode {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-900 focus:ring-3 focus:ring-indigo-500/10 focus:outline-none disabled:cursor-not-allowed disabled:border-slate-100 disabled:text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-white/[0.03] dark:hover:text-slate-100 ${className}`}
        >
            {children}
        </button>
    );
}

export function ModalActions({
    children,
    className = '',
}: {
    children: ReactNode;
    className?: string;
}): ReactNode {
    return (
        <div
            className={`mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end ${className}`}
        >
            {children}
        </div>
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
            className={`inline-flex items-center justify-center rounded-full border border-rose-200 bg-white px-3 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 hover:text-rose-500 focus:ring-3 focus:ring-rose-500/10 focus:outline-none disabled:cursor-not-allowed disabled:border-rose-100 disabled:bg-rose-50 disabled:text-rose-300 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:bg-rose-500/15 dark:disabled:border-rose-950 dark:disabled:bg-rose-950/40 dark:disabled:text-rose-700 ${className}`}
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
                                    className="px-5 py-4 text-xs font-semibold tracking-[0.25em] uppercase"
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

export function StatusBadge({
    tone = 'neutral',
    children,
}: StatusBadgeProps): ReactNode {
    const tones: Record<NonNullable<StatusBadgeProps['tone']>, string> = {
        neutral:
            'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200',
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
