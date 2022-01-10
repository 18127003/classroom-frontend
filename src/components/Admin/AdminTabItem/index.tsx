import { Clear, SortOutlined } from "@mui/icons-material";
import { Box, FormControl, Grid, IconButton, InputAdornment, List, Stack, TextField, Tooltip, Typography } from "@mui/material";
import React, { ReactElement, SyntheticEvent, useState } from "react";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

interface TabItemProps {
  children: ReactElement | ReactElement[],
  listName: string,
  apply: (desc: boolean, q: string) => void
}
const AdminTabItem: React.FC<TabItemProps> = ({ children, listName, apply }) => {

  const [desc, setDesc] = useState(false)
  const [q, setQ] = useState<string>('')

  const onChangeSort = () => {
    setDesc(!desc)
    apply(!desc, q)
  }

  const onSearch = (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
        search: { value: string };
    };
    setQ(target.search.value)
    apply(desc, target.search.value)
  }

  return (
    <>

      <Grid container alignItems={"center"} justifyContent={"center"} >

        <Grid item sm={10} md={8}>
          <Box
            component="form"
            onSubmit={onSearch}
            sx={{
              '& .MuiTextField-root': { m: 1, width: '96%' },
            }}
            autoComplete="off"
          >
            <TextField
              name='search'
              placeholder='Search'
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton type="submit"><SearchRoundedIcon /></IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Box>
          <List
            sx={{ bgcolor: 'background.paper', alignItems: "center", justifyContent: 'center', flexGrow: 1, flexDirection: "row", paddingTop: '10' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant='h6' padding={2} color={'teal'}>
                  {listName}
                </Typography>
                {!desc ? (<Tooltip title='Sort by created time'><IconButton onClick={onChangeSort}><SortOutlined /></IconButton></Tooltip>) :
                  (<Tooltip title='Unsort by created time'><IconButton onClick={onChangeSort}><Clear /></IconButton></Tooltip>)}


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

