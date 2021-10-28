import "./App.css";
import Navbar from "./UI/Navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import {  useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "./components/Footer";
import CityDetail from "./pages/CityDetail";
import { uiActions } from "./store/ui-slice";
import Notification from "./UI/Notification";
import { useSelector } from "react-redux";
function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  useEffect(() => {
    setTimeout(() => {
      dispatch(uiActions.hideNotification());
    }, 5000);
  }, [notification, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/favorites" exact>
          <Favorites />
        </Route>
        <Route path="/favorites/:cityKey">
          <CityDetail />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;

///"http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=a8Y17cWPTrDn3XcxMFt6lKVnGHnzMCUs&q=tel%20aviv"
