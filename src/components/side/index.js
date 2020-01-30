import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => createStyles({
    sidePanelItemsLink: {
        backgroundColor: '#eaeaea', cursor: 'pointer',
        //borderBottom: 'solid 2px #fcb436',
        margin: '2px 0px',
        lineHeight: '40px',
        padding:'4px 8px',
    },
    sidePanelItemsLabel: {
        fontSize: '1rem',
        lineHeight: '2.1rem',
        color: '#fcb436',
        fontWeight: '500',
        marginTop: '16px',
        marginBottom: '16px',
        // borderBottom: 'solid 2px #fcb436',
    },
    link: {
        padding:'16px 16px',
        '&:hover': {
            backgroundColor:'#f6b322'
        }
    }
}));
const SidePanelItemsLabel = (props) => {
    const classNames = useStyles();
    return <div className={classNames.sidePanelItemsLabel}>{props.label}</div>
};
const SidePanelItemLink = (props) => {
    const classNames = useStyles();
    return <div className={classNames.sidePanelItemsLink}>{props.label}</div>
};

export const SidePanel = (props) => {
    const classNames = useStyles();
    return <div
        style={{
            minWidth: '200px',
            maxWidth:'200px',
            marginLeft: '36px',
        }}
    >

        <div

        >
            <SidePanelItemsLabel label={'Informacie'}/>
            <SidePanelItemLink label={'Novinky'}/>
            <SidePanelItemLink label={'Archiv'}/>
        </div>

        <div

        >
            <SidePanelItemsLabel label={'Sachy'}/>
            <SidePanelItemLink label={'Zahraj si'}/>
            <SidePanelItemLink label={'Sachove videa'}/>
            <SidePanelItemLink label={'Nasi sachisti'}/>
            <SidePanelItemLink label={'Historia klubu'}/>
            <SidePanelItemLink label={'Odkazy'}/>
        </div>

        <div

        >
            <SidePanelItemsLabel label={'OMD Dystro Ope-net'}/>
            <SidePanelItemLink label={'INFO'}/>
            <SidePanelItemLink label={'2018'}/>
            <SidePanelItemLink label={'2017'}/>
            <SidePanelItemLink label={'2016'}/>
        </div>

        <div>
            <SidePanelItemsLabel label={'Sponzori'}/>
        </div>

    </div>
}