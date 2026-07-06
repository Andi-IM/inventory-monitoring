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
            <Surface>
                <SurfaceBody className="space-y-6">
                    <SectionHeader
                        eyebrow="Access"
                        title="Group registry"
                        description="Definisikan grup untuk otorisasi user dan peminjam eksternal."
                    />

                    <Form
                        {...store.form()}
                        resetOnSuccess
                        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
                    >
                        <Field label="Nama grup">
                            <Input name="name" placeholder="Nama grup" />
                        </Field>
                        <Field label="Tipe">
                            <Select name="type" defaultValue="">
                                <option value="">Pilih tipe</option>
                                {types.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </Select>
                        </Field>
                        <Field label="Deskripsi" hint="Opsional">
                            <Input name="description" placeholder="Deskripsi singkat" />
                        </Field>
                        <div className="flex items-end md:col-span-2 xl:col-span-3">
                            <SubmitButton className="w-full sm:w-auto">
                                Tambah Grup
                            </SubmitButton>
                        </div>
                    </Form>
                </SurfaceBody>
            </Surface>

            <TableShell
                headers={['Nama', 'Tipe', 'User', 'Eksternal', '']}
                emptyState={
                    groups.length === 0 ? (
                        <EmptyState
                            title="Belum ada grup"
                            description="Buat grup pertama untuk mulai menyusun otorisasi."
                        />
                    ) : null
                }
            >
                {groups.map((group) => (
                    <tr key={group.id} className="hover:bg-slate-50/70 dark:hover:bg-white/5">
                        <RowValue>
                            <div className="font-medium text-slate-950 dark:text-white">
                                {group.name}
                            </div>
                        </RowValue>
                        <RowValue>{group.type ?? '-'}</RowValue>
                        <RowValue>{group.users_count}</RowValue>
                        <RowValue>{group.external_borrowers_count}</RowValue>
                        <RowValue align="right">
                            <Form {...destroy.form(group.id)}>
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
