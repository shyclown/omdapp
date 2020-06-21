
import React, {useState, useRef} from "react";
import { getImageSrc } from "../../utils/resources/files";


const ShowImage = (props: any) => {
    // const URL = window.URL || window.webkitURL;


    const [smallerWidth, setSmallerWidth] = useState(false);
    const [difference, setDifference] = useState(0);

    const [loaded, setLoaded] = useState(false);
    const image = useRef<HTMLImageElement | null>(null);

    const {width, height} = props;
    const scale = width > height ? width : height;

    const src = getImageSrc(props.id, scale*2);

    const handleLoad = () => {
        let w = image && image.current ? image.current.naturalWidth : 250;
        let h = image && image.current ? image.current.naturalHeight : 250;
        let useWidth = w < h;
        let sm = useWidth ? w : h;
        let big = useWidth ? h : w;
        let resBig = (scale / sm) * big;
        let diff = resBig - scale;
        setDifference(diff);
        setLoaded(true);
        setSmallerWidth(w < h);
    };

    return <img
        loading={'lazy'}
        style={{
            display: loaded ? 'block' : 'hidden',
            marginLeft: !smallerWidth ? '-'+difference/2+'px' : '0px',
            marginTop: smallerWidth ? '-'+difference/2+'px' : '0px',
        }}
        onLoad={handleLoad}
        ref={image}
        width={ smallerWidth ? scale : null }
        height={ !smallerWidth ? scale : null }
        alt={'uploaded_image'}
        src={src}
    />
};

export default ShowImage;