import EnDictionary from './locale/locale-en.json';

export default class LocaleService {

    _dict = null;
    _locales = [ 'en'];

    defaultLang = 'en';
    keyLang = 'l';

    constructor() {

    }

    get locales() {
        return this._locales
    }


    getLocale() {

        let tempLocale = this.defaultLang;

        const storedLocale = this.readStoreLocale();

        if (!storedLocale) {
            console.log('[ConfigService] navigator.language: ', navigator.language);
            const navigatorLocale = navigator.language;
            if (navigatorLocale === 'en-EN') {
                tempLocale = 'en';
            } else if (navigatorLocale === 'es-ES') {
                tempLocale = 'es';
            }
        } else {
            if (this._locales.includes(storedLocale)) {
                tempLocale = storedLocale
            }
        }

        return tempLocale;

        var params = new URLSearchParams(window.location.search);
        const langQueryParam = params.get(this.keyLang)
    }


    writeStoreLocale(selectedLocale) {
       // localStorage.setItem("cup-locale", selectedLocale);
    }

    readStoreLocale() {
        // return localStorage.getItem("cup-locale");
    }

    init(locale) {
        if (locale === 'en') {
            this._dict = { ...EnDictionary };
        }
        else {
            this._dict = { ...EnDictionary };
        }
    }

    // ---------------------- dictionary methods


    t() {
        return (labelKey) => this._dict[labelKey];
    }

    T() {
        return (labelKeys) => {
            const o = {}
            labelKeys.forEach(labelKey => {
                o[labelKey] = this._dict[labelKey];
            })
            return o;
        }
    }

    D() {
        return this._dict
    }

}