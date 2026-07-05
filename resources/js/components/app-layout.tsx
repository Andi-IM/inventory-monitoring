import { Form, Head, Link } from '@inertiajs/react';
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

const links = [
    ['Dashboard', dashboard()],
    ['User', usersIndex()],
    ['Grup', groupsIndex()],
    ['Peminjam Eksternal', externalBorrowersIndex()],
    ['Kategori', categoriesIndex()],
    ['Alat', itemsIndex()],
    ['Unit', unitsIndex()],
    ['Peminjaman', loansIndex()],
] as const;

export function AppLayout({ title, children }: AppLayoutProps) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
                <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm text-zinc-500">Manajemen Inventaris</p>
                                <h1 className="text-xl font-semibold">{title}</h1>
                            </div>
                            <Form {...logout.form()}>
                                <button className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
                                    Keluar
                                </button>
                            </Form>
                        </div>
                        <nav className="flex flex-wrap gap-2">
                            {links.map(([label, route]) => (
                                <Link
                                    key={label}
                                    href={route.url}
                                    className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </header>
                <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
            </div>
        </>
    );
}
