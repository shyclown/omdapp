import withEntityData from "./withEntityData";
import Article from "./Article";
import Gallery from "./Gallery";
import React, {useEffect, useState} from "react";
import { Item } from "../../utils/types/ItemType";
import Pagination from "../Pagination";


export const Page = withEntityData((props: {item: Item}) => {

    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(1);
    const [elements, setElements] = useState<any[] | null>(null)
    const [displayed, setDisplayed] = useState<any[]>([]);

    const select = () => {
        const newSet = props.item.elements.filter( (element, index) => {
            const start = page * perPage;
            const end = start + perPage;
            return index >= start && index < end;
        });
        setDisplayed(newSet);
    }


    useEffect(
        ()=> {
            if (elements === null && props.item.id && props.item.elements) {
                setElements(props.item.elements);
            }
            select();
        },[props.item, page, perPage]
    )


    const renderPagination = () => {
        return <Pagination
            total={props.item.elements.length}
            perPage={perPage}
            page={page}
            rowsPerPageOptions={[1,3,5,10,15]}
            onChangeRowsPerPage={(data: any)=>{
                setPerPage(data);
                setPage(0);
            }}
            onChangePage={(data:any)=>{setPage(data)}}
            disableAllOption
        />
    }

    return <div style={{overflow: 'hidden'}}>
        {
            renderPagination()
        }
        {
            displayed.map(
                (element: Item) => <React.Fragment key={element.id}>
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
        {
            renderPagination()
        }
    </div>
});