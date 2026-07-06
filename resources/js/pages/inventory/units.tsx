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
    StatusBadge,
    SubmitButton,
    Surface,
    SurfaceBody,
    TableShell,
} from '@/components/tailadmin';
import { destroy, store } from '@/routes/inventory/item-units';

type Item = { id: number; name: string };
type Unit = {
    id: number;
    asset_code: string;
    location: string | null;
    status: string;
    item: Item;
};

export default function Units({
    units,
    items,
    statuses,
}: {
    units: Unit[];
    items: Item[];
    statuses: string[];
}) {
    return (
        <AppLayout title="Unit Alat">
            <Surface>
                <SurfaceBody className="space-y-6">
                    <SectionHeader
                        eyebrow="Inventory"
                        title="Unit tracker"
                        description="Kelola unit aset dengan lokasi dan status yang mudah dipantau."
                    />

                    <Form
                        {...store.form()}
                        resetOnSuccess
                        className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
                    >
                        <Field label="Alat">
                            <Select name="item_id" defaultValue="">
                                <option value="">Pilih alat</option>
                                {items.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </Select>
                        </Field>
                        <Field label="Kode aset">
                            <Input name="asset_code" placeholder="Kode aset" />
                        </Field>
                        <Field label="Lokasi" hint="Opsional">
                            <Input
                                name="location"
                                placeholder="Lokasi penyimpanan"
                            />
                        </Field>
                        <Field label="Status">
                            <Select name="status" defaultValue="available">
                                {statuses.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </Select>
                        </Field>
                        <div className="flex items-end md:col-span-2 xl:col-span-4">
                            <SubmitButton className="w-full sm:w-auto">
                                Tambah Unit
                            </SubmitButton>
                        </div>
                    </Form>
                </SurfaceBody>
            </Surface>

            <TableShell
                headers={['Kode aset', 'Alat', 'Lokasi', 'Status', '']}
                emptyState={
                    units.length === 0 ? (
                        <EmptyState
                            title="Belum ada unit"
                            description="Tambahkan unit untuk mulai melacak stok."
                        />
                    ) : null
                }
            >
                {units.map((unit) => (
                    <tr
                        key={unit.id}
                        className="hover:bg-slate-50/70 dark:hover:bg-white/5"
                    >
                        <RowValue>
                            <div className="font-medium text-slate-950 dark:text-white">
                                {unit.asset_code}
                            </div>
                        </RowValue>
                        <RowValue>{unit.item.name}</RowValue>
                        <RowValue>{unit.location ?? '-'}</RowValue>
                        <RowValue>
                            <StatusBadge
                                tone={
                                    unit.status === 'available'
                                        ? 'success'
                                        : 'warning'
                                }
                            >
                                {unit.status}
                            </StatusBadge>
                        </RowValue>
                        <RowValue align="right">
                            <Form {...destroy.form(unit.id)}>
                                <DangerButton>Hapus</DangerButton>
                            </Form>
                        </RowValue>
                    </tr>
                ))}
            </TableShell>
        </AppLayout>
    );
}
