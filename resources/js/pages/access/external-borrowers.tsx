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
import { destroy, store } from '@/routes/access/external-borrowers';

type Group = { id: number; name: string };
type Borrower = {
    id: number;
    name: string;
    identity_number: string | null;
    contact: string | null;
    group: Group | null;
};

export default function ExternalBorrowers({
    borrowers,
    groups,
}: {
    borrowers: Borrower[];
    groups: Group[];
}) {
    return (
        <AppLayout title="Peminjam Eksternal">
            <Surface>
                <SurfaceBody className="space-y-6">
                    <SectionHeader
                        eyebrow="Access"
                        title="External borrowers"
                        description="Daftarkan peminjam dari luar organisasi dan hubungkan ke grup."
                    />

                    <Form
                        {...store.form()}
                        resetOnSuccess
                        className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
                    >
                        <Field label="Nama">
                            <Input name="name" placeholder="Nama peminjam" />
                        </Field>
                        <Field label="Identitas">
                            <Input
                                name="identity_number"
                                placeholder="NIS/NIM/NIP"
                            />
                        </Field>
                        <Field label="Kontak">
                            <Input name="contact" placeholder="Nomor kontak" />
                        </Field>
                        <Field label="Grup" hint="Opsional">
                            <Select name="group_id" defaultValue="">
                                <option value="">Pilih grup</option>
                                {groups.map((group) => (
                                    <option key={group.id} value={group.id}>
                                        {group.name}
                                    </option>
                                ))}
                            </Select>
                        </Field>
                        <div className="flex items-end md:col-span-2 xl:col-span-4">
                            <SubmitButton className="w-full sm:w-auto">
                                Tambah Peminjam
                            </SubmitButton>
                        </div>
                    </Form>
                </SurfaceBody>
            </Surface>

            <TableShell
                headers={['Nama', 'Identitas', 'Kontak', 'Grup', '']}
                emptyState={
                    borrowers.length === 0 ? (
                        <EmptyState
                            title="Belum ada peminjam eksternal"
                            description="Tambahkan peminjam eksternal untuk transaksi non-internal."
                        />
                    ) : null
                }
            >
                {borrowers.map((borrower) => (
                    <tr
                        key={borrower.id}
                        className="hover:bg-slate-50/70 dark:hover:bg-white/5"
                    >
                        <RowValue>
                            <div className="font-medium text-slate-950 dark:text-white">
                                {borrower.name}
                            </div>
                        </RowValue>
                        <RowValue>{borrower.identity_number ?? '-'}</RowValue>
                        <RowValue>{borrower.contact ?? '-'}</RowValue>
                        <RowValue>{borrower.group?.name ?? '-'}</RowValue>
                        <RowValue align="right">
                            <Form {...destroy.form(borrower.id)}>
                                <DangerButton>Hapus</DangerButton>
                            </Form>
                        </RowValue>
                    </tr>
                ))}
            </TableShell>
        </AppLayout>
    );
}
