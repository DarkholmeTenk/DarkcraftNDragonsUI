import Config from '../Config.js'


const cachedData = {}

class API{
    requestMonsterNames() {
        return window.fetch(Config.url +"/sheet/getMonsterNames")
            .then(r=>r.json());
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
        console.log("RCSL")
        return window.fetch(Config.url + "/combat/getAllCombats")
            .then(r=>r.json())
    }

    requestCombatSet(id) {
        return window.fetch(Config.url + "/combat/get?name="+id)
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
}

export default API