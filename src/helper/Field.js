import React, {Component} from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
    div:{
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center'
    },
    img:{
        width: '32px',
        margin: 'auto',
        padding: '2px'
    }
})

class Field extends Component {
    render()
    {
        const style = this.props.classes
        if(this.props.image)
        {
            return <div className={style.div}>
                    <Tooltip title={this.props.desc}> 
                        <img className={style.img} src={this.props.image} alt={this.props.desc} tooltip={this.props.desc} />
                    </Tooltip>
                    {this.props.value}
                </div>
           
        }
    }
}

export default withStyles(style)(Field)