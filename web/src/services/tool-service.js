import {reactive} from 'vue'
import ReportsDictionary from './tool/reports-dictionary'

const dataSets = import.meta.glob('./data/**/*.json')

export default class ToolService {

    constructor() {
        this._data = reactive({
            state: '', // loading, loaded
        })
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

    dict() {
        return ReportsDictionary
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


}