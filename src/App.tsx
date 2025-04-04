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
<<<<<<< HEAD
import ErrorPage from "./pages/Error";
=======
import TeamPage from "./pages/TeamPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AddNewProject from "./pages/AddNewProject";
import ProjectSearch from "./pages/SearchPage";
import EditProfile from "./pages/EditProfile";

>>>>>>> de6efb227f66bcc44be1d82ffbc0db9072d6645b
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
          path: "/search",
          element: <ProjectSearch />
        },
        {
          path: "/profile/:userId",
          element: <Profile />
        },
        {
          path: "/edit-profile",
          element: <EditProfile />
        },
        {
          path: "/project/:slug",
          element: <ProjectPage />
        },
        {
          path: "/add-new-project",
          element: <AddNewProject />
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





























