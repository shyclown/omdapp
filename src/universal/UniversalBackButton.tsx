import {withRouter} from "react-router";
import {IconButton} from "@material-ui/core";
import React from "react";
import {ChevronLeft} from "@material-ui/icons";

import * as history from 'history';


export const UniversalBackButton = withRouter((props) => {
    console.log(props);
    return <IconButton onClick={ ()=>props.history.goBack() }><ChevronLeft/></IconButton>
})