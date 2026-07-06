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
    const [createOpen, setCreateOpen] = useState(false);

    return (
        <AppLayout title="Unit Alat">
            <Surface>
                <SurfaceBody className="space-y-6">
                    <SectionHeader
                        eyebrow="Inventory"
                        title="Unit tracker"
                        description="Kelola unit aset dengan lokasi dan status yang mudah dipantau."
                        action={
                            <SubmitButton
                                type="button"
                                onClick={() => setCreateOpen(true)}
                            >
                                Tambah Unit
                            </SubmitButton>
                        }
                    />
                </SurfaceBody>
            </Surface>

            <Modal
                open={createOpen}
                title="Tambah unit"
                description="Catat unit aset baru lengkap dengan kode, lokasi, dan status awal."
                onClose={() => setCreateOpen(false)}
            >
                <Form
                    {...store.form()}
                    resetOnSuccess
                    onSuccess={() => setCreateOpen(false)}
                    className="grid gap-4"
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
                    <ModalActions>
                        <SecondaryButton onClick={() => setCreateOpen(false)}>
                            Batal
                        </SecondaryButton>
                        <SubmitButton>Tambah Unit</SubmitButton>
                    </ModalActions>
                </Form>
            </Modal>

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
