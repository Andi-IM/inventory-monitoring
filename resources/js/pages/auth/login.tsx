import { Form, Head } from '@inertiajs/react';
import { store } from '@/actions/Modules/Access/Http/Controllers/AuthController';

export default function Login() {
    return (
        <>
            <Head title="Masuk" />
            <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
                <section className="w-full max-w-sm rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <h1 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">Masuk</h1>
                    <Form {...store.form()} className="mt-6 grid gap-4">
                        <label className="grid gap-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                            Email
                            <input name="email" type="email" className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950" />
                        </label>
                        <label className="grid gap-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                            Kata sandi
                            <input name="password" type="password" className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950" />
                        </label>
                        <button className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950">
                            Masuk
                        </button>
                    </Form>
                </section>
            </main>
        </>
    );
}
