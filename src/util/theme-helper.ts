

export function toggleTheme() {
    if (localStorage.theme === "light") {
        localStorage.theme = "dark"
    } else {
        localStorage.theme = "light"
    }
    updateTheme()
}

export function updateTheme() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}