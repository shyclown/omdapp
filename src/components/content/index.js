import React, {useEffect} from "react";
import LoremIpsum from "../../utils/lorem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, isWidthDown, withWidth} from "@material-ui/core";
import {SidePanel} from "../side";

import bg from "../../assets/images/figurky_clipped.jpg";
import Typography from "@material-ui/core/Typography";
import {compose} from "redux";
import Article from "../entities/Article";
import withEntityData from "../entities/withEntityData";
import Gallery from "../entities/Gallery";
import {Page} from "../entities/Page";

const useStyles = makeStyles((theme) => createStyles({
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

}));

export const Content =  compose(withWidth())(
    (props) => {

    const classNames = useStyles();
    const xs = isWidthDown('xs', props.width);

    useEffect(()=>{
        console.log(props);
    });

    const pageItem =  props.linkItem && props.linkItem.elements && props.linkItem.elements[0];

    return <div className={classNames.content}>
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
                    paddingLeft:'16px',
                    fontSize: '3rem',
                    fontWeight: '500',
                    color: 'white'
                }}
                >
                    <Typography variant={xs ? 'h3' : 'h2'}>
                        {
                            props.linkItem &&
                            props.linkItem.entity &&
                            props.linkItem.entity.title || "Vitaj"
                        }
                    </Typography>
                </div>
            </div>
        </div>
        <div style={{display: 'flex', margin: '0 auto', maxWidth: '1000px', padding: '8px'}}>

                {
                    pageItem && <Page pageItem={pageItem} itemId={pageItem.id}/>
                }

            <SidePanel/>
        </div>

    </div>
});
