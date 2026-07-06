import { Head, Link } from '@inertiajs/react';
import error404Dark from '@/assets/tailadmin/error/404-dark.svg';
import error404 from '@/assets/tailadmin/error/404.svg';
import gridShape from '@/assets/tailadmin/shape/grid-01.svg';
import { dashboard } from '@/routes';

type HttpErrorProps = {
    status?: 404 | 500 | 503;
};

const errorCopy: Record<
    NonNullable<HttpErrorProps['status']>,
    {
        title: string;
        description: string;
        action: string;
    }
> = {
    404: {
        title: 'Page not found',
        description: "We can't seem to find the page you are looking for!",
        action: 'Back to Home Page',
    },
    500: {
        title: 'Server error',
        description:
            'The server ran into a problem while processing your request.',
        action: 'Back to Dashboard',
    },
    503: {
        title: 'Service unavailable',
        description:
            'The application is temporarily unavailable. Please check back soon.',
        action: 'Back to Dashboard',
    },
};

export default function HttpError({ status = 404 }: HttpErrorProps) {
    const copy = errorCopy[status] ?? errorCopy[500];
    const isNotFound = status === 404;

    return (
        <>
            <Head title={`${status} Error`} />

            <main className="relative z-[1] flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 p-6 dark:bg-gray-900">
                <div className="absolute top-0 right-0 -z-[1] w-full max-w-[250px] xl:max-w-[450px]">
                    <img src={gridShape} alt="" aria-hidden="true" />
                </div>
                <div className="absolute bottom-0 left-0 -z-[1] w-full max-w-[250px] rotate-180 xl:max-w-[450px]">
                    <img src={gridShape} alt="" aria-hidden="true" />
                </div>

                <section className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
                    <h1 className="mb-8 text-[36px] leading-[44px] font-bold text-gray-800 xl:text-[72px] xl:leading-[90px] dark:text-white/90">
                        ERROR
                    </h1>

                    {isNotFound ? (
                        <>
                            <img
                                src={error404}
                                alt="404"
                                className="dark:hidden"
                            />
                            <img
                                src={error404Dark}
                                alt="404"
                                className="hidden dark:block"
                            />
                        </>
                    ) : (
                        <p className="text-[76px] leading-none font-bold tracking-normal text-[#465FFF] sm:text-[118px] dark:text-[#7592FF]">
                            {status}
                        </p>
                    )}

                    <h2 className="mt-10 text-xl font-semibold text-gray-800 dark:text-white/90">
                        {copy.title}
                    </h2>

                    <p className="mt-3 mb-6 text-base text-gray-700 sm:text-lg dark:text-gray-400">
                        {copy.description}
                    </p>

                    <Link
                        href={dashboard.url()}
                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-800 focus:ring-4 focus:ring-indigo-500/15 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                    >
                        {copy.action}
                    </Link>
                </section>

                <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-sm text-gray-500 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} - HERTS
                </p>
            </main>
        </>
    );
}
