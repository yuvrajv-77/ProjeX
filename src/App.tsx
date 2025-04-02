import { AuthProvider } from "./context/authContext";
import Authentication from "./pages/Authentication";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import RootLayout from "./pages/RootLayout";
import Showcase from "./pages/Showcase";
import { ThemeProvider } from "@/components/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./pages/Profile";
import ProjectPage from "./pages/ProjectPage";
import ErrorPage from "./pages/Error";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement:<ErrorPage/>,
      children: [
        {
          index: true,
          element: <HomePage />
        },

        {
          path: "/profile",
          element: <Profile />
        },
        {
          path: "/project",
          element: <ProjectPage />
        },
        {
          path: "/showcase",
          element: <Showcase />
        }
      ],

    },
    {
      path: "/getstarted",
      element: <Authentication />
    },

  ]);
  

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;





























