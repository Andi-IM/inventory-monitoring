import { Form } from '@inertiajs/react';
import { AppLayout } from '@/components/app-layout';
import { destroy, store } from '@/routes/inventory/categories';

type Category = { id: number; name: string; code: string | null; items_count: number };

export default function Categories({ categories }: { categories: Category[] }) {
    return (
        <AppLayout title="Kategori Alat">
            <Form {...store.form()} resetOnSuccess className="grid gap-3 rounded-lg border border-zinc-200 bg-white p-4 md:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-900">
                <input name="name" placeholder="Nama kategori" className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950" />
                <input name="code" placeholder="Kode" className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950" />
                <button className="rounded-md bg-zinc-950 px-4 py-2 text-white dark:bg-zinc-100 dark:text-zinc-950">Tambah</button>
            </Form>
            <Table headers={['Nama', 'Kode', 'Jumlah alat', '']}>
                {categories.map((category) => <tr key={category.id} className="border-t border-zinc-200 dark:border-zinc-800"><td className="p-3">{category.name}</td><td className="p-3">{category.code ?? '-'}</td><td className="p-3">{category.items_count}</td><td className="p-3 text-right"><Form {...destroy.form(category.id)}><button className="text-sm text-red-600">Hapus</button></Form></td></tr>)}
            </Table>
        </AppLayout>
    );
}

function Table({ headers, children }: { headers: string[]; children: React.ReactNode }) {
    return <div className="mt-6 overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"><table className="w-full text-left text-sm"><thead><tr>{headers.map((header) => <th key={header} className="p-3 font-semibold">{header}</th>)}</tr></thead><tbody>{children}</tbody></table></div>;
}
