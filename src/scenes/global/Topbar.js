import { Box, IconButton, InputBase, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { useContext } from "react";
import {
  DarkModeOutlined,
  LightModeOutlined,
  SearchOutlined,
} from "@mui/icons-material";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />

        <IconButton type="button" sx={{ p: 1 }}>
          <SearchOutlined />
        </IconButton>
      </Box>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlined />
          ) : (
            <LightModeOutlined />
          )}{" "}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
