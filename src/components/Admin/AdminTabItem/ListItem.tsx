import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { ReactElement } from "react";

interface ListItemProps{
    children:ReactElement|ReactElement[],
    key:any,
    content:any

}
const AdminListItem:React.FC<ListItemProps>=({children,content})=>{
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
    setOpen(!open);
    }
return(
    <>
     <ListItemButton onClick={handleClick}>
        <ListItemText primary={content} />
        {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
            {children}
        </Collapse>
    </>
   
)
}
export default AdminListItem 