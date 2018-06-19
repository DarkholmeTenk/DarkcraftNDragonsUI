import Config from '../Config.js'

var cachedML = null
const cachedData = {}
const cachedSheets = {}

class API{
    requestMonsterNames() {
        if(!cachedML)
            cachedML = window.fetch(Config.url +"/sheet/getMonsterNames")
                .then(r=>r.json());
        return cachedML
    }

    requestMonsterData(name) {
        if(cachedData[name])
            return cachedData[name]
        else
        {
            cachedData[name] = window.fetch(Config.url +"/sheet/getMonster?name="+name)
                .then(r=>r.json())
                .then(j=>{
                    console.log(j)
                    return j
                })
            return cachedData[name]
        }
    }

    requestCombatSetList() {
        return window.fetch(Config.url + "/combat/getAllCombats")
            .then(r=>r.json())
    }

    requestCombatSet(id) {
        return window.fetch(Config.url + "/combat/get?name="+id)
            .then((r)=>r.json())
            .then((r)=>{
                r.actors.forEach((v,k)=>v.key=k)
                return r
            })
    }

    saveCombatSet(set) {
        console.log(set)
        return window.fetch(Config.url + "/combat/save", {
                body: JSON.stringify(set),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
            })
            .then((r)=>r.json())
    }

    requestQuickSheets() {
        return window.fetch(Config.url + "/sheet/getQuickSheets")
            .then(r=>r.json())
    }

    saveQuickSheet(sheet) {
        console.log(sheet)
        return window.fetch(Config.url + "/sheet/saveQuickSheet", {
                body: JSON.stringify(sheet),
                headers: { 'content-type': 'application/json' },
                method: 'POST'
            })
            .then((r)=>r.json())
    }

    requestSheet(type, id) {
        if(!cachedSheets[type])
            cachedSheets[type] = {}
        if(!cachedSheets[type][id]) {
            cachedSheets[type][id] = window.fetch(Config.url+"/sheet/getSheet?type="+type+"&id="+id)
                .then((r)=>r.json())
        }
        return cachedSheets[type][id]
    }
}

export default API