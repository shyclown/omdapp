import React, {Component, ComponentProps, createRef, ReactChild} from "react";
import {ArticleEntity, Item} from "../../utils/types/ItemType";

import {compose} from "redux";
import withEntityData from "./withEntityData";
import {Card, CardContent, CardHeader, Button, Toolbar} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import Spacer from "../Space";
import {Router, withRouter,} from "react-router";
import createLink from "../../utils/greateLink";
import {UniversalBackButton} from "../../universal/UniversalBackButton";
import { ChevronRight } from "@material-ui/icons";
import moment from "moment";
import { LocalLinkItem, ExternalLinkItem, LocalItem } from "./ArticleItem";
import ReactDOM from "react-dom";
import store from "../../utils/redux/store";
import {Provider} from "react-redux";

import history from  "./../../utils/history";

export interface ArticleItem extends Item {
    entity_type: 'article';
    entity: ArticleEntity;
}

interface IProps extends ComponentProps<any>{
    item: ArticleItem,
    single?: boolean | undefined,
    page?: boolean | undefined,
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
        this.attachCustomItemContent(this.content);
    }

    attachCustomItemContent = (root: any) => {
        const customItems = root.current.getElementsByClassName('custom');
        const goLink = (link:string) => this.props.history.push(link);
        for (let item of customItems) {
            item.setAttribute('contenteditable', "false");



            if (item.dataset.elementType === 'external') {
                ReactDOM.render(
                    <Router history={history}>
                        <Provider store={store}>
                            <ExternalLinkItem wrapper={item} goLink={goLink} />
                        </Provider>
                    </Router>,
                    item
                );
            } else {
                ReactDOM.render(
                    <Router history={history}>
                        <Provider store={store}>
                            <LocalLinkItem wrapper={item} goLink={goLink}/>
                        </Provider>
                    </Router>,
                    item
                );
            }
        }
    }

    shouldComponentUpdate(
        nextProps: Readonly<IProps>,
        nextState: Readonly<any>,
        nextContext: any
    ): boolean {
        return true
    }

    render() {
        const {item, history, single, page} = this.props;
        const {perexContent} = this.state;
        const desc = item.entity.description ? item.entity.description : perexContent;
        console.log(single)
        const displayText = !single ? desc : item.entity.text
        return(
            <div>

                {
                    single && !page && <Toolbar
                        disableGutters
                        style={{marginBottom:'8px'}}
                        variant={'dense'}
                    >
                        <UniversalBackButton/>
                    </Toolbar>
                }

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
                            {moment(item.created_at).format('D.M.YYYY H:mm')}
                            <Spacer/>
                            <Button onClick={()=>{
                                history.push(
                                    createLink('/item/'+item.entity_type+'/'+item.id)
                                )
                            }}>
                                Celý článok <ChevronRight/>
                            </Button>
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