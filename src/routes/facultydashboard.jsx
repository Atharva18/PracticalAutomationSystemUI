import Dashboard from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile/UserProfile";
import Notifications from "views/Notifications/Notifications";
import Upgrade from "views/Upgrade/Upgrade";
import AddRole from "views/AddRole/AddRole"
import AddMultiple from "views/AddMultiple/AddMultiple";
import AddProgram from "views/AddProgram/AddProgram"

const facultydashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  },  
  {
    path: "/Upload",
    name: "Add multiple users",
    icon: "pe-7s-cloud-upload",
    component: AddMultiple
  },
  {
    path: "/Program",
    name: "Add Program",
    icon: "pe-7s-study",
    component: AddProgram
  },
  
  {  
    path: "/user",
    name: "Add User Profile",
    icon: "pe-7s-user",
    component: UserProfile
  },

  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications
  },
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "pe-7s-rocket",
    component: Upgrade
  },
  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default facultydashboardRoutes;
