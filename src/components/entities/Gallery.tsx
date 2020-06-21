import React, {Component, ComponentClass, ComponentProps, createRef} from "react";
import {GalleryEntity, Item} from "../../utils/types/ItemType";

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
    makeStyles,
    createStyles
} from "@material-ui/core";
import ImageContent from "./Image";
import Grid from "@material-ui/core/Grid";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";
import { getImageSrc } from "../../utils/resources/files";
import CardMedia from "@material-ui/core/CardMedia";
import ShowImage from "./ShowImage";

export interface GalleryItem extends Item {
    entity_type: 'article';
    entity: GalleryEntity;
}

interface IProps extends ComponentProps<any>{
    item: GalleryItem,
    loadItemAction?: (id?: any) => Promise<any>;
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
        console.log(width);
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

        const {item} = this.props;

        const {
            dialog,
            currentImageIndex
        } = this.state;

        const maxIndex = item.elements.length - 1;
        const nextIndex = currentImageIndex === maxIndex ? false : currentImageIndex + 1;
        const prevIndex = currentImageIndex === 0 ? false : currentImageIndex - 1;



        return(<div>
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
                        item.elements.map( (imageItem, index) => {
                            return <div
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
                        <ImageContent itemId={item.elements[currentImageIndex].id} size={800}/>
                    </DialogContent>

                    <DialogActions>
                        <IconButton disabled={prevIndex === false} onClick={this.showIndex(prevIndex)}><ChevronLeft/></IconButton>
                        <IconButton disabled={nextIndex === false} onClick={this.showIndex(nextIndex)}><ChevronRight/></IconButton>
                    </DialogActions>

                </Dialog>
            </Card>
        </div>);
    }
}



export default compose(
    withEntityData,
    withStyles(useStyles)
)(Gallery);