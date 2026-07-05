import { Form } from '@inertiajs/react';
import { AppLayout } from '@/components/app-layout';
import { destroy, store } from '@/routes/access/groups';

type Group = {
    id: number;
    name: string;
    type: string | null;
    description: string | null;
    users_count: number;
    external_borrowers_count: number;
};

export default function Groups({
    groups,
    types,
}: {
    groups: Group[];
    types: string[];
}) {
    return (
        <AppLayout title="Grup">
            <Form
                {...store.form()}
                resetOnSuccess
                className="grid gap-3 rounded-lg border border-zinc-200 bg-white p-4 md:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
                <input
                    name="name"
                    placeholder="Nama grup"
                    className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                />
                <select
                    name="type"
                    className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                >
                    <option value="">Tipe</option>
                    {types.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                <input
                    name="description"
                    placeholder="Deskripsi"
                    className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                />
                <button className="rounded-md bg-zinc-950 px-4 py-2 text-white dark:bg-zinc-100 dark:text-zinc-950">
                    Tambah
                </button>
            </Form>
            <Table headers={['Nama', 'Tipe', 'User', 'Eksternal', '']}>
                {groups.map((group) => (
                    <tr
                        key={group.id}
                        className="border-t border-zinc-200 dark:border-zinc-800"
                    >
                        <td className="p-3">{group.name}</td>
                        <td className="p-3">{group.type ?? '-'}</td>
                        <td className="p-3">{group.users_count}</td>
                        <td className="p-3">
                            {group.external_borrowers_count}
                        </td>
                        <td className="p-3 text-right">
                            <Form {...destroy.form(group.id)}>
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
