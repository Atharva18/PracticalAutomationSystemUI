import Dashboard from "views/Dashboard/Dashboard";
import UserProfile from "views/UserProfile/UserProfile";
import Notifications from "views/Notifications/Notifications";
import Upgrade from "views/Upgrade/Upgrade";
//import Dashboard from "views/Dashboard/Dashboard";
//import UserProfile from "views/UserProfile/UserProfile";
import TableList from "views/TableList/TableList";
import Typography from "views/Typography/Typography";
//import Icons from "views/Icons/Icons";
//import Maps from "views/Maps/Maps";
//import Notifications from "views/Notifications/Notifications";
//import Upgrade from "views/Upgrade/Upgrade";
import AddRole from "views/AddRole/AddRole"
//import AddMultiple from "views/AddMultiple/AddMultiple";
//import AddProgram from "views/AddProgram/AddProgram"
import AddSingle from "views/AddSingle/AddSingle"
import Enrollment from "views/Enrollment/Enrollment"
import AddSubject from "views/AddSubject/AddSubject"
import AddBranch from "views/AddBranch/AddBranch"
import AddDepartment from "views/AddDepartment/AddDepartment"
import CreateExam from "views/CreateExam/CreateExam"
import ConfirmExam from "../views/ConfirmExam/ConfirmExam";
import AvailableExams from "../views/AvailableExams/AvailableExams";
import AddProblemStatement from "../views/AddProblemStatement/AddProblemStatement";
import ViewStudents from "../views/ViewStudents/ViewStudents";
import ViewBatches from "../views/ViewBatches/ViewBatches";
import ViewBatchStudents from "../views/ViewBatchStudents/ViewBatchStudents";
import StudentDetails from "../views/StudentDetails/StudentDetails";
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
    path: "/AddSubject",
    name: "Add Subject",
    icon: "pe-7s-study",
    component: AddSubject
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
    icon: "pe-7s-like2",
    component: ConfirmExam
  },
  {  
    path: "/AvailableExams",
    name: "Available Exams",
    icon: "pe-7s-display2",
    component: AvailableExams
  },
  {  
    path: "/AddProblemStatement",
    name: "Add Statements",
    icon: "pe-7s-plus",
    component: AddProblemStatement
  },
  {
    path: "/ViewBatches",
    name: "View Batches",
    icon: "pe-7s-folder",
    component: ViewBatches
  },
  {
    path: "/ViewBatcheStudents",
    name: "View Batch Students",
    icon: "pe-7s-news-paper",
    component: ViewBatchStudents
  },
  {  
    path: "/Enrollment",
    name: "Enroll Students",
    icon: "pe-7s-users",
    component: Enrollment
  },
 
  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" }
];

export default facultydashboardRoutes;
