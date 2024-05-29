import {reactive} from 'vue'
import Data01 from './data/shoots-counter/shoots-counter_round-1_Bruins-Leafs.json'
import Data02 from './data/shoots-counter/shoots-counter_round-1_Canucks-Predators.json'
import Data03 from './data/shoots-counter/shoots-counter_round-1_Hurricanes-Islanders.json'
import Data04 from './data/shoots-counter/shoots-counter_round-1_Jets-Avalanche.json'
import Data05 from './data/shoots-counter/shoots-counter_round-1_Oilers-Kings.json'
import Data06 from './data/shoots-counter/shoots-counter_round-1_Panthers-Lightning.json'
import Data07 from './data/shoots-counter/shoots-counter_round-1_Rangers-Capitals.json'
import Data08 from './data/shoots-counter/shoots-counter_round-1_Stars-Knights.json'
import Data09 from './data/shoots-counter/shoots-counter_round-2_Canucks-Oilers.json'
import Data010 from './data/shoots-counter/shoots-counter_round-2_Panthers-Bruins.json'
import Data011 from './data/shoots-counter/shoots-counter_round-2_Rangers-Hurricanes.json'
import Data012 from './data/shoots-counter/shoots-counter_round-2_Stars-Avalanche.json'

const defaultConfig = {
    level: 1,


}


export default class ToolService {


    domain = '//story.motuo.info'

    lib = {
        'shoots-counter_round-1_Bruins-Leafs': Data01,
        'shoots-counter_round-1_Canucks-Predators': Data02,
        'shoots-counter_round-1_Hurricanes-Islanders': Data03
        , 'shoots-counter_round-1_Jets-Avalanche': Data04
        , 'shoots-counter_round-1_Oilers-Kings': Data05
        , 'shoots-counter_round-1_Panthers-Lightning': Data06
        , 'shoots-counter_round-1_Rangers-Capitals': Data07
        , 'shoots-counter_round-1_Stars-Knights': Data08
        , 'shoots-counter_round-2_Canucks-Oilers': Data09
        , 'shoots-counter_round-2_Panthers-Bruins': Data010
        , 'shoots-counter_round-2_Rangers-Hurricanes': Data011
        , 'shoots-counter_round-2_Stars-Avalanche': Data012,
    }

    keysRound1 = [
        'shoots-counter_round-1_Bruins-Leafs',
        'shoots-counter_round-1_Canucks-Predators',
        'shoots-counter_round-1_Hurricanes-Islanders'
        , 'shoots-counter_round-1_Jets-Avalanche'
        , 'shoots-counter_round-1_Oilers-Kings'
        , 'shoots-counter_round-1_Panthers-Lightning'
        , 'shoots-counter_round-1_Rangers-Capitals'
        , 'shoots-counter_round-1_Stars-Knights'
    ]

    keysRound2 = [
        'shoots-counter_round-2_Canucks-Oilers'
        , 'shoots-counter_round-2_Panthers-Bruins'
        , 'shoots-counter_round-2_Rangers-Hurricanes'
        , 'shoots-counter_round-2_Stars-Avalanche'
    ]

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


    getData(fileId) {
        return this.lib[fileId];
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


    getNumGamesByFileId(fileId, asArray = false) {
        const report = this.lib[fileId]
        const len = report.games_reports.length;
        if (asArray) {
            const ints = [];
            for (var i = 0; i < len; i++) {
                ints.push(i);
            }
            return ints;
        } else {
            return len
        }
    }

}