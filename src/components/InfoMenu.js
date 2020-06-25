import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {ChessDialogs} from "./ChessDialogs";
import MenuList from "@material-ui/core/MenuList";


export const DefaultMenu = (props) =>  {
    const {items, onClick, chessLinks, handleClose,...restProps} = props;

       return(
           <Menu
               {...restProps}
           >

                {
                    items && items.map(
                        (item, index) => <MenuItem
                            onClick={() => {onClick(item);}}
                            key={index}
                        >
                            {item.title}
                        </MenuItem>
                    )
                }
               {
                   chessLinks && <ChessDialogs menu/>
               }
            </Menu>

    );
}



