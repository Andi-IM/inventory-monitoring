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
    SubmitButton,
    Surface,
    SurfaceBody,
    TableShell,
    StatusBadge,
} from '@/components/tailadmin';
import { destroy, store } from '@/routes/inventory/categories';

type Category = {
    id: number;
    name: string;
    code: string | null;
    items_count: number;
};

export default function Categories({ categories }: { categories: Category[] }) {
    const [createOpen, setCreateOpen] = useState(false);

    return (
        <AppLayout title="Kategori Alat">
            <Surface>
                <SurfaceBody className="space-y-6">
                    <SectionHeader
                        eyebrow="Inventory"
                        title="Category library"
                        description="Kelola kategori alat dengan identitas kode yang jelas."
                        action={
                            <SubmitButton
                                type="button"
                                onClick={() => setCreateOpen(true)}
                            >
                                Tambah Kategori
                            </SubmitButton>
                        }
                    />
                </SurfaceBody>
            </Surface>

            <Modal
                open={createOpen}
                title="Tambah kategori"
                description="Buat kategori inventaris baru dengan nama yang mudah dipindai dan kode opsional."
                onClose={() => setCreateOpen(false)}
            >
                <Form
                    {...store.form()}
                    resetOnSuccess
                    onSuccess={() => setCreateOpen(false)}
                    className="grid gap-4"
                >
                    <Field label="Nama kategori">
                        <Input name="name" placeholder="Nama kategori" />
                    </Field>
                    <Field label="Kode" hint="Opsional">
                        <Input name="code" placeholder="Kode kategori" />
                    </Field>
                    <ModalActions>
                        <SecondaryButton onClick={() => setCreateOpen(false)}>
                            Batal
                        </SecondaryButton>
                        <SubmitButton>Tambah Kategori</SubmitButton>
                    </ModalActions>
                </Form>
            </Modal>

            <TableShell
                headers={['Nama', 'Kode', 'Jumlah alat', '']}
                emptyState={
                    categories.length === 0 ? (
                        <EmptyState
                            title="Belum ada kategori"
                            description="Mulai dari kategori pertama untuk mengelola item dan unit."
                        />
                    ) : null
                }
            >
                {categories.map((category) => (
                    <tr
                        key={category.id}
                        className="hover:bg-slate-50/70 dark:hover:bg-white/5"
                    >
                        <RowValue>
                            <div className="font-medium text-slate-950 dark:text-white">
                                {category.name}
                            </div>
                        </RowValue>
                        <RowValue>
                            {category.code ? (
                                <StatusBadge tone="info">
                                    {category.code}
                                </StatusBadge>
                            ) : (
                                '-'
                            )}
                        </RowValue>
                        <RowValue>{category.items_count}</RowValue>
                        <RowValue align="right">
                            <Form {...destroy.form(category.id)}>
                                <DangerButton>Hapus</DangerButton>
                            </Form>
                        </RowValue>
                    </tr>
                ))}
            </TableShell>
        </AppLayout>
    );
}
