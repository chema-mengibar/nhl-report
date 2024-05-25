import { reactive } from 'vue'
import Data01 from './data/shoots-counter_8f36d70b-a463-452e-9f02-65dd5d37d2c9.json'

const defaultConfig = {
    level: 1,


}


export default class ToolService {


    domain = '//story.motuo.info'



    constructor() {
        this._data = reactive({
            state: '', // loading, loaded

            config: {
                ...defaultConfig,
            },

        })



        // this.fetchData().then(() => {
        //     // AppRouter.push({ path: '/', replace: true }).then(() => {
        //     //     window.location.href = '/'
        //     // })
        // });
    }



    getAssetsPath(imageName) {
        return this.domain + '/data/images/' + imageName
    }


    raw(obj) {
        return JSON.parse(JSON.stringify(obj))
    }


    getData() {
        return Data01;
    }


    debounce(func, time) {
        time = time || 80;
        let timer;
        return function (event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, time, event);
        };
    }

    async fetchData() {
        const url = this.domain + '';
        // console.log('[ToolService] fetchData: start');
        this.state = 'loading';

        return fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                return res.json()
            })
            .then((jsonResponse) => {
                if (jsonResponse) {
                    console.log('[ToolService] fetchData:resp', jsonResponse)
                    this.SVG = jsonResponse;

                    setTimeout(() => {
                        this.state = 'loaded';
                    }, 100)

                    // return this.SVG;
                }
            }, (error) => {
                this.state = 'loaded';
                console.error('[ToolService] fetchData:', error)
            })
    }

}