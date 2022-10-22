
const PREFERRED_LANG_KEY = "preferred_lang"

export function getPreferredLanguage() {
    const preferredLang = localStorage.getItem(PREFERRED_LANG_KEY)
    return (preferredLang
        ? preferredLang
        : navigator.language.split("-")[0])
}

export function setPreferredLanguage(langCodeShort: string) {
    localStorage.setItem(PREFERRED_LANG_KEY, langCodeShort)
}