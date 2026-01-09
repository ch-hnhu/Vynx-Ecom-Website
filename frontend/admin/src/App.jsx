import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}
