import { Box, IconButton, Menu } from "@mui/material";
import React, { ReactElement, ReactNode } from "react";

interface PopupMenuProps {
    children: ReactElement| ReactElement[],
    id: string,
    button: ReactElement,
    buttonWrapperSx?: any
}

const PopupMenu: React.FC<PopupMenuProps> = ({children, id, button, buttonWrapperSx})=>{
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const renderChildren = ()=>{
        return React.Children.map(children, (child)=>React.cloneElement(child as ReactElement, {'onMenuItemClick': handleClose}))
    }

    return (
        <>
            <Box sx={buttonWrapperSx}>
            {
                React.cloneElement(button, {'onClick': handleClick})
            }
            </Box>
            <Menu
                id={id}
                aria-labelledby={id}
                keepMounted
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
            >
                {renderChildren()}
            </Menu>
        </>
    )
}

export default PopupMenu;