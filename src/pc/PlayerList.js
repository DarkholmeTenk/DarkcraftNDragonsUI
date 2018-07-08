import React, {Component} from 'react'
import { withStyles, IconButton, Button } from '@material-ui/core';
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
            createOpen:false
        }
    }

    componentWillMount() {
        api.requestQuickSheets()
            .then(sheets=>this.setState({players:sheets}))
    }

    onCreateClose() {
        this.setState({createOpen:false})
    }

    render() {
        const c = this.props.classes
        return <div className={c.root} >
            Player Sheets:
            <Button color='primary' variant='fab' className={c.fab} onClick={()=>this.setState({createOpen:true})}>+</Button>
            <MyModal open={this.state.createOpen} onClose={()=>this.onCreateClose()}>This is a modal</MyModal>
            {this.state.players.map(p=><PlayerSheet key={p.id} sheet={p}/>)}
        </div>
    }
}

export default withStyles(style)(PlayerList)