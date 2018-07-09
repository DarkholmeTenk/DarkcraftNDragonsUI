import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import API from '../api/API';
import { Typography, Button, Modal, Paper, List, ListItem } from '@material-ui/core';
import CreateCombat from './CreateCombat';

const style = theme=>({
    root: {},
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    mc:{
        position: 'absolute',
        left:'50%',
        top:'50%',
    },
    paper: {
        position: 'absolute',
        left:'50%',
        top:'50%',
        width: theme.spacing.unit * 50,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        transform: 'translate(-50%, -50%)'
    }
})

const api = new API()

class CombatSetList extends Component {
    constructor() {
        super()
        this.state = {createOpen:false}
    }

    componentDidMount() {
        this.refreshState()
    }

    refreshState() {
        this.setState({'data':null})
        api.requestCombatSetList()
            .then(l=>{console.log(l); return l;})
            .then(l=>this.setState({'data':l}))
    }

    renderSet() {
        const {data} = this.state;
        if(data.length === 0)
            return <div>No combat encounters could be found</div>
        else {
            console.log(data)
            return <List>
                {data.map((i,k)=><ListItem key={k}>{i.name}<Button onClick={()=>this.open(i.id)}>Open</Button></ListItem>)}
                </List>
        }
    }

    addCreateDialog() {
        this.setState({'createOpen':true})
    }

    closeCreateDialog() {
        this.setState({'createOpen':false})
    }

    submitCreate(state) {
        this.closeCreateDialog()
        api.saveCombatSet(state)
            .then(()=>this.refreshState());
    }

    open(id) {
        let urlSoFar = this.props.match.url
        if(!urlSoFar.endsWith("/"))
            urlSoFar = urlSoFar + "/"
        this.props.history.push(urlSoFar+id)
    }

    render() {
        let c = this.props.classes
        if(this.state && this.state.data)
        {
            return <div className={c.root}>
                <Modal aria-labelledby="Create Combat" open={this.state.createOpen} onClose={()=>this.closeCreateDialog()}>
                    <Paper className={c.paper} >
                        <CreateCombat onSubmit={(s)=>this.submitCreate(s)}/>
                    </Paper>
                </Modal>
                <Typography variant='title'>Combat Sets</Typography>
                <Button variant='fab' className={c.fab} color='primary' onClick={()=>this.addCreateDialog()} >+</Button>
                {this.renderSet()}
            </div>
        }
        else
            return <div>LOADING</div>
    }
}

export default withStyles(style)(CombatSetList)