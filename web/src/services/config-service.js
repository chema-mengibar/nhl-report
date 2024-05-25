import { reactive } from 'vue'

export default class ConfigService {

    _config = reactive({
        locale: null,
    })

    constructor(localeService) {

        this._localeService = localeService

        const _locale = this._localeService.getLocale();

        this.setLocale(_locale);
    }

    get config() {
        return this._config
    }

    setLocale(localeSelected) {
        this._config.locale = localeSelected;
        this._localeService.writeStoreLocale(localeSelected);
        this._localeService.init(localeSelected);
    }




}