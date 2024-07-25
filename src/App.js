import React, { useEffect } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import ScrollTop from "./Components/ScrollToTop";
import Layout from "./LayoutWrapper/AdminLayout";
import MatchInfo from "./Components/Match Info";
import Home from "./Pages/Home";
import MatchDetails from "./Pages/MatchDetails";
// import UpcomingMatch from "./Pages/UpcomingMatch";
import Series from "./Pages/Series/Series";
import ICC_Rankings from "./Pages/ICC_Rankings";
import SeriesDetails from "./Pages/SeriesDetails";
import Player_Profiles from "./Pages/Player_Profiles";
import Schedule from "./Pages/Schedule";
import Venue_Details from "./Pages/Venue_Details";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/armani-match-details">
        <ScrollTop>
          <Layout>
            <Routes>
              {/* Pages------------ */}
              <Route path="/" element={<Home />} />

              {/* Cricket Card */}
              <Route
                path="/match-details/:seriesId/:matchId/:team_a_id/:team_b_id/"
                element={<MatchDetails />}
              />

              <Route path="/schedule" element={<Schedule />} />
              <Route path="/series-list" element={<Series />} />
              <Route
                path="/series-details/:seriesId"
                element={<SeriesDetails />}
              />
              <Route
                path="/player-profiles/:playerId"
                element={<Player_Profiles />}
              />
              <Route
                path="/venue-details/:venueId"
                element={<Venue_Details />}
              />
              <Route path="/icc-rankings" element={<ICC_Rankings />} />
              <Route
                path="*"
                element={
                  <div className="my-10 bg-[#232525] p-4 w-[80%] rounded-lg mx-auto">
                    <h2 className="text-center">No Page Found</h2>
                  </div>
                }
              />
            </Routes>
          </Layout>
        </ScrollTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
