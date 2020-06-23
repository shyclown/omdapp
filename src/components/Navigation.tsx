import React, {FunctionComponent} from "react";
import NavigationItem, {LinkEntity, LinkItem, NavigationEntity} from "../utils/types/ItemType";
import {Button, Grid, List, ListItem, ListItemText} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { compose } from "redux";
import {withRouter, RouteComponentProps} from "react-router";
import createLink from "../utils/greateLink";
import ListSubheader from "@material-ui/core/ListSubheader";


const getLinkEntities : (arg0: NavigationItem) => LinkEntity[] | false = (navigationItem: NavigationItem) => {
    const elements : LinkItem[] | undefined = navigationItem && navigationItem.elements;
    const linkEntities : LinkEntity[] = elements && elements.map( (link : LinkItem) => link.entity);
    return linkEntities;
}


const TopNavigation :
    React.FunctionComponent<{ navigation: NavigationItem } & RouteComponentProps> =
    (props) => {

    const linkEntities : LinkEntity[] | false = getLinkEntities(props.navigation);

    return <Grid
        container
        direction={"row"}
    >{
        linkEntities &&
        linkEntities.map(
            (entity : LinkEntity) => <Button
                key={entity.name}
                onClick={() => props.history.push(createLink('/'+entity.name))} >{
                entity.title
            }</Button>
        )
    }</Grid>
}

export const TopNavigationComponent = withRouter(TopNavigation);

const DrawerNavigation : React.FunctionComponent<{ navigation: NavigationItem } & RouteComponentProps> = (props) => {

    const linkEntities : LinkEntity[] | false = getLinkEntities(props.navigation);

    return <List>{
        linkEntities &&
        linkEntities.map(
            (entity : LinkEntity) => <ListItem
                button
                onClick={() => props.history.push(createLink('/'+entity.name))}
                key={entity.id}
            >
                <ListItemIcon>
                    <HomeIcon/>
                </ListItemIcon>
                <ListItemText
                    primary={entity.title}
                />
            </ListItem>
        )
    }</List>
};

export const DrawerNavigationComponent = withRouter(DrawerNavigation);


const SideNavigation : React.FunctionComponent<{ navigation: NavigationItem } & RouteComponentProps> = (props) => {

    const linkEntities : LinkEntity[] | false = getLinkEntities(props.navigation);

    return <List
            subheader={
                <ListSubheader component="div">
                    {
                        props.navigation &&
                        props.navigation.entity &&
                        props.navigation.entity.title
                    }
                </ListSubheader>
            }
    >{
        linkEntities &&
        linkEntities.map(
            (entity : LinkEntity) => <ListItem
                button
                onClick={() => props.history.push(createLink('/'+entity.name))}
                key={entity.id}
            >



                <ListItemText
                    primary={entity.title}
                />
            </ListItem>
        )
    }</List>
};

export const SideNavigationComponent = withRouter(SideNavigation);