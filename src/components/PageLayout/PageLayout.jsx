import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import Sidebar from "../../scenes/global/Sidebar";
import Topbar from "../../scenes/global/Topbar";
import { ColorModeContext, useMode } from "../../theme";

function PageLayout({ children }) {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { user } = useContext(UserContext);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} user={user} />
          <main className="content">
            <Topbar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
            {children}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default PageLayout;
