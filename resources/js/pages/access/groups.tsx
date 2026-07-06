import { Form } from '@inertiajs/react';
import { useState } from 'react';
import { AppLayout } from '@/components/app-layout';
import {
    DangerButton,
    EmptyState,
    Field,
    Input,
    Modal,
    ModalActions,
    RowValue,
    SecondaryButton,
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
    const [createOpen, setCreateOpen] = useState(false);

    return (
        <AppLayout title="Grup">
            <Surface>
                <SurfaceBody className="space-y-6">
                    <SectionHeader
                        eyebrow="Access"
                        title="Group registry"
                        description="Definisikan grup untuk otorisasi user dan peminjam eksternal."
                        action={
                            <SubmitButton
                                type="button"
                                onClick={() => setCreateOpen(true)}
                            >
                                Tambah Grup
                            </SubmitButton>
                        }
                    />
                </SurfaceBody>
            </Surface>

            <Modal
                open={createOpen}
                title="Tambah grup"
                description="Buat grup akses untuk user internal dan peminjam eksternal."
                onClose={() => setCreateOpen(false)}
            >
                <Form
                    {...store.form()}
                    resetOnSuccess
                    onSuccess={() => setCreateOpen(false)}
                    className="grid gap-4"
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
                        <Input
                            name="description"
                            placeholder="Deskripsi singkat"
                        />
                    </Field>
                    <ModalActions>
                        <SecondaryButton onClick={() => setCreateOpen(false)}>
                            Batal
                        </SecondaryButton>
                        <SubmitButton>Tambah Grup</SubmitButton>
                    </ModalActions>
                </Form>
            </Modal>

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
                    <tr
                        key={group.id}
                        className="hover:bg-slate-50/70 dark:hover:bg-white/5"
                    >
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
                                <DangerButton>Hapus</DangerButton>
                            </Form>
                        </RowValue>
                    </tr>
                ))}
            </TableShell>
        </AppLayout>
    );
}
