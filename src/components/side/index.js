import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, isWidthDown} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";
import {compose} from "redux";

const useStyles = makeStyles((theme) => createStyles({
    sidePanelItemsLink: {
        backgroundColor: '#eaeaea', cursor: 'pointer',
        //borderBottom: 'solid 2px #fcb436',
        margin: '2px 0px',
        lineHeight: '40px',
        padding:'4px 8px',
    },
    sidePanelItemsLabel: {
        fontSize: '1rem',
        lineHeight: '2.1rem',
        color: '#fcb436',
        fontWeight: '500',
        marginTop: '16px',
        marginBottom: '16px',
        // borderBottom: 'solid 2px #fcb436',
    },
    link: {
        padding:'16px 16px',
        '&:hover': {
            backgroundColor:'#f6b322'
        }
    }
}));
const SidePanelItemsLabel = (props) => {
    const classNames = useStyles();
    return <div className={classNames.sidePanelItemsLabel}>{props.label}</div>
};
const SidePanelItemLink = (props) => {
    const classNames = useStyles();
    return <div className={classNames.sidePanelItemsLink}>{props.label}</div>
};

export const SidePanel = compose(withWidth())(
    (props) => {

    const xs = isWidthDown('xs', props.width);
    const classNames = useStyles();

    if(xs) { return null; }
    return <div
        style={{
            minWidth: '200px',
            maxWidth:'200px',
            marginLeft: '36px',
        }}
    >
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Card>

                    <List
                        subheader={
                            <ListSubheader
                                component="div"
                            >
                                Informacie
                            </ListSubheader>}
                    >
                        <ListItem button>
                            <Typography>
                                Novinky
                            </Typography>
                        </ListItem>
                        <ListItem button>
                            <Typography>
                                Archiv
                            </Typography>
                        </ListItem>
                    </List>


                </Card>
            </Grid>

            <Grid item xs={12}>
                <Card>

                    <List
                        subheader={
                            <ListSubheader
                                component="div"
                            >
                                Sachy
                            </ListSubheader>}
                    >
                        {
                            [
                                'Zahraj si',
                                'Sachove videa',
                                'Nasi Sachisti',
                                'Historia klubu',
                                'Odkazy'
                            ].map(link => <ListItem button>
                                <ListItemText primary={link}/>
                            </ListItem>)
                        }

                    </List>


                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>

                    <List
                        subheader={
                            <ListSubheader
                                component="div"
                            >
                                OMD Dystro Ope-net
                            </ListSubheader>}
                    >
                        {
                            [
                                'INFO',
                                '2018',
                                '2017',
                                '2016'
                            ].map(link => <ListItem button>
                                <ListItemText primary={link}/>
                            </ListItem>)
                        }

                    </List>


                </Card>
            </Grid>

            <Grid item xs={12}>
                <Card>

                    <List
                        subheader={
                            <ListSubheader
                                component="div"
                            >
                                Sponzori
                            </ListSubheader>}
                    >
                        {
                            [

                            ].map(link => <ListItem button>
                                <ListItemText primary={link}/>
                            </ListItem>)
                        }

                    </List>


                </Card>
            </Grid>

        </Grid>







    </div>
});