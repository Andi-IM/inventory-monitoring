import { Form } from '@inertiajs/react';
import { AppLayout } from '@/components/app-layout';
import { destroy, store } from '@/routes/inventory/items';

type Category = { id: number; name: string };
type Item = {
    id: number;
    name: string;
    description: string | null;
    units_count: number;
    category: Category;
};

export default function Items({
    items,
    categories,
}: {
    items: Item[];
    categories: Category[];
}) {
    return (
        <AppLayout title="Master Alat">
            <Form
                {...store.form()}
                resetOnSuccess
                className="grid gap-3 rounded-lg border border-zinc-200 bg-white p-4 md:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
                <select
                    name="category_id"
                    className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                >
                    <option value="">Kategori</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <input
                    name="name"
                    placeholder="Nama alat"
                    className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                />
                <input
                    name="description"
                    placeholder="Deskripsi"
                    className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                />
                <button className="rounded-md bg-zinc-950 px-4 py-2 text-white dark:bg-zinc-100 dark:text-zinc-950">
                    Tambah
                </button>
            </Form>
            <Table headers={['Nama', 'Kategori', 'Unit', 'Deskripsi', '']}>
                {items.map((item) => (
                    <tr
                        key={item.id}
                        className="border-t border-zinc-200 dark:border-zinc-800"
                    >
                        <td className="p-3">{item.name}</td>
                        <td className="p-3">{item.category.name}</td>
                        <td className="p-3">{item.units_count}</td>
                        <td className="p-3">{item.description ?? '-'}</td>
                        <td className="p-3 text-right">
                            <Form {...destroy.form(item.id)}>
                                <button className="text-sm text-red-600">
                                    Hapus
                                </button>
                            </Form>
                        </td>
                    </tr>
                ))}
            </Table>
        </AppLayout>
    );
}

function Table({
    headers,
    children,
}: {
    headers: string[];
    children: React.ReactNode;
}) {
    return (
        <div className="mt-6 overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header} className="p-3 font-semibold">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{children}</tbody>
            </table>
        </div>
    );
}
