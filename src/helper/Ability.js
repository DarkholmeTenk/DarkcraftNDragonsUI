import React, {Component} from 'react'
import str from '../icons/weight-lifting-up.svg'
import dex from '../icons/bullseye.svg'
import con from '../icons/first-aid-kit.svg'
import int from '../icons/smart.svg'
import wis from '../icons/owl.svg'
import cha from '../icons/charm.svg'

class Ability extends Component {
    getImage(type) {
        let t = this.props.type.toLowerCase()
        return Ability.getImage(t)
    }

    render(){
        return <img src={this.getImage()}/>
    }
}

Ability.getImage = function(x) {
    let t = x.toLowerCase();
    if(t === "str" || t === "strength")
        return str;
    if(t === "dex" || t === "dexterity")
        return dex;
    if(t === "con" || t === "constitution")
        return con;
    if(t === "int" || t === "intelligence")
        return int;
    if(t === "wis" || t === "wisdom")
        return wis
    if(t === "cha" || t === "chr" || t === "charisma")
        return cha
}

export default Ability