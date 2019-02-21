import Dashboard from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile/UserProfile";
import TableList from "views/TableList/TableList";
import Typography from "views/Typography/Typography";
//import Icons from "views/Icons/Icons";
//import Maps from "views/Maps/Maps";
import Notifications from "views/Notifications/Notifications";
//import Upgrade from "views/Upgrade/Upgrade";
import AddRole from "views/AddRole/AddRole"
import AddMultiple from "views/AddMultiple/AddMultiple";
import AddProgram from "views/AddProgram/AddProgram"

const proctordashboardRoutes = [
 
  {
    path: "/Upload",
    name: "Add multiple users",
    icon: "pe-7s-cloud-upload",
    component: AddMultiple
  },
  {  
    path: "/user",
    name: "Add User Profile",
    icon: "pe-7s-user",
    component: UserProfile
  },
  {
    path: "/table",
    name: "Table List",
    icon: "pe-7s-note2",
    component: TableList
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "pe-7s-news-paper",
    component: Typography
  },
  /*{ path: "/icons", name: "Icons", icon: "pe-7s-science", component: Icons },
  { path: "/maps", name: "Maps", icon: "pe-7s-map-marker", component: Maps },*/
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications
  },
 /* {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO", 
    icon: "pe-7s-rocket",
    component: Upgrade
  },*/
//  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default proctordashboardRoutes;