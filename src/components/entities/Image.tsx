import React, {PropsWithChildren, useEffect, useState} from "react";
import {getImageSrc} from "../../utils/resources/files";

export {};
const ImageContent = (
    props: PropsWithChildren<{itemId: number}>
) => {

    return <img
        style={{width:'100%', borderRadius:'8px'}}
        alt={'image'}
        src={getImageSrc(props.itemId, 800)}
    />;

}

export default ImageContent;