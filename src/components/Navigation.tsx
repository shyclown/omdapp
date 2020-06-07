import React, {FunctionComponent} from "react";
import NavigationItem, {LinkEntity, LinkItem, NavigationEntity} from "../utils/types/ItemType";
import {Button, Grid, List, ListItem, ListItemText} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { compose } from "redux";
import {withRouter, RouteComponentProps} from "react-router";

const getNavigationItemEntity : (arg0: NavigationItem) => NavigationEntity = (navigationItem) => {
    return navigationItem.entity;
}
const getLinkItems : (arg0: NavigationItem) => LinkItem[] | false = (navigationItem) => {
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




const TopNavigation : React.FunctionComponent<NavigationItem & RouteComponentProps> = (props) => {

    const linkEntities : LinkEntity[] | false = getLinkEntities(props);

    return <Grid
        container
        direction={"row"}
    >{
        linkEntities &&
        linkEntities.map(
            (entity : LinkEntity) => <Button
                key={entity.name}
                onClick={() => props.history.push(entity.name)} >{
                entity.title
            }</Button>
        )
    }</Grid>
}

export const TopNavigationComponent = withRouter(TopNavigation);

const DrawerNavigation : React.FunctionComponent<NavigationItem & RouteComponentProps> = (props) => {

    const navigationEntity : NavigationEntity | false = getNavigationItemEntity(props);
    const linkItems : LinkItem[] | false = getLinkItems(props);
    const linkEntities : LinkEntity[] | false = getLinkEntities(props);

    return <List>{
        linkEntities &&
        linkEntities.map(
            (entity : LinkEntity) => <ListItem
                button
                onClick={() => props.history.push(entity.name)}
                key={entity.id}
            >
                <ListItemIcon><HomeIcon/></ListItemIcon>
                <ListItemText
                    primary={entity.title}
                />
            </ListItem>
        )
    }</List>
};

export const DrawerNavigationComponent = withRouter(DrawerNavigation);