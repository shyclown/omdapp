import React, {Component, ComponentProps, createRef, ReactChild} from "react";
import {ArticleEntity, Item} from "../../utils/types/ItemType";

import {compose} from "redux";
import withEntityData from "./withEntityData";
import {Card, CardContent, CardHeader, Button} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Spacer from "../Space";
import { withRouter,} from "react-router";
import createLink from "../../utils/greateLink";

export interface ArticleItem extends Item {
    entity_type: 'article';
    entity: ArticleEntity;
}

interface IProps extends ComponentProps<any>{
    item: ArticleItem,
    single?: boolean | undefined,
    loadItemAction?: (id?: any) => Promise<any>;
}

class Article extends Component<IProps, any> {

    content = createRef<HTMLDivElement>()

    state = {
        perexContent: ''
    }

    constructor(props:IProps) {
        super(props);
    }

    makePerex = (text: string) => {
        const temp = document.createElement('div');
        const result = document.createElement('div');
        temp.innerHTML = text;
        Array.from(temp.childNodes).forEach((v, i) => {
            if (i < 5) {
                result.appendChild(v);
            }
        })
        this.setState({perexContent: result.innerHTML});
    }

    componentDidMount() {
        this.makePerex(this.props.item.entity.text);
    }

    shouldComponentUpdate(
        nextProps: Readonly<IProps>,
        nextState: Readonly<any>,
        nextContext: any
    ): boolean {
        return true
    }

    render() {
        const {item, history, single} = this.props;
        const {perexContent} = this.state;
        const desc = item.entity.description ? item.entity.description : perexContent;
        console.log(single)
        const displayText = !single ? desc : item.entity.text
        return(
            <div>
                <Card elevation={0} >
                    <CardHeader title={item.entity.name}/>
                    <CardContent>

                        <div
                            ref={this.content}
                            dangerouslySetInnerHTML={{
                            __html: displayText
                        }} />
                    </CardContent>
                    {
                        item && !single && <CardActions>
                            <Spacer/>
                            <Button onClick={()=>{
                                history.push(
                                    createLink('/item/'+item.entity_type+'/'+item.id)
                                )
                            }}>Celý článok</Button>
                        </CardActions>
                    }
                </Card>
            </div>
        );
    }
}



export default compose(

    withEntityData,
    withRouter
)(Article);