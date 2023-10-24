import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@emotion/react";
import { tokens } from "../theme";
import backendEndpoint from "../config/config";

const MyResponsivePie = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      theme={{
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={{ scheme: "nivo" }}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "ruby",
          },
          id: "dots",
        },
        {
          match: {
            id: "c",
          },
          id: "dots",
        },
        {
          match: {
            id: "go",
          },
          id: "dots",
        },
        {
          match: {
            id: "python",
          },
          id: "dots",
        },
        {
          match: {
            id: "scala",
          },
          id: "lines",
        },
        {
          match: {
            id: "lisp",
          },
          id: "lines",
        },
        {
          match: {
            id: "elixir",
          },
          id: "lines",
        },
        {
          match: {
            id: "javascript",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: colors.grey[100],
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: colors.grey[100],
              },
            },
          ],
        },
      ]}
    />
  );
};
const Pie = () => {
  const [category, setCategory] = useState("sector");
  const [isLoading, setIsLoading] = useState(true);
  const [currData, setCurrData] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${backendEndpoint}/api/v1/Pie/data?category=${category}`)
      .then((res) => {
        setCurrData(res.data.data);
      });
  }, [category]);

  useEffect(() => {
    if (currData.length > 0) {
      setIsLoading(false);
    }
  }, [currData]);

  console.log(currData);
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
            values={[
              "sector",
              "topic",
              "region",
              "country",
              "pestle",
              "source",
            ]}
            set={setCategory}
            value={category}
          />
          <MyResponsivePie data={currData} />
        </Box>
      ) : (
        <Box
          width="100vw"
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

export default Pie;

function BasicSelect({ category, values, set, value }) {
  console.log(value);

  const handleChange = (event) => {
    set(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: "120px", marginTop: "10px", marginRight: "150px" }}>
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
