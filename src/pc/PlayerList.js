import React, {Component} from 'react'
import { withStyles, IconButton, Button, TextField, Typography, List, ListItem } from '@material-ui/core';
import API from '../api/API';
import PlayerSheet from './PlayerSheet';
import MyModal from '../helper/MyModal';

const api = new API()

const style = theme=>({
    root:{},
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
})

class PlayerList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            players:[],
            createOpen:false,
            createName:""
        }
    }

    componentWillMount() {
        api.requestQuickSheets()
            .then(sheets=>this.setState({players:sheets}))
    }

    getButton(p) {
        if(this.props.button)
            return this.props.button(p)
    }

    render() {
        const c = this.props.classes
        return <div className={c.root} >
            <List>
                {this.state.players.map(p=><ListItem key={p.id}>
                        {p.id} - {p.name}
                        {this.getButton(p)}
                    </ListItem>
                )}
            </List>
        </div>
    }
}

export default withStyles(style)(PlayerList)