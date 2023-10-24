import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { tokens } from "../../theme";
import { useState } from "react";
import {
  BarChart,
  DonutSmall,
  MenuOutlined,
  Timeline,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("bar");
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: `${colors.primary[400]} !important`,
        "& .ps-sidebar-root.css-1wvake5": {
          border: "none",
        },
        "& .ps-menu-root": {
          background: `${colors.primary[400]} `,
        },
        "& .ps-menu-button:hover": {
          color: `${colors.grey[100]} !important`,
          background: `${colors.primary[900]} !important`,
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu>
          <MenuItem
            icon={isCollapsed && <MenuOutlined />}
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{
              paddingTop: "40px",
              paddingBottom: "40px",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h3">ADMINS</Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlined />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              marginBottom="60px"
            >
              <img
                alt="profile-user"
                width="100px"
                height="100px"
                src={"assets/user.png"}
              />
              <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                textAlign="center"
              >
                Sourabh S.
              </Typography>
              <Typography
                variant="h5"
                color={colors.greenAccent[500]}
                textAlign="center"
              >
                MERN Developer
              </Typography>
            </Box>
          )}

          <MenuItem
            icon={<Timeline />}
            onClick={() => {
              navigate("/lineChart");
              setSelected("line");
            }}
          >
            <Typography
              variant="h4"
              color={
                selected === "line" ? colors.greenAccent[500] : colors.grey[100]
              }
            >
              Line Chart
            </Typography>{" "}
          </MenuItem>
          <MenuItem
            icon={<DonutSmall />}
            onClick={() => {
              navigate("/pieChart");
              setSelected("pie");
            }}
          >
            <Typography
              variant="h4"
              color={
                selected === "pie" ? colors.greenAccent[500] : colors.grey[100]
              }
            >
              Pie Chart
            </Typography>{" "}
          </MenuItem>
          <MenuItem
            icon={<BarChart />}
            onClick={() => {
              navigate("/barChart");
              setSelected("bar");
            }}
          >
            <Typography
              variant="h4"
              color={
                selected === "bar" ? colors.greenAccent[500] : colors.grey[100]
              }
            >
              Bar Chart
            </Typography>{" "}
          </MenuItem>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
