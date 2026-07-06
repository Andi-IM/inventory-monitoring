import { Form } from '@inertiajs/react';
import { AppLayout } from '@/components/app-layout';
import {
    EmptyState,
    Field,
    Input,
    SectionHeader,
    Select,
    StatusBadge,
    SubmitButton,
    Surface,
    SurfaceBody,
} from '@/components/tailadmin';
import { store } from '@/routes/borrowing/loans';
import { returnMethod } from '@/routes/borrowing/loans/items';

type Person = { id: number; name: string };
type Unit = {
    id: number;
    asset_code: string;
    location: string | null;
    item?: { id: number; name: string };
};
type LoanItem = {
    id: number;
    returned_at: string | null;
    return_condition: string | null;
    item_unit: Unit;
};
type Loan = {
    id: number;
    code: string;
    due_at: string;
    status: string;
    borrower_user: Person | null;
    external_borrower: Person | null;
    recorded_by: Person;
    loan_items: LoanItem[];
};

type LoansProps = {
    loans: Loan[];
    internalBorrowers: Person[];
    externalBorrowers: Person[];
    availableUnits: Unit[];
};

export default function Loans({
    loans,
    internalBorrowers,
    externalBorrowers,
    availableUnits,
}: LoansProps) {
    return (
        <AppLayout title="Peminjaman">
            <Surface>
                <SurfaceBody className="space-y-6">
                    <SectionHeader
                        eyebrow="Borrowing"
                        title="Loan operations"
                        description="Buat pinjaman, pantau status, dan proses pengembalian parsial dari satu layar."
                    />

                    <Form
                        {...store.form()}
                        resetOnSuccess
                        className="grid gap-4 lg:grid-cols-12"
                    >
                        <Field label="Tipe peminjam">
                            <Select
                                name="borrower_type"
                                defaultValue="internal"
                            >
                                <option value="internal">Internal</option>
                                <option value="external">Eksternal</option>
                            </Select>
                        </Field>
                        <Field label="Peminjam internal">
                            <Select name="borrower_user_id" defaultValue="">
                                <option value="">Pilih internal</option>
                                {internalBorrowers.map((person) => (
                                    <option key={person.id} value={person.id}>
                                        {person.name}
                                    </option>
                                ))}
                            </Select>
                        </Field>
                        <Field label="Peminjam eksternal">
                            <Select name="external_borrower_id" defaultValue="">
                                <option value="">Pilih eksternal</option>
                                {externalBorrowers.map((person) => (
                                    <option key={person.id} value={person.id}>
                                        {person.name}
                                    </option>
                                ))}
                            </Select>
                        </Field>
                        <Field label="Jatuh tempo">
                            <Input name="due_at" type="datetime-local" />
                        </Field>
                        <Field label="Unit" hint="Bisa pilih banyak">
                            <Select
                                name="item_unit_ids[]"
                                multiple
                                className="min-h-40"
                            >
                                {availableUnits.map((unit) => (
                                    <option key={unit.id} value={unit.id}>
                                        {unit.asset_code} - {unit.item?.name}
                                    </option>
                                ))}
                            </Select>
                        </Field>
                        <Field label="Catatan" hint="Opsional">
                            <Input
                                name="notes"
                                placeholder="Catatan transaksi"
                            />
                        </Field>
                        <div className="flex items-end lg:col-span-12">
                            <SubmitButton className="w-full sm:w-auto">
                                Pinjam Unit
                            </SubmitButton>
                        </div>
                    </Form>
                </SurfaceBody>
            </Surface>

            <div className="grid gap-6">
                {loans.length === 0 ? (
                    <EmptyState
                        title="Belum ada peminjaman"
                        description="Transaksi pinjam akan muncul di sini setelah unit diproses."
                    />
                ) : null}

                {loans.map((loan) => (
                    <Surface
                        key={loan.id}
                        className="bg-white/95 dark:bg-slate-900/95"
                    >
                        <SurfaceBody className="space-y-6">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold tracking-[0.35em] text-cyan-500 uppercase">
                                        Loan {loan.code}
                                    </p>
                                    <h3 className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">
                                        {loan.borrower_user?.name ??
                                            loan.external_borrower?.name ??
                                            '-'}
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                        Jatuh tempo{' '}
                                        {new Date(loan.due_at).toLocaleString(
                                            'id-ID',
                                        )}
                                    </p>
                                </div>
                                <StatusBadge
                                    tone={
                                        loan.status === 'returned'
                                            ? 'success'
                                            : loan.status === 'overdue'
                                              ? 'danger'
                                              : loan.status ===
                                                  'partially_returned'
                                                ? 'warning'
                                                : 'info'
                                    }
                                >
                                    {loan.status}
                                </StatusBadge>
                            </div>

                            <div className="grid gap-4">
                                {loan.loan_items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="grid gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_auto] dark:border-white/10 dark:bg-white/5"
                                    >
                                        <div>
                                            <p className="font-semibold text-slate-950 dark:text-white">
                                                {item.item_unit.asset_code} -{' '}
                                                {item.item_unit.item?.name}
                                            </p>
                                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                                {item.returned_at
                                                    ? `Dikembalikan (${item.return_condition})`
                                                    : 'Belum kembali'}
                                            </p>
                                        </div>
                                        {!item.returned_at ? (
                                            <Form
                                                {...returnMethod.form({
                                                    loan: loan.id,
                                                    loanItem: item.id,
                                                })}
                                                className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
                                            >
                                                <Select
                                                    name="return_condition"
                                                    defaultValue="normal"
                                                >
                                                    <option value="normal">
                                                        normal
                                                    </option>
                                                    <option value="rusak">
                                                        rusak
                                                    </option>
                                                    <option value="hilang">
                                                        hilang
                                                    </option>
                                                </Select>
                                                <Input
                                                    name="return_notes"
                                                    placeholder="Catatan"
                                                />
                                                <SubmitButton
                                                    type="submit"
                                                    className="w-full sm:w-auto"
                                                >
                                                    Kembalikan
                                                </SubmitButton>
                                            </Form>
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        </SurfaceBody>
                    </Surface>
                ))}
            </div>
        </AppLayout>
    );
}
