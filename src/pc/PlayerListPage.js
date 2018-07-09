import React, {Component} from 'react'
import { withStyles, IconButton, Button, TextField, Typography, List, ListItem } from '@material-ui/core';
import API from '../api/API';
import PlayerSheet from './PlayerSheet';
import MyModal from '../helper/MyModal';
import PlayerList from './PlayerList';

const api = new API()

const style = theme=>({
    root:{},
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
})

class PlayerListPage extends Component {
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

    onCreateClose() {
        if(!this.state.isCreating)
            this.setState({createOpen:false})
    }

    setCreateName(n) {
        this.setState({createName:n})
    }

    createClick() {
        if(this.state.createName != "")
        {
            this.setState({isCreating:true})
            api.saveQuickSheet({name:this.state.createName})
                .then(d=>this.props.history.push("/players/id/"+d.id))
        }
    }

    render() {
        const c = this.props.classes
        return <div className={c.root} >
            Player Sheets:
            <Button color='primary' variant='fab' className={c.fab} onClick={()=>this.setState({createOpen:true})}>
                <i className='material-icons'>create</i>
            </Button>
            <MyModal open={this.state.createOpen} onClose={()=>this.onCreateClose()}>
                <Typography variant='title'>Create Character</Typography>
                <TextField label='Character Name' id='name' value={this.state.createName} onChange={(e)=>this.setCreateName(e.target.value)} />
                <Button color='primary' variant='fab' className={c.fab} onClick={()=>this.createClick()}>
                    <i className='material-icons'>check</i>
                </Button>
            </MyModal>
            <PlayerList button={p=><Button color='secondary' onClick={()=>this.props.history.push("/players/id/"+p.id)}>Edit</Button>} />
        </div>
    }
}

export default withStyles(style)(PlayerListPage)