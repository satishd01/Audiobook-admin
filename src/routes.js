/**=========================================================
* BLISSIQ ADMIN React - v2.2.0
=========================================================
* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
Coded by www.creative-tim.com
 =========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the BLISSIQ ADMIN React are added here,
  You can add a new route, customize the routes and delete the routes here.
  Once you add a new route on this file it will be visible automatically on
  the Sidenav.
  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// BLISSIQ ADMIN React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Icon from "@mui/material/Icon";
import Episodes from "layouts/tables/Episodes";
import NEWDashboard from "layouts/dashboard/New-dasbord";
import Genres from "layouts/tables/Generes";
import Creators from "layouts/tables/Creators";
import { Podcasts } from "@mui/icons-material";
import Podcastscomp from "layouts/tables/Podcasts";
import Audiobooks from "layouts/tables/Audiobook";
import Stories from "layouts/tables/Stories";
import UserInfo from "layouts/tables/Users";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <NEWDashboard />,
  },

  {
    type: "collapse",
    name: "User",
    key: "User",
    icon: <Icon fontSize="small">group</Icon>,
    route: "/Users",
    component: <UserInfo />,
  },

  {
    type: "collapse",
    name: " Genere", // Adding the Students menu item
    key: "Genere",
    route: "/Genere",
    icon: (
      <i className="material-icons" style={{ color: "white" }}>
        group
      </i>
    ),
    component: <Genres />,
    layout: "/admin",
  },
  {
    type: "collapse",
    name: " Creator", // Adding the Students menu item
    key: "Creators",
    route: "/Creators",
    icon: (
      <i className="material-icons" style={{ color: "white" }}>
        group
      </i>
    ),
    component: <Creators />,
    layout: "/admin",
  },

  {
    type: "collapse",
    name: " Podcast", // Adding the Students menu item
    key: "podcast",
    route: "/podcast",
    icon: (
      <i className="material-icons" style={{ color: "white" }}>
        group
      </i>
    ),
    component: <Podcastscomp />,
    layout: "/admin",
  },

  {
    type: "collapse",
    name: " Audiobook", // Adding the Students menu item
    key: "audiobook",
    route: "/audiobook",
    icon: (
      <i className="material-icons" style={{ color: "white" }}>
        group
      </i>
    ),
    component: <Audiobooks />,
    layout: "/admin",
  },

  {
    type: "collapse",
    name: " Story", // Adding the Students menu item
    key: "Stories",
    route: "/Stories",
    icon: (
      <i className="material-icons" style={{ color: "white" }}>
        group
      </i>
    ),
    component: <Stories />,
    layout: "/admin",
  },

  {
    type: "collapse",
    name: " Episode", // Adding the Students menu item
    key: "Episodes",
    route: "/Episodes",
    icon: (
      <i className="material-icons" style={{ color: "white" }}>
        group
      </i>
    ),
    component: <Episodes />,
    layout: "/admin",
  },

  {
    route: "/authentication/sign-in",

    component: <SignIn />,
  },
  {
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
