import LoremIpsum from "../../utils/lorem";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core";
import {SidePanel} from "../side";
import Article from "../../components/Article";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useTheme from "@material-ui/core/styles/useTheme";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";


const useStyles = makeStyles((theme) => createStyles({
    divider: {
      backgroundColor: theme.palette.secondary.light,
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
        <div style={{display:'flex', margin:'0 auto', maxWidth: '1000px',padding:'8px'}}>
            <ContentWrap/>
            <SidePanel/>
        </div>

    </div>
};

export const ContentWrap = () => {
    const classNames = useStyles();
    return (
        <div style={{
            flexGrow: 1,
            }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} >
                  <Article/>
            </Grid>
              <Grid item xs={12} >
              <Card className={classNames.divider}>
                  <Toolbar variant={'dense'}>
                      28.1.2020
                  </Toolbar>
              </Card>

              </Grid>
              <Grid item xs={12}>
                  <Article/>
              </Grid>
              <Grid item xs={12}>
                  <Article/>
              </Grid>
              <Grid item xs={12}>
                  <Article/>
              </Grid>

          </Grid>


        </div>
    );
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
