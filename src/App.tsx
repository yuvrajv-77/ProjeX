import Showcase from "./pages/Showcase"
import { ThemeProvider } from "@/components/theme-provider"
function App() {


  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Showcase />
      </ThemeProvider>
    </>
  )
}

export default App
