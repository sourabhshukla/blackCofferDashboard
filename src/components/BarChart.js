import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import backendEndpoint from "../config/config";

import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";

function BasicSelect({ category, values, set, value }) {
  console.log(value);

  const handleChange = (event) => {
    set(event.target.value);
  };

  return (
    <Box
      sx={{
        maxWidth: "120px",
        marginTop: "10px",
        marginRight: "150px",
      }}
    >
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

const MyResponsiveBar = ({ data, sectors, category, allCategories }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveBar
      data={data}
      keys={allCategories.filter((currCategory) => currCategory !== category)}
      indexBy={category}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 30,
        legend: category,
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Quanity",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      theme={{
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        axis: {
          ticks: {
            text: {
              fill: colors.grey[100],
            },
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
    />
  );
};

const Bar = () => {
  const [category, setCategory] = useState("sector");
  const [uniqueValues, setUniqueCategoryValues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const allValues = [
    "sector",
    "topic",
    "region",
    "country",
    "pestle",
    "source",
  ];

  useEffect(() => {
    setIsLoading(true);
    async function init() {
      axios
        .get(`${backendEndpoint}/api/v1/bar/unique?category=${category}`)
        .then((res) => {
          setUniqueCategoryValues(res.data.data);
        });
      axios
        .post(`${backendEndpoint}/api/v1/bar/data`, {
          category: category,
          allValues: allValues,
        })
        .then((res) => {
          setData(res.data.data);
        });
    }
    init();
  }, [category]);

  useEffect(() => {
    if (data.length > 0) setIsLoading(false);
  }, [data]);

  return (
    <>
      {!isLoading ? (
        <Box
          width="99%"
          height="80%"
          position="relative"
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
        >
          <BasicSelect
            category="category"
            values={allValues}
            set={setCategory}
            value={category}
          />
          <MyResponsiveBar
            data={data}
            sectors={uniqueValues}
            category={category}
            allCategories={allValues}
          />
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
};

export default Bar;
