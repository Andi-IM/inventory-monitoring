import { Form } from '@inertiajs/react';
import { AppLayout } from '@/components/app-layout';
import { destroy, store } from '@/routes/access/users';

type Group = { id: number; name: string };
type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    groups: Group[];
};

export default function Users({
    users,
    groups,
    roles,
}: {
    users: User[];
    groups: Group[];
    roles: string[];
}) {
    return (
        <AppLayout title="User">
            <Form
                {...store.form()}
                resetOnSuccess
                className="grid gap-3 rounded-lg border border-zinc-200 bg-white p-4 md:grid-cols-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
                <input
                    name="name"
                    placeholder="Nama"
                    className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Kata sandi"
                    className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                />
                <select
                    name="role"
                    className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                >
                    {roles.map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>
                <select
                    name="group_ids[]"
                    multiple
                    className="min-h-10 rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                >
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
            <Table headers={['Nama', 'Email', 'Role', 'Grup', '']}>
                {users.map((user) => (
                    <tr
                        key={user.id}
                        className="border-t border-zinc-200 dark:border-zinc-800"
                    >
                        <td className="p-3">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">{user.role}</td>
                        <td className="p-3">
                            {user.groups
                                .map((group) => group.name)
                                .join(', ') || '-'}
                        </td>
                        <td className="p-3 text-right">
                            <Form {...destroy.form(user.id)}>
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
