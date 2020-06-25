import Dialog from "@material-ui/core/Dialog";
import withWidth, {isWidthDown, WithWidthOptions} from "@material-ui/core/withWidth";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Spacer from "./Space";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import {MenuItem} from "@material-ui/core";

export const ChessDialogs = withWidth()((props: any ) => {
    const [icc, setIcc] = useState(false)
    const [sachcz, setSachcz] = useState(false)

    return <React.Fragment>

        {props.button && <Button onClick={()=>setIcc(true)}>Hraj - ICC</Button>}
        {props.button && <Button onClick={()=>setSachcz(true)}>Hraj - SACHY CZ</Button>}

        {props.menu && <MenuItem onClick={()=>setIcc(true)}>Hraj - ICC</MenuItem>}
        {props.menu && <MenuItem onClick={()=>setSachcz(true)}>Hraj - SACHY CZ</MenuItem>}


            <Dialog onClose={()=>setIcc(false)} open={icc} maxWidth={"xl"} fullScreen={isWidthDown("md", props.width)}>
                <DialogTitle>ICC</DialogTitle>
                <DialogContent>

                    <div style={{
                        maxWidth:"1137px",
                        minWidth:'1137px',
                        height:'600px',
                        padding:'0px',
                        margin:'0px'
                    }} >

                        <iframe style={{width:'100%', padding:'0px', margin:'0px'}}
                                width="600" height="600" src="https://embed.chessclub.com/"
                                frameBorder="0">

                        </iframe>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Spacer/>
                    <Button onClick={()=>setIcc(false)}>Zavrieť</Button>
                </DialogActions>


            </Dialog>
            <Dialog onClose={()=>setSachcz(false)} open={sachcz} maxWidth={"xl"} fullScreen={isWidthDown("md", props.width)}>
                <DialogTitle>Sachy CZ</DialogTitle>
                <DialogContent>

                    <div style={{
                        maxWidth:"1137px",
                        minWidth:'1137px',
                        height:'732px',
                        padding:'0px',
                        margin:'0px'
                    }} >
                        <iframe
                            style={{width:'100%', height:"100%", padding:'0px', margin:'0px'}}
                            src="https://sachy.cz" width="732" height="732" frameBorder="0"
                            scrolling={'no'}
                        ><p>Your browser does not support
                            iframes.</p>
                        </iframe>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Spacer/>
                    <Button onClick={()=>setSachcz(false)}>Zavrieť</Button>
                </DialogActions>
            </Dialog>

    </React.Fragment>
});