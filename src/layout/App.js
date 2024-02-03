import "../App.css";
import * as React from "react";

// 1. import `ChakraProvider` component
import { Box, ChakraProvider } from "@chakra-ui/react";

import { AppRoutes } from "../Routes/AppRoutes";

function App() {
  // const showDesktopSidebar = useBreakpointValue({ base: false, md: true });

  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <AppRoutes />
    </ChakraProvider>
  );
}

export default App;
