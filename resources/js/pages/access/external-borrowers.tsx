import { Form } from '@inertiajs/react';
import { AppLayout } from '@/components/app-layout';
import { destroy, store } from '@/routes/access/external-borrowers';

type Group = { id: number; name: string };
type Borrower = {
    id: number;
    name: string;
    identity_number: string | null;
    contact: string | null;
    group: Group | null;
};

export default function ExternalBorrowers({
    borrowers,
    groups,
}: {
    borrowers: Borrower[];
    groups: Group[];
}) {
    return (
        <AppLayout title="Peminjam Eksternal">
            <Form
                {...store.form()}
                resetOnSuccess
                className="grid gap-3 rounded-lg border border-zinc-200 bg-white p-4 md:grid-cols-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
                <input
                    name="name"
                    placeholder="Nama"
                    className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                />
                <input
                    name="identity_number"
                    placeholder="NIS/NIM/NIP"
                    className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                />
                <input
                    name="contact"
                    placeholder="Kontak"
                    className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                />
                <select
                    name="group_id"
                    className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                >
                    <option value="">Grup</option>
                    {groups.map((group) => (
                        <option key={group.id} value={group.id}>
                            {group.name}
                        </option>
                    ))}
                </select>
                <button className="rounded-md bg-zinc-950 px-4 py-2 text-white dark:bg-zinc-100 dark:text-zinc-950">
                    Tambah
                </button>
            </Form>
            <Table headers={['Nama', 'Identitas', 'Kontak', 'Grup', '']}>
                {borrowers.map((borrower) => (
                    <tr
                        key={borrower.id}
                        className="border-t border-zinc-200 dark:border-zinc-800"
                    >
                        <td className="p-3">{borrower.name}</td>
                        <td className="p-3">
                            {borrower.identity_number ?? '-'}
                        </td>
                        <td className="p-3">{borrower.contact ?? '-'}</td>
                        <td className="p-3">{borrower.group?.name ?? '-'}</td>
                        <td className="p-3 text-right">
                            <Form {...destroy.form(borrower.id)}>
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
