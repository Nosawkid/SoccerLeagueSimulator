import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import Standings from "./pages/Standings";
import Fixtures from "./pages/Fixtures";
import { FixtureProvider } from "./contexts/FixtureContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/standings" element={<Standings />} />
      <Route path="/fixtures" element={<Fixtures />} />
    </Route>
  ),
  {
    basename: "/SoccerLeagueSimulator",
  }
);

const App = () => {
  return (
    <FixtureProvider>
      <RouterProvider router={router} />
    </FixtureProvider>
  );
};

export default App;
