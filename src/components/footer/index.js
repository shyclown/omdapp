import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";

import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Tab from "@material-ui/core/Tab";


const useStyles = makeStyles((theme) => createStyles({

    bottomBar: {
        padding: '16px 8px'
    },
    root: {
        flexGrow: 1,
        maxWidth: 500,
    },

}));

export const BottomBar = (props) => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return <Paper square className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
                aria-label="icon label tabs example"
            >
                <Tab icon={<PhoneIcon />} label="Sach" />
                <Tab icon={<FavoriteIcon />} label="Novinky" />
                <Tab icon={<PersonPinIcon />} label="More" />
            </Tabs>
        </Paper>

}
