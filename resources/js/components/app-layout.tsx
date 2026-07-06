import { Form, Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { dashboard, logout } from '@/routes';
import { index as externalBorrowersIndex } from '@/routes/access/external-borrowers';
import { index as groupsIndex } from '@/routes/access/groups';
import { index as usersIndex } from '@/routes/access/users';
import { index as loansIndex } from '@/routes/borrowing/loans';
import { index as categoriesIndex } from '@/routes/inventory/categories';
import { index as unitsIndex } from '@/routes/inventory/item-units';
import { index as itemsIndex } from '@/routes/inventory/items';

type AppLayoutProps = {
    title: string;
    children: React.ReactNode;
};

type NavItem = {
    label: string;
    href: string;
};

type NavGroup = {
    heading: string;
    items: NavItem[];
};

const navigation: NavGroup[] = [
    {
        heading: 'MENU',
        items: [{ label: 'Dashboard', href: dashboard().url }],
    },
    {
        heading: 'ACCESS',
        items: [
            { label: 'Users', href: usersIndex().url },
            { label: 'Groups', href: groupsIndex().url },
            { label: 'External Borrowers', href: externalBorrowersIndex().url },
        ],
    },
    {
        heading: 'INVENTORY',
        items: [
            { label: 'Categories', href: categoriesIndex().url },
            { label: 'Items', href: itemsIndex().url },
            { label: 'Units', href: unitsIndex().url },
        ],
    },
    {
        heading: 'BORROWING',
        items: [{ label: 'Loans', href: loansIndex().url }],
    },
];

const themeStorageKey = 'inventory-monitoring-theme';

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((part) => part[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

function getInitialTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') {
        return 'light';
    }

    const storedTheme = window.localStorage.getItem(themeStorageKey);

    if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function AppLayout({ title, children }: AppLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
    const page = usePage();
    const currentPath = page.url.split('?')[0];
    const user = page.props.auth.user;

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        window.localStorage.setItem(themeStorageKey, theme);
    }, [theme]);

    const isActive = (href: string): boolean => {
        if (href === '/') {
            return currentPath === '/';
        }

        return currentPath === href || currentPath.startsWith(`${href}/`);
    };

    const toggleTheme = (): void => {
        setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <>
            <Head title={title} />
            <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
                <div
                    className={`fixed inset-0 z-40 bg-slate-900/30 transition-opacity lg:hidden dark:bg-slate-950/50 ${
                        sidebarOpen
                            ? 'pointer-events-auto opacity-100'
                            : 'pointer-events-none opacity-0'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                />

                <aside
                    className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 dark:border-white/10 dark:bg-slate-950 lg:static lg:translate-x-0 ${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="flex items-center gap-3 px-6 py-6">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-sm shadow-indigo-500/20">
                            <span className="text-sm font-black tracking-[0.2em]">
                                HE
                            </span>
                        </div>
                        <div>
                            <p className="text-2xl font-semibold text-slate-950 dark:text-white">
                                HERTS
                            </p>
                            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">
                                Inventory Monitor
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 pb-6">
                        {navigation.map((group) => (
                            <div key={group.heading} className="mt-2">
                                <h3 className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
                                    {group.heading}
                                </h3>
                                <div className="space-y-1">
                                    {group.items.map((item) => {
                                        const active = isActive(item.href);

                                        return (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                prefetch
                                                onClick={() => setSidebarOpen(false)}
                                                aria-current={active ? 'page' : undefined}
                                                className={`group flex items-center justify-between rounded-2xl px-3 py-3.5 text-sm transition ${
                                                    active
                                                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200'
                                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white'
                                                }`}
                                            >
                                                <span className="font-medium">
                                                    {item.label}
                                                </span>
                                                <span
                                                    className={`h-2.5 w-2.5 rounded-full ${
                                                        active
                                                            ? 'bg-indigo-500 dark:bg-indigo-300'
                                                            : 'bg-slate-300 group-hover:bg-slate-400 dark:bg-slate-600 dark:group-hover:bg-slate-500'
                                                    }`}
                                                />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    <Form
                        {...logout.form()}
                        className="border-t border-slate-200 p-4 dark:border-white/10"
                    >
                        <button className="flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10">
                            Logout
                        </button>
                    </Form>
                </aside>

                <div className="flex min-w-0 flex-1 flex-col">
                    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-slate-950/85">
                        <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-6 2xl:px-8">
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 lg:hidden"
                                    onClick={() => setSidebarOpen(true)}
                                    aria-label="Open sidebar"
                                >
                                    <span className="space-y-1.5">
                                        <span className="block h-0.5 w-4 rounded-full bg-current" />
                                        <span className="block h-0.5 w-4 rounded-full bg-current" />
                                        <span className="block h-0.5 w-4 rounded-full bg-current" />
                                    </span>
                                </button>

                                <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-400 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-500 lg:flex">
                                    <svg
                                        className="h-4 w-4 text-slate-400 dark:text-slate-500"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M8.5 14a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11ZM13 13l4 4"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <span className="flex-1 whitespace-nowrap">
                                        Search or type command...
                                    </span>
                                    <span className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-500">
                                        Ctrl K
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                                    aria-label="Toggle theme"
                                    onClick={toggleTheme}
                                >
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M10 3.5a6.5 6.5 0 1 0 6.5 6.5 5.8 5.8 0 0 1-6.5-6.5Z"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>

                                <button
                                    type="button"
                                    className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                                    aria-label="Notifications"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M10 3.5a4 4 0 0 0-4 4v1.9c0 .9-.2 1.8-.7 2.5L4.5 13h11l-.8-1.1c-.5-.7-.7-1.6-.7-2.5V7.5a4 4 0 0 0-4-4Z"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M8.5 14.5a1.5 1.5 0 0 0 3 0"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-400" />
                                </button>

                                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-white/10 dark:bg-white/5">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20">
                                        {getInitials(user.name)}
                                    </div>
                                    <div className="hidden sm:block">
                                        <p className="text-sm font-semibold text-slate-950 dark:text-white">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {user.email}
                                        </p>
                                    </div>
                                    <svg
                                        className="h-4 w-4 text-slate-400 dark:text-slate-500"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="m5 7 5 5 5-5"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6 2xl:px-8">
                        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
