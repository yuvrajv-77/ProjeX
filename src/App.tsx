import { AuthProvider } from "./context/authContext";
import Authentication from "./pages/Authentication";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import RootLayout from "./pages/RootLayout";
import Showcase from "./pages/TeamPage";
import { ThemeProvider } from "@/components/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./pages/Profile";
import ProjectPage from "./pages/ProjectPage";
import TeamPage from "./pages/TeamPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
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
          path: "/project/:slug",
          element: <ProjectPage />
        },
        {
          path: "/team",
          element: <TeamPage />
        }
      ],
    },
    {
      path: "/getstarted",
      element: <Authentication />
    },

  ]);

  const queryClient = new QueryClient()

  return (
    <>
     <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;





























