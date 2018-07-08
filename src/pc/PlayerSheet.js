import React, {Component} from 'react'
import { withStyles } from '@material-ui/core';
import API from '../api/API';

const api = new API()

const style = theme=>({
    root:{}
})

class PlayerSheet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            players:[]
        }
    }

    render() {
        const c = this.props.classes
        return <div className={c.root} >
            {this.props.sheet.name}
        </div>
    }
}

export default withStyles(style)(PlayerSheet)