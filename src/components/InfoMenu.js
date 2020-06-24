import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";



export const DefaultMenu = (props) =>  {
    const {items, onClick, ...restProps} = props;

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
            </Menu>

    );
}



