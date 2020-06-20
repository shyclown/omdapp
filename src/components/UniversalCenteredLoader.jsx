import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
    root:{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
};

class UniversalCenteredLoader extends Component {
    render(){
        const { classes } = this.props;
        return( <div className={ classes.root } ><CircularProgress /></div> );
    }
}

UniversalCenteredLoader.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default compose( withStyles(styles) )(UniversalCenteredLoader)