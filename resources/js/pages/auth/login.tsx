import { Form, Head } from '@inertiajs/react';
import { store } from '@/actions/Modules/Access/Http/Controllers/AuthController';
import { Field, Input, SubmitButton } from '@/components/tailadmin';

const features = [
    ['Access', 'Users, groups, borrowers'],
    ['Inventory', 'Categories, items, units'],
    ['Borrowing', 'Loans and returns'],
];

export default function Login() {
    return (
        <>
            <Head title="Masuk" />
            <main className="flex min-h-screen items-center justify-center px-4 py-10">
                <section className="grid w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[1.05fr_0.95fr] dark:border-white/10 dark:bg-slate-900">
                    <div className="flex flex-col justify-between bg-slate-950 px-8 py-10 text-white sm:px-10 lg:px-12">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500 text-white">
                                    <span className="text-sm font-black tracking-[0.2em]">
                                        IM
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold tracking-[0.35em] text-cyan-300 uppercase">
                                        TailAdmin
                                    </p>
                                    <h1 className="mt-1 text-2xl font-semibold">
                                        Inventory Monitor
                                    </h1>
                                </div>
                            </div>

                            <h2 className="mt-10 max-w-md text-4xl leading-tight font-semibold">
                                Inventaris dan peminjaman dalam satu dashboard
                                yang rapi.
                            </h2>
                            <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
                                Struktur halaman mengikuti pola TailAdmin: panel
                                kiri untuk konteks, panel kanan untuk form
                                utama.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-3 sm:grid-cols-3">
                            {features.map(([title, description]) => (
                                <div
                                    key={title}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                                >
                                    <p className="text-sm font-semibold text-white">
                                        {title}
                                    </p>
                                    <p className="mt-1 text-xs leading-5 text-slate-400">
                                        {description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-center px-6 py-10 sm:px-10">
                        <div className="w-full max-w-md">
                            <div className="mb-8">
                                <p className="text-xs font-semibold tracking-[0.35em] text-cyan-600 uppercase">
                                    Welcome back
                                </p>
                                <h2 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">
                                    Masuk ke dashboard
                                </h2>
                                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                    Gunakan akun admin atau petugas untuk
                                    lanjut.
                                </p>
                            </div>

                            <Form {...store.form()} className="grid gap-4">
                                <Field label="Email">
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder="nama@contoh.com"
                                    />
                                </Field>
                                <Field label="Kata sandi">
                                    <Input
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Field>
                                <SubmitButton className="mt-2 w-full">
                                    Masuk
                                </SubmitButton>
                            </Form>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
