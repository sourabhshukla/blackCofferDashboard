import { ResponsiveLine } from "@nivo/line";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as React from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import backendEndpoint from "../config/config";

function BasicSelect({ category, values, set, value }) {
  console.log(value);

  const handleChange = (event) => {
    set(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: "120px" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{category}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          onChange={handleChange}
        >
          {values.map((value) => (
            <MenuItem value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

const MyResponsiveLine = ({ data, X, Y }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 200, left: 60 }}
      xScale={{ type: "point" }}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="monotoneX"
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 41,
        legend: X,
        legendOffset: 100,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: `Avg. ${Y}`,
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      colors={{ scheme: "nivo" }}
      lineWidth={3}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor", modifiers: [] }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "top-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "right-to-left",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      motionConfig="slow"
    />
  );
};

export default function Line() {
  const [X, setX] = React.useState("sector");
  const [Y, setY] = React.useState("intensity");
  const [startYear, setStartYear] = React.useState(2017);
  const [endYear, setEndYear] = React.useState(2200);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .post(`${backendEndpoint}/api/v1/line/data`, {
        X: X,
        Y: Y,
        startYear: startYear,
        endYear: endYear,
      })
      .then((res) => setData(res.data.data));
  }, [X, Y, startYear, endYear]);

  React.useEffect(() => {
    if (data.length > 0) {
      setIsLoading(false);
    }
  }, [data]);

  const realData = [
    {
      id: `Avg. ${Y} over ${X}`,
      color: "hsl(298, 70%, 50%)",
      data: data,
    },
  ];

  const [endYearValues, setEndYearValues] = React.useState(
    Array.from(Array(2200 - startYear + 1).keys()).map((item) => item + 2017)
  );

  React.useEffect(() => {
    console.log("endYear");
    setEndYearValues(
      Array.from(Array(2200 - startYear + 1).keys()).map(
        (item) => item + startYear
      )
    );
  }, [startYear]);

  const start_year_values = Array.from(Array(endYear - 2017 + 1).keys()).map(
    (item) => item + 2017
  );

  return (
    <>
      {!isLoading ? (
        <Box
          width="99%"
          height="80%"
          position="relative"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Box display="flex" justifyContent="center" gap="20px">
            <BasicSelect
              category="X"
              values={[
                "sector",
                "topic",
                "region",
                "pestle",
                "country",
                "source",
              ]}
              set={setX}
              value={X}
            />
            <BasicSelect
              category="Y"
              values={["intensity", "relevance", "likelihood", "impact"]}
              set={setY}
              value={Y}
            />
            <BasicSelect
              category="start_year"
              values={start_year_values}
              set={setStartYear}
              value={startYear}
            />
            <BasicSelect
              category="end_year"
              values={endYearValues}
              set={setEndYear}
              value={endYear}
            />
          </Box>
          <MyResponsiveLine data={realData} X={X} Y={Y} />
        </Box>
      ) : (
        <Box
          width="100%"
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress sx={{ color: colors.grey[100] }} />
        </Box>
      )}
    </>
  );
}
