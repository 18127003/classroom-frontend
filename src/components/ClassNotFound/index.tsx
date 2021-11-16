import { Stack, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import BasicAppBar from "../BasicAppBar";

const ClassNotFound = () => {
    return (
        <>
            <BasicAppBar/>
            <Stack sx={{flexGrow: 1, alignItems:'center'}} m={10}>
                <Card>
                    <CardContent>
                        <Typography>
                            Oops...Classroom not found
                        </Typography>
                        <Link to="/" style={{textDecoration:'none'}}>
                            <Typography variant="h6" mt={10}>
                                Home Page
                            </Typography>
                        </Link>
                    </CardContent>
                </Card>
            </Stack>
        </>
    )
}

export default ClassNotFound;