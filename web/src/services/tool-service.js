import {reactive} from 'vue'
import ReportsDictionary from './tool/reports-dictionary'

const dataSets = import.meta.glob('./data/**/*.json')

export default class ToolService {


    teamsColors = {
        Knights: '#eca200', // 236, 162, 0
        'Golden-Knights': '#eca200', // 236, 162, 0
        Predators: '#FFB81C', // 255, 184, 28
        Hurricanes: '#CC0000', // 204, 0, 0
        Islanders: '#00468B', // 0, 70, 139
        Jets: '#05458a', //  4, 30, 66
        Avalanche: '#a13459', // 111, 38, 61
        Capitals: '#C8102E', // 200, 16, 46
        Kings: '#A2AAAD', // 162, 170, 173
        Lightning: '#122797', // 18, 39, 151
        Panthers: '#C8102E', // 200, 16, 46
        Rangers: '#0033A0', // 0, 51, 160
        Stars: '#00fa00', // 0, 250, 0
        Oilers: '#FC4C03', // 252, 76, 3
        Canucks: '#114bb2', // 0, 32, 91
        Bruins: '#FEC215', // 254, 194, 21
        Leafs: '#025afc', // 0, 32, 91
        'Maple-Leafs': '#025afc', // 0, 32, 91
    }

    constructor() {
        this._data = reactive({
            state: '', // loading, loaded
        })
    }

    getTeamColor(teamName){
        return this.teamsColors[teamName]
    }
    
    async getDataSet(group, widget) {
        try {
            const key = `./data/${widget}/${widget}_${group}.json`
            const dataPromise = dataSets[key]
            const data = await dataPromise()
            return data.default
        } catch (e) {
            return null
        }
    }


    async getFinalDataSet( widget) {
        try {
            const key = `./data/${widget}/${widget}.json`
            const dataPromise = dataSets[key]
            const data = await dataPromise()
            return data.default
        } catch (e) {
            return null
        }
    }

    dict() {
        return ReportsDictionary
    }

    getLimitByProp( propName ){
        const maxs = {
            faceoff_win: 100,
            hit: 80,
            giveaway: 30,
            takeaway: 30,
            penalty: 15,
        }

        return maxs[propName]
    }


    getRoundGroups(roundIdx) {
        return ReportsDictionary['groups_round_' + roundIdx]
    }

    checkGroupId(groupId) {
        const teams = groupId.split('-');
        const a = teams[0];
        const b = teams[1];

        const teamA = a.charAt(0).toUpperCase() + a.slice(1);
        const teamB = b.charAt(0).toUpperCase() + b.slice(1);

        let found = false;
        let key = ''

        const listGroups = this.dict().groups

        if (listGroups.includes(`${teamA}-${teamB}`)) {
            found = true;
            key = `${teamA}-${teamB}`
        } else if (listGroups.includes(`${teamB}-${teamA}`)) {
            found = true;
            key = `${teamB}-${teamA}`
        }

        return {found, key};

    }

    async getSerieNumGames(groupId, asArray = false) {
        const dataSet = await this.getDataSet(groupId, 'widget-group-teams')
        if (asArray) {
            const x = dataSet.games.length
            return Array.from({length: x}, (_, k) => k + 1)
        } else {

            return dataSet.games.length
        }
    }

    getAssetsPath(imageName) {
        return this.domain + '/data/images/' + imageName
    }


    raw(obj) {
        return JSON.parse(JSON.stringify(obj))
    }

    debounce(func, time) {
        time = time || 80;
        let timer;
        return function (event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, time, event);
        };
    }


    rinkDefaultArea() {
        return {
            rightpoint: null,
            lowrightpoint: null,
            insiderightcircle: null,
            rightslot: null,
            leftslot: null,
            outsiderightcircle: null,
            lowright: null,
            insideleftcircle: null,
            outsideleftcircle: null,
            lowleft: null,
            leftpoint: null,
            lowleftpoint: null,
            centerpoint: null,
            neutralzone: null,
            lowcp: null,
            slot: null,
            highslot: null,
            lowslot: null,
            downlow: null,
        }
    }


}