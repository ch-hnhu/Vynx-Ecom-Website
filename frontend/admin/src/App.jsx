import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import AdminLayout from "./layouts/AdminLayout";

export default function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}
