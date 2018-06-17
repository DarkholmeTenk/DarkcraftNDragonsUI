import Config from '../Config.js'


const cachedData = {}

class API{
    requestMonsterNames() {
        return window.fetch(Config.url +"/sheet/getMonsterNames")
            .then(r=>r.json());
    }

    requestMonsterData(name) {
        console.log(name)
        if(cachedData[name])
            return cachedData[name]
        else
        {
            cachedData[name] = window.fetch(Config.url +"/debug/getMonster?name="+name)
                .then(r=>r.json())
                .then(j=>{
                    console.log(j)
                    return j
                })
            return cachedData[name]
        }
    }
}

export default API