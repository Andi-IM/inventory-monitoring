import { Form } from '@inertiajs/react';
import { AppLayout } from '@/components/app-layout';
import {
    EmptyState,
    Field,
    Input,
    RowValue,
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
    return (
        <AppLayout title="Kategori Alat">
            <Surface>
                <SurfaceBody className="space-y-6">
                    <SectionHeader
                        eyebrow="Inventory"
                        title="Category library"
                        description="Kelola kategori alat dengan identitas kode yang jelas."
                    />

                    <Form
                        {...store.form()}
                        resetOnSuccess
                        className="grid gap-4 md:grid-cols-2"
                    >
                        <Field label="Nama kategori">
                            <Input name="name" placeholder="Nama kategori" />
                        </Field>
                        <Field label="Kode" hint="Opsional">
                            <Input name="code" placeholder="Kode kategori" />
                        </Field>
                        <div className="flex items-end md:col-span-2">
                            <SubmitButton className="w-full sm:w-auto">
                                Tambah Kategori
                            </SubmitButton>
                        </div>
                    </Form>
                </SurfaceBody>
            </Surface>

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
                    <tr key={category.id} className="hover:bg-slate-50/70 dark:hover:bg-white/5">
                        <RowValue>
                            <div className="font-medium text-slate-950 dark:text-white">
                                {category.name}
                            </div>
                        </RowValue>
                        <RowValue>
                            {category.code ? (
                                <StatusBadge tone="info">{category.code}</StatusBadge>
                            ) : (
                                '-'
                            )}
                        </RowValue>
                        <RowValue>{category.items_count}</RowValue>
                        <RowValue align="right">
                            <Form {...destroy.form(category.id)}>
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
