import { Navigate } from "react-router-dom";
import { isAuthenticated, getUser } from "../services/authService";

/**
 * Component bảo vệ route cho Admin App
 * Chỉ cho phép user có role "admin" hoặc "employee" truy cập
 * @param {Object} props
 * @param {React.ReactNode} props.children - Component con cần bảo vệ
 */
export default function ProtectedRoute({ children }) {
  // Kiểm tra xem user đã đăng nhập chưa
  if (!isAuthenticated()) {
    // Chưa đăng nhập -> chuyển đến trang login
    return <Navigate to="/login" replace />;
  }

  // Lấy thông tin user
  const user = getUser();

  // Kiểm tra role - chỉ cho phép admin và employee
  if (!user || (user.role !== "admin" && user.role !== "employee")) {
    // Không phải admin/employee -> chuyển về trang user app
    window.location.href = "http://localhost:5173";
    return null;
  }

  // Đã đăng nhập và có quyền admin/employee -> render component
  return children;
}
