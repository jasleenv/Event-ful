import Booked from "./Pages/Booked.js";
import Dashboard from "./Pages/Dashboard.js";
import Event from "./Pages/EventPage";
import Favorites from "./Pages/Favorites.js";
import Landing from "./Pages/Landing.js";
import SignUp from "./Pages/SignUp.js";
import VendorIndex from "./Pages/VendorIndex.js";
import VendorShow from "./Pages/VendorShow.js";
import { Route, Switch } from "react-router-dom";
import useGeoLocation from "./hooks/useGeoLocation";
import ScrollToTop from "./Components/ScrollToTop.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";
import axios from "axios"
import NavBar from "./Components/NavBar/NavBar.js";
import NewEventForm from "./Pages/NewEventForm.js";
import { useEffect, useState } from "react";
import { apiURL } from "./util/apiURL";

const API = apiURL();
const user_id = 1

function App() {
  const location = useGeoLocation();
  const [events, setEvents] = useState([])

  useEffect(() => {
    axios
      .get(`${API}/events/${user_id}`)
      .then(
        (res) => {
          setEvents(res.data.message);
        },
        (e) => {
          console.error(e);
        }
      )
      .catch((e) => {
        console.error(e);
      });
  }, []);


  return (
    <div className="site">
      <ScrollToTop />
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>

        <Route path="/signup">
          <SignUp />
        </Route>

        <Route path="/dashboard/:user_id">
          <Dashboard />
        </Route>

        <Route path="/event/:user_id/new">
          <NewEventForm />
        </Route>

        <Route path="/event/:user_id/:event_id">
          <Event />
        </Route>

        <Route path="/vendor/:category/:user_id/:provider_id">
          <VendorShow user_id={user_id} events={events} />
        </Route>

        <Route path="/favorites/:user_id">
          <Favorites />
        </Route>

        <Route path="/vendors/:category">
          <VendorIndex location={location} />
        </Route>

        <Route path="/booked/:user_id/:event_id">
          <Booked />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
