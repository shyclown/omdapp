import {ExitToApp, KeyboardReturn, RateReview, AccountTree, Launch, Description, Image} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import React, {useState} from "react";
import Spacer from "../Space";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {ListItem} from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import {loadItemAction} from "../../utils/redux/actions/items";
import ImageContent from "./Image";
import {useRouteMatch, withRouter} from "react-router";
import createLink from "../../utils/greateLink";

const mapStateToProps = (state: any) => ({});

const LocalItemFC = (props: any) => {
    const {
        elementType,
        elementFileType,
        title: initialTitle,
        externalLink,
        elementId
    } = props.wrapper.dataset;

    console.log(props.wrapper);

    // open o creation if link
    const isOpenOnCreate = elementType === 'external' && props.isNew;
    const [edit, setEdit] = useState(isOpenOnCreate);
    const initialContent = initialTitle || "";
    const initialLinkContent = externalLink || "";
    const [title, setTitle] = useState(initialContent);
    const [link, setLink] = useState(initialLinkContent);

    return (
        <React.Fragment>
            <Card
                elevation={0}
                style={{
                    padding:'4px',
                    margin:'8px 0px',
                    backgroundColor:'#EAEAEA'
                }}
            >
                {
                    props.renderItem &&
                    props.renderItem()
                }
                {
                    ['png', 'jpg', 'jpeg'].includes(elementFileType) ?
                    <ImageContent itemId={elementId} size={800}/> :
                    null
                }
                <ListItem
                    disableGutters
                    button
                    onClick={() => {
                        props.goLink('/item/'+elementType+'/'+elementId)
                    }}
                >
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
                        : elementType === 'file' ?
                            ['png', 'jpg', 'jpeg'].includes(elementFileType) ?
                            <Image
                                color={'primary'}
                                style={{marginLeft:'8px'}}
                            />
                            :
                            <Description
                                color={'primary'}
                                style={{marginLeft:'8px'}}
                            />
                        :
                        <AccountTree
                            color={'primary'}
                            style={{marginLeft:'8px'}}
                        />
                    }
                    <Typography
                        style={
                            elementType !== 'external' ? {
                                marginLeft:'8px',
                                padding:'4px'
                            } : {
                                color: "#af3e22",
                                marginLeft:'8px',
                                padding:"4px"
                            }
                        }
                    >
                        {elementType}
                        {elementId}
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
}

export const LocalItem = compose(
    withRouter,
    connect(
        mapStateToProps,
        {loadItemAction}
    )
)(LocalItemFC) as React.FunctionComponent<{
    wrapper: any,
    renderItem?:any,
    goLink?: (atr: string) => any
}>;

export const LocalLinkItem = (props: any) => {
    return <LocalItem
        wrapper={props.wrapper}
        goLink={props.goLink}
        renderItem={()=>{}}
    />;
}
export const ExternalLinkItem = (props: any) => {
    return <LocalItem
        goLink={props.goLink}
        wrapper={props.wrapper}
    />;
}