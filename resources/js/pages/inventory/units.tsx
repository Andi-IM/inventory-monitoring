import { Form } from '@inertiajs/react';
import { AppLayout } from '@/components/app-layout';
import { destroy, store } from '@/routes/inventory/item-units';

type Item = { id: number; name: string };
type Unit = {
    id: number;
    asset_code: string;
    location: string | null;
    status: string;
    item: Item;
};

export default function Units({
    units,
    items,
    statuses,
}: {
    units: Unit[];
    items: Item[];
    statuses: string[];
}) {
    return (
        <AppLayout title="Unit Alat">
            <Form
                {...store.form()}
                resetOnSuccess
                className="grid gap-3 rounded-lg border border-zinc-200 bg-white p-4 md:grid-cols-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
                <select
                    name="item_id"
                    className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                >
                    <option value="">Alat</option>
                    {items.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <input
                    name="asset_code"
                    placeholder="Kode aset"
                    className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                />
                <input
                    name="location"
                    placeholder="Lokasi"
                    className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                />
                <select
                    name="status"
                    defaultValue="available"
                    className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                >
                    {statuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
                <button className="rounded-md bg-zinc-950 px-4 py-2 text-white dark:bg-zinc-100 dark:text-zinc-950">
                    Tambah
                </button>
            </Form>
            <Table headers={['Kode aset', 'Alat', 'Lokasi', 'Status', '']}>
                {units.map((unit) => (
                    <tr
                        key={unit.id}
                        className="border-t border-zinc-200 dark:border-zinc-800"
                    >
                        <td className="p-3">{unit.asset_code}</td>
                        <td className="p-3">{unit.item.name}</td>
                        <td className="p-3">{unit.location ?? '-'}</td>
                        <td className="p-3">{unit.status}</td>
                        <td className="p-3 text-right">
                            <Form {...destroy.form(unit.id)}>
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
