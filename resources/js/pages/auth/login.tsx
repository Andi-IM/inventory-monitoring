import { Form, Head } from '@inertiajs/react';
import { store } from '@/actions/Modules/Access/Http/Controllers/AuthController';
import gridShape from '@/assets/tailadmin/shape/grid-01.svg';

const fieldClass =
    'h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-sm outline-none transition placeholder:text-gray-500 focus:border-indigo-400 focus:ring-3 focus:ring-indigo-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/40 dark:focus:border-indigo-500';

export default function Login() {
    return (
        <>
            <Head title="Masuk" />

            <main className="relative z-[1] min-h-screen bg-white p-6 sm:p-0 dark:bg-gray-900">
                <section className="relative flex min-h-screen w-full flex-col justify-center sm:p-0 lg:flex-row dark:bg-gray-900">
                    <div className="flex w-full flex-1 flex-col lg:w-1/2">
                        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
                            <div className="mb-5 sm:mb-8">
                                <h1 className="mb-2 text-2xl font-semibold text-gray-800 sm:text-3xl dark:text-white/90">
                                    Masuk
                                </h1>
                                <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
                                    Masukkan email dan kata sandi untuk membuka
                                    dashboard inventaris HERTS.
                                </p>
                            </div>

                            <Form {...store.form()}>
                                {({ errors, processing }) => (
                                    <div className="space-y-5">
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                                            >
                                                Email
                                                <span className="text-rose-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                placeholder="admin@example.com"
                                                className={fieldClass}
                                            />
                                            {errors.email ? (
                                                <p className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">
                                                    {errors.email}
                                                </p>
                                            ) : null}
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                                            >
                                                Kata sandi
                                                <span className="text-rose-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                placeholder="Masukkan kata sandi"
                                                className={`${fieldClass} pr-11`}
                                            />
                                            {errors.password ? (
                                                <p className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">
                                                    {errors.password}
                                                </p>
                                            ) : null}
                                        </div>

                                        <div className="flex items-center justify-between gap-4">
                                            <label
                                                htmlFor="remember"
                                                className="flex cursor-pointer items-center text-sm font-normal text-gray-700 select-none dark:text-gray-400"
                                            >
                                                <input
                                                    id="remember"
                                                    name="remember"
                                                    type="checkbox"
                                                    value="1"
                                                    className="peer sr-only"
                                                />
                                                <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 transition peer-checked:border-indigo-500 peer-checked:bg-indigo-500 peer-focus:ring-3 peer-focus:ring-indigo-500/15 dark:border-gray-700 peer-checked:[&>svg]:opacity-100">
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 14 14"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="opacity-0 transition peer-checked:opacity-100"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                                                            stroke="white"
                                                            strokeWidth="1.9"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </span>
                                                Tetap masuk
                                            </label>

                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                Hubungi admin jika lupa akses.
                                            </span>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 focus:ring-3 focus:ring-indigo-500/15 focus:outline-none disabled:cursor-not-allowed disabled:bg-indigo-200 disabled:text-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:disabled:bg-indigo-950 dark:disabled:text-indigo-500"
                                        >
                                            {processing
                                                ? 'Memproses...'
                                                : 'Masuk'}
                                        </button>
                                    </div>
                                )}
                            </Form>

                            <div className="mt-5">
                                <p className="text-center text-sm font-normal text-gray-700 sm:text-start dark:text-gray-400">
                                    Akses dibuat oleh admin sistem untuk petugas
                                    inventaris.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="relative hidden min-h-screen w-full items-center overflow-hidden bg-[#101828] lg:grid lg:w-1/2 dark:bg-white/[0.05]">
                        <div className="absolute top-0 right-0 z-0 w-full max-w-[250px] xl:max-w-[450px]">
                            <img src={gridShape} alt="" aria-hidden="true" />
                        </div>
                        <div className="absolute bottom-0 left-0 z-0 w-full max-w-[250px] rotate-180 xl:max-w-[450px]">
                            <img src={gridShape} alt="" aria-hidden="true" />
                        </div>

                        <div className="relative z-[1] flex items-center justify-center">
                            <div className="flex max-w-xs flex-col items-center">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500 text-sm font-black tracking-[0.2em] text-white">
                                        IM
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-white">
                                            HERTS
                                        </p>
                                        <p className="text-xs font-medium text-gray-400">
                                            Inventory Monitoring
                                        </p>
                                    </div>
                                </div>
                                <p className="text-center text-sm leading-6 text-gray-400 dark:text-white/60">
                                    Kelola inventaris, unit barang, peminjaman,
                                    dan pengembalian dari satu dashboard
                                    operasional.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
