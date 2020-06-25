import withEntityData from "./withEntityData";
import Gallery from "./Gallery";
import React, {useEffect, useState} from "react";
import { Item } from "../../utils/types/ItemType";
import Pagination from "../Pagination";
import Article from "./Article";


export const Page = withEntityData((props: {item: Item}) => {

    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [elements, setElements] = useState<any[] | undefined>(undefined)
    const [displayed, setDisplayed] = useState<any[] | undefined>(undefined);

    const select = (selectedPage: number, selectedPerPage: number) => {
        let newSet = [...props.item.elements];
        newSet = props.item.entity.name === 'fotogaleria' ? newSet : newSet.reverse();
        newSet = newSet.filter(
            (element, index) => {
            const start = selectedPage * selectedPerPage;
            const end = start + selectedPerPage;
            return index >= start && index < end;
        });
        setDisplayed(newSet);
    }

    useEffect(
        ()=> {
            if (elements === null && props.item.id && props.item.elements) {
                setElements(props.item.elements);
            }
            !displayed && select(page, perPage);
        },[props.item, page, perPage]
    )

    const single = !(props?.item?.elements?.length > 1);

    const renderPagination = () => {
        return (
            !single ?
            <Pagination
                total={props.item.elements.length}
                perPage={perPage}
                page={page}
                rowsPerPageOptions={[1,3,5,10,15]}
                onChangeRowsPerPage={(data: any)=>{
                    select(0, data);
                    setPage(0);
                    setPerPage(data);
                }}
                onChangePage={(data:any)=>{
                    select(data, perPage);
                    setPage(data);
                }}
                disableAllOption
            /> : null
        )
    }

    return <div style={{overflow: 'hidden'}}>
        {
            renderPagination()
        }
        {
            displayed && displayed.map(
                (element: Item) => <React.Fragment key={element.id}>
                    <div style={{paddingTop:'16px'}}/>
                    {
                        element.entity_type === "article" && <Article
                            single={single}
                            key={element.id}
                            itemId={element.id}
                        />
                    }
                    {
                        element.entity_type === "gallery" && <Gallery
                            single={single}
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