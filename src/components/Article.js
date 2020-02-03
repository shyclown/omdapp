import React from 'react';
import {CardContent, CardHeader, withStyles, withWidth} from "@material-ui/core";
import {compose} from "redux";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({

});

class Article extends React.Component{



    render(){
        return <Card>
            <CardHeader title={'Lizard'}/>
            <Divider light />
            <CardContent>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                >
                    Nam eget velit eu sem sodales rutrum vel
                    quis elit Donec rhoncus est id sapien ornare,
                    a tincidunt nunc varius Curabitur auctor
                    rhoncus elementum Donec hendrerit sapien
                    non commodo scelerisque Proin mauris libero,
                    fermentum facilisis dolor at, aliquet tempor
                    lacus Aliquam laoreet tortor at nibh ornare,
                    vel luctus justo pharetra Aenean in ipsum ante
                    Praesent tincidunt, mi a sagittis sagittis,
                    nulla ipsum feugiat urna, sed rutrum ipsum
                    elit porta neque
                </Typography>
            </CardContent>
        </Card>
    }
}

export default compose(
    withWidth(),
    withStyles(styles)
)(Article);