import { useEffect } from "react";

export default function DashboardPage() {
  useEffect(() => {
    // Sortable
    if (window.Sortable) {
      const el = document.querySelector(".connectedSortable");
      if (el) {
        new window.Sortable(el, { group: "shared", handle: ".card-header" });
        document.querySelectorAll(".connectedSortable .card-header").forEach((h) => {
          h.style.cursor = "move";
        });
      }
    }

    // ApexCharts
    if (window.ApexCharts) {
      const chartEl = document.querySelector("#revenue-chart");
      if (chartEl && !chartEl.dataset.rendered) {
        const options = {
          series: [
            { name: "Digital Goods", data: [28, 48, 40, 19, 86, 27, 90] },
            { name: "Electronics", data: [65, 59, 80, 81, 56, 55, 40] },
          ],
          chart: { height: 300, type: "area", toolbar: { show: false } },
          legend: { show: false },
          dataLabels: { enabled: false },
          stroke: { curve: "smooth" },
          xaxis: {
            type: "datetime",
            categories: [
              "2023-01-01","2023-02-01","2023-03-01","2023-04-01","2023-05-01","2023-06-01","2023-07-01",
            ],
          },
          tooltip: { x: { format: "MMMM yyyy" } },
        };

        const chart = new window.ApexCharts(chartEl, options);
        chart.render();
        chartEl.dataset.rendered = "1";
      }

      const renderSpark = (selector, data) => {
        const el = document.querySelector(selector);
        if (!el || el.dataset.rendered) return;

        const opt = {
          series: [{ data }],
          chart: { type: "area", height: 50, sparkline: { enabled: true } },
          stroke: { curve: "straight" },
          fill: { opacity: 0.3 },
          yaxis: { min: 0 },
        };

        const sp = new window.ApexCharts(el, opt);
        sp.render();
        el.dataset.rendered = "1";
      };

      renderSpark("#sparkline-1", [1000, 1200, 920, 927, 931, 1027, 819, 930, 1021]);
      renderSpark("#sparkline-2", [515, 519, 520, 522, 652, 810, 370, 627, 319, 630, 921]);
      renderSpark("#sparkline-3", [15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21]);
    }

    // jsVectorMap
    if (window.jsVectorMap) {
      const mapEl = document.querySelector("#world-map");
      if (mapEl && !mapEl.dataset.rendered) {
        new window.jsVectorMap({ selector: "#world-map", map: "world" });
        mapEl.dataset.rendered = "1";
      }
    }
  }, []);

  return (
    <>
      {/* Content Header */}
      <div className="app-content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <h3 className="mb-0">Dashboard</h3>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-end">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="app-content">
        <div className="container-fluid">
          {/* ...giữ nguyên phần nội dung bạn đã copy... */}
        </div>
      </div>
    </>
  );
}
