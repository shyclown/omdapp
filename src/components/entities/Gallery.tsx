import React, {Component, ComponentProps, createRef} from "react";
import {GalleryEntity, Item} from "../../utils/types/ItemType";
import moment from 'moment';

import {compose} from "redux";
import withEntityData from "./withEntityData";
import {
    Card,
    CardContent,
    CardHeader,
    Dialog,
    IconButton,
    DialogContent,
    DialogActions,
    withStyles,
    createStyles, Button, Toolbar
} from "@material-ui/core";
import ImageContent from "./Image";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";
import CardActions from "@material-ui/core/CardActions";
import Spacer from "../Space";
import createLink from "../../utils/greateLink";
import {withRouter} from "react-router";
import {UniversalBackButton} from "../../universal/UniversalBackButton";


export interface GalleryItem extends Item {
    entity_type: 'article';
    entity: GalleryEntity;
}

interface IProps extends ComponentProps<any>{
    item: GalleryItem,
    loadItemAction?: (id?: any) => Promise<any>;
    single?: boolean | undefined,
    page?: boolean | undefined,
}

const useStyles = createStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 500,
    },
});


class Gallery extends Component<IProps, any> {

    contentRef: React.RefObject<HTMLDivElement>

    state = {
        dialog: false,
        width: 500,
        currentImageIndex: 0,
    }

    constructor(props: IProps) {
        super(props);
        this.contentRef = createRef<HTMLDivElement>()
    }

    componentDidMount() {
        const width = this.contentRef.current && this.contentRef.current.clientWidth;
        this.setState({width: width});
    }

    shouldComponentUpdate(
        nextProps: Readonly<IProps>,
        nextState: Readonly<any>,
        nextContext: any
    ): boolean {
        const width = this.contentRef.current && this.contentRef.current.clientWidth;
        if (this.state.width !== width) {
            this.setState({width: width});
        }
        return true
    }

    toggleDialogAt = (index: number) => () => {
        this.setState({
            dialog: !this.state.dialog,
            currentImageIndex: index
        })
    }

    showIndex = (index: number | false) => () => {
        if (index !== false) {
            this.setState({
                currentImageIndex: index
            })
        }
    }


    render() {

        const {item, single, history} = this.props;

        console.log(item);

        const {
            dialog,
            currentImageIndex
        } = this.state;

        const maxIndex = item.elements.length - 1;
        const nextIndex = currentImageIndex === maxIndex ? false : currentImageIndex + 1;
        const prevIndex = currentImageIndex === 0 ? false : currentImageIndex - 1;
        const renderElements = single ? item.elements : [item.elements[0]];

        return(<div>

                { single && <Toolbar><UniversalBackButton/></Toolbar> }

            <Card elevation={0} >

                <CardHeader
                    title={item.entity.title}
                />
                <CardContent>
                    <div
                        ref={this.contentRef}
                        style={{
                        display:"grid",
                        alignItems:"middle",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))"
                    }}>
                    {
                        renderElements.map( (imageItem, index) => {
                            return imageItem && <div
                                key={imageItem.id}
                                style={{
                                    margin:'8px',
                                    borderRadius: '5px',
                                    display:'table-cell',
                                    verticalAlign:'middle',
                                    textAlign:'center',
                                    width:'calc(100% - 16px)',
                                    overflow:'hidden',
                                }}
                                onClick={this.toggleDialogAt(index)}
                            >
                                <ImageContent itemId={imageItem.id} size={400}/>
                            </div>
                        })
                    }
                    </div>
                </CardContent>
                <Dialog
                    open={dialog}
                    onClose={this.toggleDialogAt(0)}
                    maxWidth={'md'}
                >
                    <DialogContent style={{overflow:'hidden'}}>
                        {
                            item.elements[currentImageIndex] && <ImageContent itemId={item.elements[currentImageIndex].id} size={800}/>
                        }
                    </DialogContent>

                    <DialogActions>
                        <IconButton disabled={prevIndex === false} onClick={this.showIndex(prevIndex)}><ChevronLeft/></IconButton>
                        <IconButton disabled={nextIndex === false} onClick={this.showIndex(nextIndex)}><ChevronRight/></IconButton>
                    </DialogActions>
                </Dialog>
                {
                    item && !single && <CardActions>
                        {moment(item.created_at).format('D.M.YYYY H:mm')}
                        <Spacer/>
                        <Button
                            color={'secondary'}
                            onClick={()=>{ history.push(createLink('/item/'+item.entity_type+'/'+item.id))}}
                        >
                            Celý článok <ChevronRight/>
                        </Button>
                    </CardActions>
                }
            </Card>
        </div>);
    }
}

export default compose(
    withEntityData,
    withStyles(useStyles),
    withRouter,
)(Gallery);