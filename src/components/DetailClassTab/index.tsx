import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { DetailClassTabProps } from "@/@types/props";
import { CardHeader, Grid, Stack } from "@mui/material";
import DetailCard from "./DetailCard";
import CodeCard from "./CodeCard";
import EditorCard from "./EditorCard";


 

const DetailClassTab: React.FC<DetailClassTabProps> = ({ detailClass }) => {

  return (
    <Grid container columns={{md:12, sm:8, xs:4}} sx={{flexGrow:1, justifyContent:'center'}}>
      <Grid item md={8} sm={6} xs={4}>
        <Grid
          container
          columns={{ md: 12, sm: 8, xs:4 }}
          columnSpacing={{ md: 4 }}
          rowSpacing={{ md: 4, sm:2, xs:2 }}
          sx={{ flexGrow: 1 }}
        >
          <Grid item md={12} sm={8} xs={4}>
            <DetailCard detailClass={detailClass}/>
          </Grid>
          <Grid item md={3} sm={8} xs={4}>
            <Stack spacing={2}>
              {detailClass.role==="TEACHER"&&(<CodeCard code={detailClass.code}/>)}
              <Card>
                <CardHeader
                  title="Deadline"
                />
                <CardContent>
                  <Typography sx={{ mb: 1.5 }} variant="body2" noWrap>
                    No deadline
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
          <Grid item md={9} sm={8} xs={4}>
            <EditorCard/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetailClassTab;