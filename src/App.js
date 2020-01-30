import React from 'react';
import './App.css';
import UniversalPanel from "./components/UniversalPanel";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles} from "@material-ui/core";
import {BrowserRouter as Router, Link, Switch, Route} from "react-router-dom";
import { useHistory } from "react-router-dom";

const LoremIpsum = (props) => {
    const text = '' +
        'Nam eget velit eu sem sodales rutrum vel quis elit. ' +
        'Donec rhoncus est id sapien ornare, a tincidunt nunc varius. ' +
        'Curabitur auctor rhoncus elementum. Donec hendrerit sapien non commodo scelerisque. ' +
        'Proin mauris libero, fermentum facilisis dolor at, aliquet tempor lacus. ' +
        'Aliquam laoreet tortor at nibh ornare, vel luctus justo pharetra. ' +
        'Aenean in ipsum ante. Praesent tincidunt, mi a sagittis sagittis, nulla ipsum feugiat urna, ' +
        'sed rutrum ipsum elit porta neque. Etiam mattis scelerisque erat, ' +
        'in bibendum felis efficitur vestibulum. Curabitur mollis elit ut ipsum vulputate, ' +
        'ac tristique turpis finibus. Donec porttitor sem ut justo posuere dignissim. Vestibulum auctor, ' +
        'justo id dapibus hendrerit, justo ex molestie tellus, vel venenatis nibh diam vitae metus. ' +
        'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. ' +
        'In in sodales mi. Pellentesque tristique pharetra neque, ac molestie urna tincidunt eget.';

    return text.split('.', props.sentences || 1);
};


const useStyles = makeStyles((theme) => createStyles({
    topBar: {
        padding: '0px 0px'
    },
    content: {

    },
    bottomBar: {
        padding: '16px 8px'
    },

    contentItem: {
        display: 'flex',
        // backgroundColor:'#444',
        margin: '16px 0px'
    },
    contentItemImage: {
       minWidth: '200px',
        backgroundColor: '#888',
        marginRight: '24px',
    },
    contentItemDateSeparator: {
        fontWeight: '500',
        display:'flex',
        // backgroundColor: '#81b7df',
        backgroundColor: '#fcb436',
        color:'black',
        padding: '0 8px',
        fontSize: '1rem',
        lineHeight: '2.1rem',
        marginTop: '1rem',
        marginBottom: '1rem',
    },
    contentItemTop: {
        color: '#fcb436',
        fontWeight: '500',
    },
    contentItemInfo: {
        display: 'flex',
        padding: '4px 0px',
        borderBottom: 'solid 2px #fcb436',
        fontWeight: '500',
    },
    contentItemHeader: {
        fontSize: '2rem',
        lineHeight: '2.1rem',
        marginBottom: '1rem',
        marginTop: '0.2rem'
    },
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

const ContentItem = (props) => {

    const classNames = useStyles();


    return <div className={classNames.contentItem}>
        { props.hasImage && <div className={classNames.contentItemImage}>Content Image</div> }
        <div>

            <div className={classNames.contentItemTop}>Rubrika</div>
            <div>
                <div className={classNames.contentItemHeader}>Header</div>
                <LoremIpsum sentences={8}/>
                <div className={classNames.contentItemInfo}>

                    <div style={{flexGrow: 1}}></div>
                    Cely Clanok >
                </div>
            </div>
        </div>
    </div>;
};

const ContentItemDateSeparator = (props) => {
    const classNames = useStyles();
    return <div className={classNames.contentItemDateSeparator}>{props.date}</div>
};

const SidePanelItemsLabel = (props) => {
    const classNames = useStyles();
    return <div className={classNames.sidePanelItemsLabel}>{props.label}</div>
};
const SidePanelItemLink = (props) => {
    const classNames = useStyles();
    return <div className={classNames.sidePanelItemsLink}>{props.label}</div>
};

const links = ['Domov', 'O nas', 'Fotogaleria', 'Sponzori', 'Podoporuju nas', 'Ipca', 'Ssz', 'Odkazy', 'Kontakt'];

function TopBar(props) {
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
}

const Content = (props) => {
    const classNames = useStyles();
    return <div className={classNames.content}>
        <div style={{width: '100%', height: '250px', backgroundColor:'#555', position:'relative'}}>
            <div style={{display:'flex', margin:'0 auto', maxWidth: '1000px'}}>
            <div style={{
                position:'absolute',
                bottom: '0px',
                fontSize:'3rem',
                fontWeight:'500',
                color:'white'}}
            >
                {props.link === 'Domov' ? 'Vitaj' : props.link}
            </div>
            </div>
        </div>
        <div style={{display:'flex', margin:'0 auto', maxWidth: '1000px'}}>
            <div style={{flexGrow: 1}}>
                <ContentItemDateSeparator date={'28.1.2020'}/>
                <ContentItem/>
                <ContentItem/>
                <ContentItemDateSeparator date={'27.1.2020'}/>
                <ContentItem/>
                <ContentItem hasImage/>
                <ContentItem/>

            </div>
            <div
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
        </div>

    </div>
};

function BottomBar(props) {
    const classNames = useStyles();
    return <div className={classNames.bottomBar}>Footer</div>
}

function App() {
    return (
        <Router>

        <div style={{height: '100vh', backgroundColor: '#666'}}>

            <UniversalPanel singlePanel
                toolbar={<TopBar/>}
                content={
                    links.map(
                     link => {
                         const path = link.split(' ').join('_');
                         return <Route path={'/'+path}>
                             <Content link={link}/>
                         </Route>
                     }
                    )
                }
                footer={<BottomBar/>}
            />
        </div>
        </Router>
    );
}

export default App;
