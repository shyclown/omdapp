import React, {Component} from "react";

import {createStyles, isWidthDown, withWidth} from "@material-ui/core";
import {SidePanel} from "../side";

import bg from "../../assets/images/figurky_clipped.jpg";
import Typography from "@material-ui/core/Typography";
import {compose} from "redux";
import {Page} from "../entities/Page";
import {connect} from "react-redux";
import {loadNavigationsAction} from "../../utils/redux/actions/navigations";
import {withRouter} from "react-router";
import {loadItemAction} from "../../utils/redux/actions/items";
import Article from "../entities/Article";
import Gallery from "../entities/Gallery";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => createStyles({
    divider: {
      backgroundColor: theme.color.grey.light,
    },
    content: {
    },
    contentItem: {
        display: 'flex',
        // backgroundColor:'#444',
        margin: '16px 0px'
    },
    contentItemImage: {
        minWidth: '200px',
        backgroundImage: `url(${bg})`,

        marginRight: '24px',
    },
    contentItemDateSeparator: {
        fontWeight: '500',
        display:'flex',
        // backgroundColor: '#81b7df',
        backgroundColor: '#fcb436',
        color:'black',
        padding: '0 8px',
        fontSize: '1rem',
        lineHeight: '2.1rem',
        marginTop: '1rem',
        marginBottom: '1rem',
    },
    contentItemTop: {
        color: '#fcb436',
        fontWeight: '500',
    },
    contentItemInfo: {
        display: 'flex',
        padding: '4px 0px',
        borderBottom: 'solid 2px #fcb436',
        fontWeight: '500',
    },
    contentItemHeader: {
        fontSize: '2rem',
        lineHeight: '2.1rem',
        marginBottom: '1rem',
        marginTop: '0.2rem'
    },

});

class Content extends Component {

    state = {
        itemType: null,
        itemId: null,
        xs: null,
        pageItem: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            itemType: props.match.params.itemType,
            itemId: props.match.params.itemId,
            xs: isWidthDown('xs', props.width),
            pageItem:  props.linkItem && props.linkItem.elements && props.linkItem.elements[0],
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(nextProps.match.params);
        return true;
    }


    render() {

        const {classes, linkItem} = this.props;
        const {xs, itemType, itemId, pageItem} = this.state;

        return <div className={classes.content}>
            <div style={{
                width: '100%',
                height: '250px',
                backgroundSize: 'cover',
                backgroundImage: `url(${bg})`,
                position: 'relative',

            }}>
                <div style={{display: 'flex', margin: '0 auto', maxWidth: '1000px'}}>
                    <div style={{
                        position: 'absolute',
                        bottom: '16px',
                        paddingLeft: '16px',
                        fontSize: '3rem',
                        fontWeight: '500',
                        color: 'white'
                    }}
                    >
                        <Typography variant={xs ? 'h3' : 'h2'}>
                            {
                                linkItem &&
                                linkItem.entity &&
                                linkItem.entity.title ||
                                'Vitaj'
                            }
                        </Typography>
                    </div>
                </div>
            </div>
            <div style={{
                display: 'flex',
                margin: '0 auto',
                maxWidth: '1000px',
                padding: '8px'
            }}>
                <div style={{flexGrow: '1'}}>
                    {!itemType && pageItem && <Page itemId={pageItem.id}/>}
                    {itemType === 'page' && <Page key={itemId} itemId={itemId}/>}
                    {itemType === 'article' && <Article key={itemId} itemId={itemId}/>}
                    {itemType === 'gallery' && <Gallery key={itemId} itemId={itemId}/>}
                </div>

                <SidePanel/>
            </div>

        </div>
    }
};

const mapStateToProps = (state, ownProps) => ({
    navigations: state.navigations.navigations,
    items: state.items.items
});

export default compose(
    withStyles(styles),
    withWidth(),
    withRouter,
    connect(
        mapStateToProps,
        {
            loadNavigationsAction,
            loadItemAction
        }
    )
)(Content);
