import {useHistory} from "react-router-dom";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core";
import {links} from "../../utils/mock";
const useStyles = makeStyles((theme) => createStyles({

    link: {
        padding:'16px 16px',
        '&:hover': {
            backgroundColor:'#f6b322'
        }
    }
}));
export const TopBar = (props) => {
    const classNames = useStyles();

    return <div >
        <div className={classNames.topBar} style={{backgroundColor: '#082962', color: 'white'}}>
            <div style={{display:'flex', margin:'0 auto', maxWidth: '1000px', padding:'16px 16px' }}>
                <b>SachOMD, Motto</b>
                <div style={{flexGrow: 1}}></div>
                <span>EN / SK</span>
            </div>
        </div>
        <div className={classNames.topBar}
             style={{backgroundColor: '#7db7e1', color:'#082962'}}>
            <div style={{display:'flex', margin:'0 auto', maxWidth: '1032px' }}>
                {
                    links.map(
                        link => <TopLink link={link}/>
                    )
                }


                <div style={{flexGrow: 1}}></div>
                <span>HLADAJ</span>
            </div>
        </div>

    </div>
};
const TopLink = (props) => {
    let history = useHistory();
    const classNames = useStyles();
    return <div
        onClick={ () => {
            const link = props.link.split(' ').join('_');
            history.push(link);
        } }
        className={classNames.link}
        style={{

            cursor: 'pointer',
        }}
    >
        {props.link || ''}
    </div>
        ;
};
