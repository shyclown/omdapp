import React, {PropsWithChildren, useRef, useState} from "react";
import {getImageSrc} from "../../utils/resources/files";
import UniversalCenteredLoader from "../UniversalCenteredLoader";

export {};
const ImageContent = (
    props: PropsWithChildren<{itemId: number, size: number, square?: boolean}>
) => {

    const size = props.size || 800;

    const [smallerWidth, setSmallerWidth] = useState(false);
    const [difference, setDifference] = useState(0);

    const [loaded, setLoaded] = useState(false);
    const image = useRef<HTMLImageElement | null>(null);

    const src = getImageSrc(props.itemId, size);
/*
    const handleLoad = () => {
        let w = image && image.current ? image.current.naturalWidth : 250;
        let h = image && image.current ? image.current.naturalHeight : 250;

        let sm = w < h ? w : h;
        let big = w < h ? h : w;
        let shift = (big - sm) / 2

        setDifference(shift);
        setLoaded(true);
        setSmallerWidth(w < h);
    };
*/
    return <React.Fragment>
        { !loaded && <UniversalCenteredLoader/> }
        <img
            ref={image}
            onLoad={() => {setLoaded(true)}}
            loading={'lazy'}
            style={{ maxWidth:"100%", maxHeight:"100%", borderRadius:"8px" }}
            alt={'image'}
            src={src}
        />
    </React.Fragment>;


}

export default ImageContent;