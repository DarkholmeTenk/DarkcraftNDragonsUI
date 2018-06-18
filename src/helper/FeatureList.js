import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Feature from './Feature.js'

const style = theme =>({
    main: {},
    list: {},
    listItem: {},
    feature: {}
})

class FeatureList extends Component {
    render() {
        let classes = this.props.classes
        let x = this.props.data.map((x,i)=><ListItem className={classes.listItem} key={i}>
                <Feature data={x} classes={{main:classes.feature}}/>
            </ListItem>)
        return <div className={classes.main}>
            <Typography variant='title' >{this.props.name}</Typography>
            <List className={classes.list}>
                {x}
            </List>
        </div>
    }
}

export default withStyles(style)(FeatureList)