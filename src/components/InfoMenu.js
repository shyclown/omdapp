import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";


export const DefaultMenu = (props) =>  {
    const {items, handleClose, ...restProps} = props;

       return(
           <Menu {...restProps}>
                {
                    items.map(
                        (item, index) => <MenuItem onClick={handleClose} key={index}>
                        {item.name}
                        </MenuItem>
                    )}
            </Menu>

    );
}



