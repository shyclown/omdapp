import React, {FunctionComponent} from "react";
import NavigationItem, {LinkEntity, LinkItem, NavigationEntity} from "../../utils/types/ItemType";

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
    return <div>{
        props.title
    }</div>
}

const NavigationComponent : React.FunctionComponent<NavigationItem> = (props) => {

    const linkEntities : LinkEntity[] | false = getLinkEntities(props);

    return <div>{
        linkEntities &&
        linkEntities.map(
            (entity : LinkEntity) => <LinkEntityComponent {...entity}/>
        )
    }</div>
}