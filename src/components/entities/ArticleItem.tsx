import {ExitToApp, KeyboardReturn, RateReview, AccountTree, Launch} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import React, {useState} from "react";
import Spacer from "../Space";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {DialogContent, ListItem} from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import {loadItemAction} from "../../utils/redux/actions/items";

const mapStateToProps = (state: any) => ({});

export const LocalItem = compose(
    connect(
        mapStateToProps,
        {loadItemAction}
    ))
(
    (props: any) => {
    const {
        elementType,
        title: initialTitle,
        externalLink,
    } = props.wrapper.dataset;
    // open o creation if link
    const isOpenOnCreate = elementType === 'external' && props.isNew;
    const [edit, setEdit] = useState(isOpenOnCreate);
    const initialContent = initialTitle || "";
    const initialLinkContent = externalLink || "";
    const [title, setTitle] = useState(initialContent);
    const [link, setLink] = useState(initialLinkContent);


    // const [placeholder] = useState(new thePlaceholder(props.wrapper));
    // const handleMove = () => placeholder.create();

    return (
        <React.Fragment>
            <Card style={{padding:'4px', margin:'4px 0px'}}>
                { props.renderItem && props.renderItem() }
                <ListItem disableGutters button>
                <Grid
                    container
                    direction={'row'}
                    style={{
                        alignItems: 'center'
                    }}
                >
                    {
                        elementType === 'external' ?
                            <ExitToApp style={{
                                color: "#af3e22",
                                marginLeft:"8px"
                            }}/>
                            :
                            <AccountTree
                                color={'primary'}
                                style={{marginLeft:'8px'}}
                            />
                    }
                    <Typography
                        style={ elementType !== 'external' ? {
                            marginLeft:'8px',
                            padding:'4px'
                        }: {
                            color: "#af3e22",
                            marginLeft:'8px',
                            padding:"4px"
                        }}
                    >
                        {elementType}
                        {title}
                    </Typography>
                    <Spacer/>

                    <IconButton
                        style={{marginRight:'4px'}}
                        size={'small'}
                        onClick={() => setEdit(true)}
                    >
                        <Launch/>
                    </IconButton>

                </Grid>
                </ListItem>
            </Card>
        </React.Fragment>
    );
})

export const LocalLinkItem = (props: any) => {
    return (<LocalItem wrapper={props.wrapper} renderItem={()=>{}} />);
}
export const ExternalLinkItem = (props: any) => {
    return (<LocalItem wrapper={props.wrapper} />);
}