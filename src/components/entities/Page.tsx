import withEntityData from "./withEntityData";
import Article from "./Article";
import Gallery from "./Gallery";
import React from "react";
import { Item } from "../../utils/types/ItemType";


export const Page = withEntityData((props: {item: Item}) => {
    return <div style={{overflow: 'hidden'}}>
    {
        props.item.elements && props.item.elements.map(
            (element: Item) => <React.Fragment>
                <div style={{paddingTop:'16px'}}/>
                {
                    element.entity_type === "article" && <Article
                        key={element.id}
                        itemId={element.id}
                    />
                }
                {
                    element.entity_type === "gallery" && <Gallery
                        key={element.id}
                        itemId={element.id}
                    />
                }
            </React.Fragment>
        )
    }
    </div>
});