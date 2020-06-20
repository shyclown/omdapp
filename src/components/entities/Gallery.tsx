import React, {Component, ComponentClass, ComponentProps} from "react";
import {GalleryEntity, Item} from "../../utils/types/ItemType";

import {compose} from "redux";
import withEntityData from "./withEntityData";
import {Card, CardContent, CardHeader} from "@material-ui/core";
import ImageContent from "./Image";
import Grid from "@material-ui/core/Grid";

export interface GalleryItem extends Item {
    entity_type: 'article';
    entity: GalleryEntity;
}

interface IProps extends ComponentProps<any>{
    item: GalleryItem,
    loadItemAction?: (id?: any) => Promise<any>;
}

class Gallery extends Component<IProps, any> {

    shouldComponentUpdate(
        nextProps: Readonly<IProps>,
        nextState: Readonly<any>,
        nextContext: any
    ): boolean {
        return true
    }

    render() {

        const {item} = this.props;

        console.log(item);

        return(<div>
            <Card elevation={0} >
                <CardHeader
                    title={item.entity.title}
                />
                <CardContent>
                    <div style={{
                        display:"grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"
                    }}>
                    {
                        item.elements.map( imageItem => {
                            return <div style={{padding: '8px'}}>
                                <ImageContent
                                    key={imageItem.id}
                                    itemId={imageItem.id}
                                />
                            </div>
                        })
                    }
                    </div>
                </CardContent>
            </Card>
        </div>);
    }
}



export default compose(
    withEntityData
)(Gallery);