import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

/**
 * Trang xử lý redirect từ User App sang Admin App
 * Nhận token và user data từ URL params, lưu vào localStorage
 */
export default function AuthRedirect() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const userParam = searchParams.get("user");

    if (token && userParam) {
      try {
        // Decode user data
        const user = JSON.parse(decodeURIComponent(userParam));

        // Kiểm tra role
        if (user.role === "admin" || user.role === "employee") {
          // Lưu vào localStorage
          localStorage.setItem("auth_token", token);
          localStorage.setItem("user_data", JSON.stringify(user));

          // Trigger storage event
          window.dispatchEvent(new Event("storage"));

          // Chuyển đến dashboard
          navigate("/", { replace: true });
        } else {
          // Không phải admin/employee -> chuyển về user app
          window.location.href = "http://localhost:5173";
        }
      } catch (error) {
        console.error("Auth redirect error:", error);
        // Có lỗi -> chuyển về login
        navigate("/login", { replace: true });
      }
    } else {
      // Không có token -> chuyển về login
      navigate("/login", { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: 2,
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" color="text.secondary">
        Đang chuyển hướng...
      </Typography>
    </Box>
  );
}

