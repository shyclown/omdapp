import React from 'react';
import {CardContent, CardHeader, withStyles, withWidth} from "@material-ui/core";
import {compose} from "redux";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import LoremIpsum from "../utils/lorem";


const styles = theme => ({

});
const ArticleContent = (props) => {
    return <Typography
        variant="body2"
        component="p"
    >
        <LoremIpsum sentences={props.sentences}/>
    </Typography>
};
class Article extends React.Component{
    render(){
        const image = true;
        return <Card elevation={0}>
                <div style={{display:"flex", flexDirection: 'row', flexGrow:1}}>
                    <div style={{
                        backgroundColor:'gray',
                        minWidth:"250px",
                        minHeight: "200px",
                    }}>
                        Image
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%'
                        }}
                    >
                        <CardContent style={{flexGrow:1}}>
                            <iframe width="1137" height="600" src="https://embed.chessclub.com/"
                                    frameBorder="0">
                            </iframe>
                            <Typography variant={'h5'} style={{fontWeight: 500}}>Header</Typography>
                            <Typography variant={'subtitle1'} style={{fontWeight: 500}} color={'secondary'}>Header</Typography>
                            <ArticleContent sentences={Math.floor(Math.random()*5 )}/>
                        </CardContent>
                        <CardActions>
                            <div style={{flexGrow: 1}}/>
                            <Button
                                color={"primary"}
                                variant={'text'}
                                size={'small'}
                            >
                                Celý článok
                            </Button>
                        </CardActions>
                    </div>
                </div>
            </Card>
    }
}

export default compose(
    withWidth(),
    withStyles(styles)
)(Article);
