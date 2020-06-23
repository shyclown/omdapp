import React, {Component, ComponentProps} from "react";
import {ArticleEntity, Item} from "../../utils/types/ItemType";

import {compose} from "redux";
import withEntityData from "./withEntityData";
import {Card, CardContent, CardHeader} from "@material-ui/core";

export interface ArticleItem extends Item {
    entity_type: 'article';
    entity: ArticleEntity;
}

interface IProps extends ComponentProps<any>{
    item: ArticleItem,
    loadItemAction?: (id?: any) => Promise<any>;
}

class Article extends Component<IProps, any> {

    shouldComponentUpdate(
        nextProps: Readonly<IProps>,
        nextState: Readonly<any>,
        nextContext: any
    ): boolean {
        return true
    }

    render() {
        const {item} = this.props;
        return(
            <div>
                <Card elevation={0} >
                    <CardHeader title={item.entity.name}/>
                    <CardContent>
                        <div dangerouslySetInnerHTML={{__html: item.entity.text}} />
                    </CardContent>
                </Card>
            </div>
        );
    }
}



export default compose(
    withEntityData
)(Article);