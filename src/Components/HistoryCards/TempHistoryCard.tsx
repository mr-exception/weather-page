import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Grid, Typography } from "@mui/material";
import LoadingCard from "../LoadingCard/LoadingCard";
import { Chart } from "react-google-charts";
import { IHistoryRecord } from "../../Containers/Home/API";

interface IProps {
  records: IHistoryRecord[];
}

const TempHistoryCard: React.FC<IProps> = ({ records }) => {
  return (
    <Card>
      <CardHeader
        title="Temperature History"
        subheader="temperature history over last 24 hours"
      />
      <CardContent>
        <Grid container>
          <Grid item md={12}>
            <Chart
              height={"400px"}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["x", "feels like", "actual"],
                ...records.map((record) => {
                  return [
                    new Date(record.dt * 1000).getHours() + "",
                    record.feels_like,
                    record.temp,
                  ];
                }),
              ]}
              options={{
                hAxis: {
                  title: "Hour of day",
                },
                vAxis: {
                  title: "temerature",
                },
              }}
              rootProps={{ "data-testid": "1" }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TempHistoryCard;
