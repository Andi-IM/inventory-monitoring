import { Form } from '@inertiajs/react';
import { AppLayout } from '@/components/app-layout';
import {
    DangerButton,
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
            <Surface>
                <SurfaceBody className="space-y-6">
                    <SectionHeader
                        eyebrow="Inventory"
                        title="Master items"
                        description="Rangkum alat berdasarkan kategori agar unit lebih mudah dipetakan."
                    />

                    <Form
                        {...store.form()}
                        resetOnSuccess
                        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
                    >
                        <Field label="Kategori">
                            <Select name="category_id" defaultValue="">
                                <option value="">Pilih kategori</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
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
                        <div className="flex items-end md:col-span-2 xl:col-span-3">
                            <SubmitButton className="w-full sm:w-auto">
                                Tambah Item
                            </SubmitButton>
                        </div>
                    </Form>
                </SurfaceBody>
            </Surface>

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
