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
    const [createOpen, setCreateOpen] = useState(false);

    return (
        <AppLayout title="Master Alat">
            <Surface>
                <SurfaceBody className="space-y-6">
                    <SectionHeader
                        eyebrow="Inventory"
                        title="Master items"
                        description="Rangkum alat berdasarkan kategori agar unit lebih mudah dipetakan."
                        action={
                            <SubmitButton
                                type="button"
                                onClick={() => setCreateOpen(true)}
                            >
                                Tambah Item
                            </SubmitButton>
                        }
                    />
                </SurfaceBody>
            </Surface>

            <Modal
                open={createOpen}
                title="Tambah item"
                description="Daftarkan master alat dan hubungkan ke kategori inventaris yang tepat."
                onClose={() => setCreateOpen(false)}
            >
                <Form
                    {...store.form()}
                    resetOnSuccess
                    onSuccess={() => setCreateOpen(false)}
                    className="grid gap-4"
                >
                    <Field label="Kategori">
                        <Select name="category_id" defaultValue="">
                            <option value="">Pilih kategori</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Select>
                    </Field>
                    <Field label="Nama alat">
                        <Input name="name" placeholder="Nama alat" />
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
                        <SubmitButton>Tambah Item</SubmitButton>
                    </ModalActions>
                </Form>
            </Modal>

            <TableShell
                headers={['Nama', 'Kategori', 'Unit', 'Deskripsi', '']}
                emptyState={
                    items.length === 0 ? (
                        <EmptyState
                            title="Belum ada item"
                            description="Buat item pertama untuk mulai mengisi unit alat."
                        />
                    ) : null
                }
            >
                {items.map((item) => (
                    <tr
                        key={item.id}
                        className="hover:bg-slate-50/70 dark:hover:bg-white/5"
                    >
                        <RowValue>
                            <div className="font-medium text-slate-950 dark:text-white">
                                {item.name}
                            </div>
                        </RowValue>
                        <RowValue>{item.category.name}</RowValue>
                        <RowValue>{item.units_count}</RowValue>
                        <RowValue>{item.description ?? '-'}</RowValue>
                        <RowValue align="right">
                            <Form {...destroy.form(item.id)}>
                                <DangerButton>Hapus</DangerButton>
                            </Form>
                        </RowValue>
                    </tr>
                ))}
            </TableShell>
        </AppLayout>
    );
}
