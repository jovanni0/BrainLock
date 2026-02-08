import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/HomePage.tsx";
import ServerQuizzesPage from "./pages/ServerQuizzesPage.tsx";
import LocalQuizzesPage from "./pages/LocalQuizzesPage.tsx";
import CustomizeQuizPage from "./pages/CustomizeQuizPage.tsx";
import ProgressPage from "./pages/ProgressPage.tsx";
import ResaltPage from "./pages/ResultPage.tsx";
import PreviewPage from "./pages/PreviewPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import QuizBuilder from "./pages/QuizBuilderPage.tsx";

import "./index.css";
import "./markdown.css";
import "./assets/scrollbars.css"



const router = createBrowserRouter([
   {
      path: "/",
      element: <HomePage />
   },
   {
      path: "/server",
      element: <ServerQuizzesPage />
   },
   {
      path: "/local",
      element: <LocalQuizzesPage />
   },
   {
      path: "/customize",
      element: <CustomizeQuizPage />
   },
   {
      path: "/progress",
      element: <ProgressPage />
   },
   {
      path: "/resault",
      element: <ResaltPage />
   },
   {
      path: "/preview",
      element: <PreviewPage />
   },
   {
      path: "/settings",
      element: <SettingsPage />
   },
   {
      path: "/quiz-builder",
      element: <QuizBuilder />
   }
])

const root = createRoot(document.getElementById("root")!);
root.render(
   <RouterProvider router={router} />
)