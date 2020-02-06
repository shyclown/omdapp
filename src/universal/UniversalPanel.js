import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { compose } from 'redux';
import classnames from 'classnames'

import {Paper} from '@material-ui/core';


const styles = theme => ({

    root:{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflowY: 'hidden',
    },

    xs:{
        height:'auto',
        overflowY:'auto',
    },

    innerToolbar:{
        width:'100%',
        position: 'static',
        //backgroundColor: style.palette.faded[200],
        color: '#000',
        borderRadius: 0,
        zIndex: 1,
    },

    panelContentRoot:{
        margin: 0,
        borderRadius: 0,
        height: '100%',
        width: '100%',
        overflowY: 'auto',
        overflowX: 'hidden', /* fix scroll bug - some elements with ripple cause scrollbar to appear*/
        position: 'relative',
        zIndex: 0,
    },
});


class UniversalPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    renderTopAppBar = (content) => {
        const { classes } = this.props;
        return(
            <Paper elevation={3} className={ classnames(
                classes.innerToolbar,
                classes.topToolbar
            ) } >
                { content || null }
            </Paper>
        )
    };
    renderPanelContent = (content, withToolbarTop ) => {
        const { classes }  = this.props;
        return(
            <Paper elevation={0} style={{backgroundColor: this.props.contentBackgroundColor || ""}} className={ classnames(
                classes.panelContentRoot,
                !withToolbarTop  && classes.withoutSideToolbar,
            ) }>
                { content || null }
            </Paper>
        );
    };

    renderFooter = (content) => {
        const { classes } = this.props;
        return(
            <Paper elevation={3} className={ classnames(
                classes.innerToolbar,
                classes.bottomToolbar
            )} >
                { content || null }
            </Paper>
        )
    };

    render(){
        const {
            classes,
            toolbar,
            content,
            footer,
            singlePanel,
            minWidth
        } = this.props;

        return(
            <div className={ classnames(
                minWidth,
                classes.root,
                (isWidthDown('xs', this.props.width ) && !singlePanel) && classes.xs
            ) } >
                { toolbar && this.renderTopAppBar( toolbar ) }
                { content && this.renderPanelContent( content, true ) }
                { footer && this.renderFooter( footer ) }
            </div>
        );
    }
}

UniversalPanel.propTypes = {
    classes: PropTypes.object.isRequired,
    toolbar: PropTypes.node,
    content: PropTypes.node,
    footer: PropTypes.node,
    singlePanel: PropTypes.bool
};
export default compose(
    withStyles(styles),
    withWidth()
)(UniversalPanel)
