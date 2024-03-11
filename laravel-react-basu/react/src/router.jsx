import { Navigate, createBrowserRouter } from "react-router-dom";

import Login from "./views/Login";
import Signup from "./views/Signup";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import LocationTrack from "./views/LocationTrack";
import PageNotFound from "./views/PageNotFound";
import { useStateContext } from "./contexts/ContextProvider";
import ReservationForm from "./views/ReservationForm";
import LandingPage from "./views/LandingPage";
import UserList from "./admin/UserList";
import UserRegister from "./admin/UserRegister";
import StartService from "./driver/StartService";
import InquireReservation from "./student/InquireReservation";
import Dashboard from "./admin/Dashboard";
import Reservation from "./admin/Reservation";
import StudentReservation from "./student/StudentReservation";
import ShuttleForm from "./admin/ShuttleForm";
import ShuttleStorage from "./admin/ShuttleStorage";
import Location from "./views/Location";
import Map from "./views/Map";
import Trip from "./views/Trip";
import ShuttleSelect from "./views/ShuttleSelect";
import ServiceStart from "./views/ServiceStart";
import InquireReservations from "./student/InquireReservations";

// Define role constants
const RoleRouteGuard = ({ allowedRoles, children }) => {
  const { currentUser } = useStateContext();

  if (!allowedRoles.includes(currentUser.role)) {
    // Redirect to unauthorized route if the user's role is not allowed
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/reservation",
        element: (
          <RoleRouteGuard allowedRoles={[1]}>
            <Reservation />
          </RoleRouteGuard>
        ),
      },
      {
        path: "/reservation/create",
        element: <ReservationForm />,
      },
      {
        path: "/locationtrack",
        element: <LocationTrack />,
      },
      {
        path: "/account/register",
        element: <UserRegister />,
      },
      {
        path: "/users",
        element: <UserList />,
      },
      {
        path: "/shuttle/form",
        element: <ShuttleForm />,
      },
      {
        path: "/shuttle/storage",
        element: <ShuttleStorage />,
      },
      {
        path: "/startservice",
        element: <StartService />,
      },
      {
        path: "/inquire/reservation",
        element: (
          <RoleRouteGuard allowedRoles={[2]}>
            <InquireReservation />
          </RoleRouteGuard>
        ),
      },
      {
        path: "/student/reservation/list",
        element: (
          <RoleRouteGuard allowedRoles={[2]}>
            <StudentReservation />
          </RoleRouteGuard>
        ),
      },
      //Shuttle Tracker
      {
        path: "/location",
        element: <Location />,
      },
      {
        path: "/location/map",
        element: <Map />,
      },
      {
        path: "/location/map/trip",
        element: <Trip />,
      },
      {
        path: "/service/shuttleselect",
        element: <ShuttleSelect />,
      },
      {
        path: "/service/shuttleselect/servicestart",
        element: <ServiceStart />,
      },
    ],
  },

  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/*",
    element: <PageNotFound />,
  },
]);

export default router;
