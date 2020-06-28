import React, {useEffect, useState} from "react";
import NavigationItem, {LinkEntity, LinkItem} from "../utils/types/ItemType";
import {Button, Grid, List, ListItem, ListItemText} from "@material-ui/core";
import {withRouter, RouteComponentProps} from "react-router";
import createLink from "../utils/greateLink";
import ListSubheader from "@material-ui/core/ListSubheader";
import useTheme from "@material-ui/core/styles/useTheme";
import navigations from "../utils/redux/reducers/navigations";


export const getLinkEntities : (arg0: NavigationItem) => LinkEntity[] | false = (navigationItem: NavigationItem) => {
    const elements : LinkItem[] | undefined = navigationItem && navigationItem.elements;
    const linkEntities : LinkEntity[] = elements && elements.map( (link : LinkItem) => link.entity);
    return linkEntities;
}


const TopNavigation :
    React.FunctionComponent<{ navigation: NavigationItem } & RouteComponentProps> =
    (props) => {

    const linkEntities : LinkEntity[] | false = getLinkEntities(props.navigation);

    const currentPath = props.history.location.pathname;


    return <Grid
        container
        direction={"row"}
    >{
        linkEntities &&
        linkEntities.map(
            (entity : LinkEntity) => {
                const path = '/'+entity.name;

                return <Button
                    style={{marginRight: '8px'}}
                    disableElevation
                    variant={currentPath === path ? "contained" : undefined}
                    color={currentPath === path ? "secondary" : undefined}
                    key={entity.name}
                    onClick={() => props.history.push(createLink('/'+entity.name))}
                >{
                    entity.title
                }</Button>
            }
        )
    }</Grid>
}

export const TopNavigationComponent = withRouter(TopNavigation);

const DrawerNavigation : React.FunctionComponent<{ navigation: NavigationItem } & RouteComponentProps> = (props) => {

    const linkEntities : LinkEntity[] | false = getLinkEntities(props.navigation);
    const theme = useTheme();
    const currentPath = props.history.location.pathname;

    return <List>{
        linkEntities &&
        linkEntities.map(
            (entity : LinkEntity) => {
                const path = '/'+entity.name;
                return <ListItem
                    button
                    style={{
                        backgroundColor: currentPath === path ? theme.palette.secondary.main : ''
                    }}
                    color={currentPath === path ? "secondary" : undefined}
                    onClick={() => props.history.push(createLink('/'+entity.name))}
                    key={entity.id}
                >

                    <ListItemText
                        primary={entity.title}
                    />
                </ListItem>
            }
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


const NavigationTitle : React.FunctionComponent<{ navigations: NavigationItem[] } & RouteComponentProps> = (props) => {

    const [title, setTitle] = useState<string>('')
    const [path, setPath] = useState<string>('')


    useEffect(()=>{
        const currentPath = props.history.location.pathname;
        if (
            (currentPath !== path) && props.navigations?.length > 0
        ) {
            props.navigations.forEach( nav => {
                const links: LinkEntity[] | false = getLinkEntities(nav);
                const found = links && links.find( (link:LinkEntity) => '/'+link.name === currentPath);
                if (found) {
                    setTitle(found.title)
                }
            });
            setPath(currentPath);
        }
    })


    return <span>{
        title
    }</span>
};

export const NavigationTitleComponent = withRouter(NavigationTitle);
