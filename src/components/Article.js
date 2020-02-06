import React from 'react';
import {CardContent, CardHeader, withStyles, withWidth} from "@material-ui/core";
import {compose} from "redux";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
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
        return <Card>


                        <div style={{display:"flex", flexDirection: 'row', flexGrow:1}}>
                            <div style={{
                                backgroundColor:'gray',
                                minWidth:"250px",
                                minHeight: "200px",




                            }}>AAA</div>

                            <div style={{flexGrow: 1}}>
                                <CardHeader
                                    disableTypography={true}
                                    title={<Typography variant={'h5'} style={{fontWeight: 500}}>Header</Typography>}
                                    subheader={<Typography variant={'subtitle'} style={{fontWeight: 500}} color={'secondary'}>Subheader</Typography>}
                                />
                                <Divider/>
                                <CardContent>
                                <ArticleContent sentences={Math.floor(Math.random()*5 )}/>
                                </CardContent>
                                <CardActions>
                                    <div style={{flexGrow: 1}}/>
                                    <Button color={"primary"}>Cely Clanok ></Button>
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
