import { Form } from '@inertiajs/react';
import { AppLayout } from '@/components/app-layout';
import {
    EmptyState,
    Field,
    Input,
    RowValue,
    SectionHeader,
    Select,
    SubmitButton,
    Surface,
    SurfaceBody,
    TableShell,
} from '@/components/tailadmin';
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
            <Surface>
                <SurfaceBody className="space-y-6">
                    <SectionHeader
                        eyebrow="Access"
                        title="User management"
                        description="Kelola akun internal, role, dan grup akses dari satu layar."
                    />

                    <Form
                        {...store.form()}
                        resetOnSuccess
                        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
                    >
                        <Field label="Nama" hint="Wajib">
                            <Input name="name" placeholder="Nama pengguna" />
                        </Field>
                        <Field label="Email" hint="Login email">
                            <Input
                                name="email"
                                type="email"
                                placeholder="nama@contoh.com"
                            />
                        </Field>
                        <Field label="Kata sandi" hint="Buat rahasia baru">
                            <Input
                                name="password"
                                type="password"
                                placeholder="Password"
                            />
                        </Field>
                        <Field label="Role">
                            <Select name="role" defaultValue={roles[0]}>
                                {roles.map((role) => (
                                    <option key={role} value={role}>
                                        {role}
                                    </option>
                                ))}
                            </Select>
                        </Field>
                        <Field label="Grup" hint="Bisa lebih dari satu">
                            <Select name="group_ids[]" multiple className="min-h-32">
                                {groups.map((group) => (
                                    <option key={group.id} value={group.id}>
                                        {group.name}
                                    </option>
                                ))}
                            </Select>
                        </Field>
                        <div className="flex items-end md:col-span-2 xl:col-span-3">
                            <SubmitButton className="w-full sm:w-auto">
                                Tambah User
                            </SubmitButton>
                        </div>
                    </Form>
                </SurfaceBody>
            </Surface>

            <TableShell
                headers={['Nama', 'Email', 'Role', 'Grup', '']}
                emptyState={
                    users.length === 0 ? (
                        <EmptyState
                            title="Belum ada user"
                            description="Tambahkan user pertama untuk mulai mengelola akses."
                        />
                    ) : null
                }
            >
                {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/70 dark:hover:bg-white/5">
                        <RowValue>
                            <div className="font-medium text-slate-950 dark:text-white">
                                {user.name}
                            </div>
                        </RowValue>
                        <RowValue>{user.email}</RowValue>
                        <RowValue>{user.role}</RowValue>
                        <RowValue>
                            {user.groups.map((group) => group.name).join(', ') || '-'}
                        </RowValue>
                        <RowValue align="right">
                            <Form {...destroy.form(user.id)}>
                                <button className="rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 hover:text-rose-500">
                                    Hapus
                                </button>
                            </Form>
                        </RowValue>
                    </tr>
                ))}
            </TableShell>
        </AppLayout>
    );
}
