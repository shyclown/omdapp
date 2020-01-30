import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core";
const useStyles = makeStyles((theme) => createStyles({

    bottomBar: {
        padding: '16px 8px'
    },

}));

export const BottomBar = (props) => {
    const classNames = useStyles();
    return <div className={classNames.bottomBar}>Footer</div>
}
