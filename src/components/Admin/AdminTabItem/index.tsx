import { alpha, styled } from '@mui/material/styles';
import { Clear, Search, SortOutlined } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import { Grid, IconButton, InputBase, List,ListSubheader, Stack, Tooltip, Typography } from "@mui/material";
import React, { ReactElement, useState } from "react";

interface TabItemProps {
  children: ReactElement | ReactElement[],
  listName: string

}
const AdminTabItem: React.FC<TabItemProps> = ({ children, listName }) => {

  const [sort,setSort]=useState(false)

  const onSort=()=>{
    setSort(!sort)
  }

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

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
    color: 'black',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '50%',
        '&:focus': {
          width: '50%',
        },
      },
    },
  }));

  return (
    <>
      
      <Grid container  alignItems={"center"} justifyContent={"center"} >
        
        <Grid item sm={10} md={8}>
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
        sx={{  bgcolor: 'background.paper',alignItems:"center",justifyContent:'center',flexGrow:1 ,flexDirection:"row", paddingTop:'10'}}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
             <Typography variant='h6' padding={2} color={'teal'}>
            {listName}
            </Typography>
            {!sort?(<Tooltip title='Sort by created time'><IconButton onClick={onSort}><SortOutlined/></IconButton></Tooltip>):<Tooltip title='Unsort by created time'><IconButton onClick={onSort}><Clear/></IconButton></Tooltip>}
            
            
          </Stack>
         
        }
      >
        {children}
      </List>
        </Grid>
      </Grid>
      
    </>
  )
}

export default AdminTabItem;

