import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import API from '../api/API';
import { Modal, Paper} from '@material-ui/core';

const style = theme=>({
    paper: {
        position: 'absolute',
        left:'50%',
        top:'50%',
        minWidth: theme.spacing.unit * 50,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        transform: 'translate(-50%, -50%)'
    }
})

const api = new API()

class MyModal extends Component {

    render() {
        let c = this.props.classes
        return <Modal {...this.props}>
            <Paper className={c.paper} >
                {this.props.children}
            </Paper>
        </Modal>
    }
}

export default withStyles(style)(MyModal)