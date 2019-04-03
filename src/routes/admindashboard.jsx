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
import AddSingle from "views/AddSingle/AddSingle"
import Enrollment from "views/Enrollment/Enrollment"
import AddSubject from "views/AddSubject/AddSubject"
import AddBranch from "views/AddBranch/AddBranch"
import AddDepartment from "views/AddDepartment/AddDepartment"
import CreateExam from "views/CreateExam/CreateExam"
import ConfirmExam from "../views/ConfirmExam/ConfirmExam";
import AvailableExams from "../views/AvailableExams/AvailableExams";
import AddProblemStatement from "../views/AddProblemStatement/AddProblemStatement";

const admindashboardRoutes = [
 
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard
  },  
  {
    path: "/Role",
    name: "Add Role",
    icon: "pe-7s-users",
    component: AddRole
  },
  {
    path: "/Program",
    name: "Add Program",
    icon: "pe-7s-study",
    component: AddProgram
  },
  {
    path: "/Upload",
    name: "Add multiple users",
    icon: "pe-7s-cloud-upload",
    component: AddMultiple
  },
  {  
    path: "/AddSingle",
    name: "Add User",
    icon: "pe-7s-user",
    component: AddSingle
  },
  {  
    path: "/Enrollment",
    name: "Enroll Students",
    icon: "pe-7s-user",
    component: Enrollment
  },
  {  
    path: "/AddSubject",
    name: "Add Subject",
    icon: "pe-7s-user",
    component: AddSubject
  },
  {  
    path: "/AddBranch",
    name: "Add Branch",
    icon: "pe-7s-user",
    component: AddBranch
  },
  {  
    path: "/AddDepartment",
    name: "Add Department",
    icon: "pe-7s-user",
    component: AddDepartment
  },
  {  
    path: "/CreateExam",
    name: "Create Exam",
    icon: "pe-7s-note2",
    component: CreateExam
  },
  {  
    path: "/ConfirmExam",
    name: "Confirm Exam",
    icon: "pe-7s-note2",
    component: ConfirmExam
  },
  {  
    path: "/AvailableExams",
    name: "Available Exams",
    icon: "pe-7s-news-paper",
    component: AvailableExams
  },
  {  
    path: "/AddProblemStatement",
    name: "Add Statements",
    icon: "pe-7s-news-paper",
    component: AddProblemStatement
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
  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default admindashboardRoutes;
