// File: src/layouts/AdminLayout.jsx
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import AdminFooter from "../components/AdminFooter";

export default function AdminLayout() {
  useEffect(() => {
    const SELECTOR_SIDEBAR_WRAPPER = ".sidebar-wrapper";
    const sidebarWrapper = document.querySelector(SELECTOR_SIDEBAR_WRAPPER);
    const isMobile = window.innerWidth <= 992;

    // Tránh init nhiều lần khi hot reload
    if (sidebarWrapper?.dataset?.osInit === "1") return;

    const OverlayScrollbars = window.OverlayScrollbarsGlobal?.OverlayScrollbars;

    if (sidebarWrapper && OverlayScrollbars && !isMobile) {
      OverlayScrollbars(sidebarWrapper, {
        scrollbars: {
          theme: "os-theme-light",
          autoHide: "leave",
          clickScroll: true,
        },
      });

      sidebarWrapper.dataset.osInit = "1";
    }
  }, []);

  return (
    <div className="app-wrapper">
      <AdminHeader />
      <AdminSidebar />

      {/* AdminLTE: app-main */}
      <main className="app-main">
        {/* Nơi render các page con */}
        <Outlet />
      </main>

      <AdminFooter />
    </div>
  );
}
