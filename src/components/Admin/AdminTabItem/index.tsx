import { styled, alpha } from '@mui/material/styles';
import { ExpandLess, ExpandMore, Search } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import { Collapse, InputBase, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import React, { ReactElement, useEffect } from "react";

interface TabItemProps {
    data: ReactElement|ReactElement[],
    listName:string
    
}
const AdminTabItem: React.FC<TabItemProps>=({data,listName})=>{
    
    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
              width: '20ch',
            },
          },
        },
      }));
    return(
    <>
    <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
    </Search>

    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {listName}
        </ListSubheader>
      }
    >
        {data}
      
    </List>
    </>
    )
}

export default AdminTabItem;

