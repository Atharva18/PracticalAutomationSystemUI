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
import ViewExamSubjects from "../views/ViewExamSubjects/ViewExamSubjects";
import ViewStatements from "../views/ViewStatements/ViewStatements";
import Malpractices from "../views/Malpractices/Malpractices";

const studentdashboardRoutes = [
 
  
  /*{ path: "/icons", name: "Icons", icon: "pe-7s-science", component: Icons },
  { path: "/maps", name: "Maps", icon: "pe-7s-map-marker", component: Maps },*/
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications
  },
  {
    path: "/viewexamsubjects",
    name: "Problem Statement",
    icon: "pe-7s-diskette",
    component: ViewExamSubjects
  },
  {
    path: "/viewStatement",
    name: "View Statement",
    icon: "pe-7s-diskette",
    component: ViewStatements
  },
  {
    path: "/malpractices",
    name: "Malpractices",
    icon: "pe-7s-diskette",
    component: Malpractices
  },
 /* {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO", 
    icon: "pe-7s-rocket",
    component: Upgrade
  },*/
 { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default studentdashboardRoutes;
