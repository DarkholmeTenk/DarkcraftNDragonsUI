import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

const style = theme=>{
    root: {}
}



class CreateCombat extends Component {
    constructor() {
        super()
        this.state = {
            name: ''
        }
    }

    setName(e) {
        this.setState({name:e.target.value})
    }

    send() {
        this.props.onSubmit(this.state)
    }

    render() {
        return <div>
            <TextField label="Name" value={this.state.name} onChange={(e)=>this.setName(e)} />
            <Button onClick={()=>this.send()}>Send</Button>
            </div>
    }
}

export default withStyles(style)(CreateCombat)