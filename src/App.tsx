import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import RootLayout from "./pages/RootLayout";
import Showcase from "./pages/Showcase";
import { ThemeProvider } from "@/components/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout/>,
      children:[
        {
          index:true,
          element:<HomePage/>
        },
        {
          path:"/showcase",
          element:<Showcase/>
        }
      ]
    },
    
  ]);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
