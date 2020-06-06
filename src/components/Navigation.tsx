import React, {FunctionComponent} from "react";
import NavigationItem, {LinkEntity, LinkItem, NavigationEntity} from "../utils/types/ItemType";
import {Button, Grid, List, ListItem, ListItemText} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const getNavigationItemEntity : (arg0: NavigationItem) => NavigationEntity = (navigationItem) => {
    return navigationItem.entity;
}
const getLinks : (arg0: NavigationItem) => LinkItem[] | false = (navigationItem) => {
    return navigationItem.entity && navigationItem.entity.elements;
}
const getLinkEntities : (arg0: NavigationItem) => LinkEntity[] | false = (navigationItem) => {

    const linkEntities : LinkEntity[] =
        navigationItem.entity &&
        navigationItem.entity.elements &&
        navigationItem.entity.elements.map( (link : LinkItem) => link.entity )
    ;
    return linkEntities;
}



const LinkEntityComponent : React.FunctionComponent<LinkEntity> = (props) => {
    return <Button>{
        props.title
    }</Button>
}

export const TopNavigationComponent : React.FunctionComponent<NavigationItem> = (props) => {

    const linkEntities : LinkEntity[] | false = getLinkEntities(props);

    return <Grid
        container
        direction={"row"}
    >{
        linkEntities &&
        linkEntities.map(
            (entity : LinkEntity) => <LinkEntityComponent
                key={entity.id}
                {...entity}
            />
        )
    }</Grid>
}

export const DrawerNavigationComponent : React.FunctionComponent<NavigationItem> = (props) => {

    const navigationEntity : NavigationEntity | false = getNavigationItemEntity(props);
    const linkEntities : LinkEntity[] | false = getLinkEntities(props);

    return <List>{
        linkEntities &&
        linkEntities.map(
            (entity : LinkEntity) => <ListItem button key={entity.id}>
                <ListItemIcon><HomeIcon/></ListItemIcon>
                <ListItemText
                    primary={entity.title}
                />
            </ListItem>
        )
    }</List>
}