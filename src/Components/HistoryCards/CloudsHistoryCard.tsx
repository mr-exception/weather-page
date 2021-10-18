/**
 * this is an internal components which get an array of IHistoryRecord
 * and renders a chart to show clouds variant through the time
 * the chart will show the data on separated hours
 */
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardHeader, Grid } from "@mui/material";
import { Chart } from "react-google-charts";
import { IHistoryRecord } from "../../Containers/Home/API";

interface IProps {
  records: IHistoryRecord[];
}

const CloudsHistoryCard: React.FC<IProps> = ({ records }) => {
  return (
    <Card>
      <CardHeader
        title="Clouds History"
        subheader="clouds history over last 24 hours"
      />
      <CardContent>
        <Grid container>
          <Grid item md={12}>
            <Chart
              height={"200px"}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["x", "%"],
                ...records.map((record) => {
                  return [
                    new Date(record.dt * 1000).getHours() + "",
                    record.clouds,
                  ];
                }),
              ]}
              options={{
                hAxis: {
                  title: "Hour of day",
                },
                vAxis: {
                  title: "clouds count",
                },
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CloudsHistoryCard;
