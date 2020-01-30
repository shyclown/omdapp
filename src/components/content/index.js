import LoremIpsum from "../../utils/lorem";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core";
import {SidePanel} from "../side";

const useStyles = makeStyles((theme) => createStyles({
    contentItem: {
        display: 'flex',
        // backgroundColor:'#444',
        margin: '16px 0px'
    },
    contentItemImage: {
        minWidth: '200px',
        backgroundColor: '#888',
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
export const Content = (props) => {
    const classNames = useStyles();
    return <div className={classNames.content}>
        <div style={{width: '100%', height: '250px', backgroundColor:'#555', position:'relative'}}>
            <div style={{display:'flex', margin:'0 auto', maxWidth: '1000px'}}>
                <div style={{
                    position:'absolute',
                    bottom: '0px',
                    fontSize:'3rem',
                    fontWeight:'500',
                    color:'white'}}
                >
                    {props.link === 'Domov' ? 'Vitaj' : props.link}
                </div>
            </div>
        </div>
        <div style={{display:'flex', margin:'0 auto', maxWidth: '1000px'}}>
            <ContentWrap/>
            <SidePanel/>
        </div>

    </div>
};

export const ContentWrap = () => {
  return             <div style={{flexGrow: 1}}>
      <ContentItemDateSeparator date={'28.1.2020'}/>
      <ContentItem/>
      <ContentItem/>
      <ContentItemDateSeparator date={'27.1.2020'}/>
      <ContentItem/>
      <ContentItem hasImage/>
      <ContentItem/>

  </div>
};
export const ContentItem = (props) => {

    const classNames = useStyles();


    return <div className={classNames.contentItem}>
        { props.hasImage && <div className={classNames.contentItemImage}>Content Image</div> }
        <div>

            <div className={classNames.contentItemTop}>Rubrika</div>
            <div>
                <div className={classNames.contentItemHeader}>Header</div>
                <LoremIpsum sentences={8}/>
                <div className={classNames.contentItemInfo}>

                    <div style={{flexGrow: 1}}></div>
                    Cely Clanok >
                </div>
            </div>
        </div>
    </div>;
};

export const ContentItemDateSeparator = (props) => {
    const classNames = useStyles();
    return <div className={classNames.contentItemDateSeparator}>{props.date}</div>
};