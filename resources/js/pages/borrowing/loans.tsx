import { Form } from '@inertiajs/react';
import { AppLayout } from '@/components/app-layout';
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
            <Form
                {...store.form()}
                resetOnSuccess
                className="grid gap-3 rounded-lg border border-zinc-200 bg-white p-4 lg:grid-cols-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
                <select
                    name="borrower_type"
                    defaultValue="internal"
                    className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                >
                    <option value="internal">Internal</option>
                    <option value="external">Eksternal</option>
                </select>
                <select
                    name="borrower_user_id"
                    className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                >
                    <option value="">Peminjam internal</option>
                    {internalBorrowers.map((person) => (
                        <option key={person.id} value={person.id}>
                            {person.name}
                        </option>
                    ))}
                </select>
                <select
                    name="external_borrower_id"
                    className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                >
                    <option value="">Peminjam eksternal</option>
                    {externalBorrowers.map((person) => (
                        <option key={person.id} value={person.id}>
                            {person.name}
                        </option>
                    ))}
                </select>
                <input
                    name="due_at"
                    type="datetime-local"
                    className="rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                />
                <select
                    name="item_unit_ids[]"
                    multiple
                    className="min-h-10 rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
                >
                    {availableUnits.map((unit) => (
                        <option key={unit.id} value={unit.id}>
                            {unit.asset_code} - {unit.item?.name}
                        </option>
                    ))}
                </select>
                <button className="rounded-md bg-zinc-950 px-4 py-2 text-white dark:bg-zinc-100 dark:text-zinc-950">
                    Pinjam
                </button>
                <input
                    name="notes"
                    placeholder="Catatan"
                    className="rounded-md border border-zinc-300 px-3 py-2 lg:col-span-6 dark:border-zinc-700 dark:bg-zinc-950"
                />
            </Form>

            <div className="mt-6 grid gap-4">
                {loans.map((loan) => (
                    <section
                        key={loan.id}
                        className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                    >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h2 className="font-semibold">{loan.code}</h2>
                                <p className="text-sm text-zinc-500">
                                    {loan.borrower_user?.name ??
                                        loan.external_borrower?.name ??
                                        '-'}{' '}
                                    | jatuh tempo{' '}
                                    {new Date(loan.due_at).toLocaleString(
                                        'id-ID',
                                    )}
                                </p>
                            </div>
                            <span className="rounded-md bg-zinc-100 px-2 py-1 text-sm dark:bg-zinc-800">
                                {loan.status}
                            </span>
                        </div>
                        <div className="mt-4 grid gap-3">
                            {loan.loan_items.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid gap-3 rounded-md border border-zinc-200 p-3 md:grid-cols-[1fr_auto] dark:border-zinc-800"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {item.item_unit.asset_code} -{' '}
                                            {item.item_unit.item?.name}
                                        </p>
                                        <p className="text-sm text-zinc-500">
                                            {item.returned_at
                                                ? `Dikembalikan (${item.return_condition})`
                                                : 'Belum kembali'}
                                        </p>
                                    </div>
                                    {!item.returned_at && (
                                        <Form
                                            {...returnMethod.form({
                                                loan: loan.id,
                                                loanItem: item.id,
                                            })}
                                            className="flex flex-wrap gap-2"
                                        >
                                            <select
                                                name="return_condition"
                                                className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
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
                                            </select>
                                            <input
                                                name="return_notes"
                                                placeholder="Catatan"
                                                className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                                            />
                                            <button className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700">
                                                Kembalikan
                                            </button>
                                        </Form>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </AppLayout>
    );
}
