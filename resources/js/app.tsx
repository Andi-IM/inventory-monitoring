import { createInertiaApp } from '@inertiajs/react';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const themeStorageKey = 'inventory-monitoring-theme';

if (typeof document !== 'undefined') {
    const storedTheme = window.localStorage.getItem(themeStorageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = storedTheme === 'dark' || storedTheme === 'light'
        ? storedTheme
        : prefersDark
            ? 'dark'
            : 'light';

    document.documentElement.classList.toggle('dark', theme === 'dark');
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    progress: {
        color: '#465FFF',
    },
});