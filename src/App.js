import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import { Route, Routes } from "react-router-dom";
import Bar from "./components/BarChart";
import Pie from "./components/PieChart";
import Line from "./components/LineChart";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Bar />} />
              <Route path="/barChart" element={<Bar />} />
              <Route path="/pieChart" element={<Pie />} />
              <Route path="/lineChart" element={<Line />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
