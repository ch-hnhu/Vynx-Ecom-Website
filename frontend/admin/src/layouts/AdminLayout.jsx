import { useEffect } from 'react';
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import AdminFooter from "../components/AdminFooter";
import { Outlet } from "react-router-dom";
export default function AdminLayout({ children }) {
  useEffect(() => {
    // Nếu bạn dùng AdminLTE JS + OverlayScrollbars qua CDN trong index.html,
    // thì chỗ này chỉ cần init giống template.

    const SELECTOR_SIDEBAR_WRAPPER = '.sidebar-wrapper';
    const Default = {
      scrollbarTheme: 'os-theme-light',
      scrollbarAutoHide: 'leave',
      scrollbarClickScroll: true,
    };

    const sidebarWrapper = document.querySelector(SELECTOR_SIDEBAR_WRAPPER);
    const isMobile = window.innerWidth <= 992;

    if (
      sidebarWrapper &&
      window.OverlayScrollbarsGlobal?.OverlayScrollbars !== undefined &&
      !isMobile
    ) {
      window.OverlayScrollbarsGlobal.OverlayScrollbars(sidebarWrapper, {
        scrollbars: {
          theme: Default.scrollbarTheme,
          autoHide: Default.scrollbarAutoHide,
          clickScroll: Default.scrollbarClickScroll,
        },
      });
    }
  }, []);

  return (
     <div className="app-wrapper">
      <AdminHeader />
      <AdminSidebar />

      <main className="app-main">
        <Outlet />
      </main>

      <AdminFooter />
    </div>
  );
}
