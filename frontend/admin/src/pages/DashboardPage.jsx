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
          {/* Small boxes */}
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box text-bg-primary">
                <div className="inner">
                  <h3>150</h3>
                  <p>New Orders</p>
                </div>
                <svg className="small-box-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
                <a href="#" className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover">
                  More info <i className="bi bi-link-45deg" />
                </a>
              </div>
            </div>

            <div className="col-lg-3 col-6">
              <div className="small-box text-bg-success">
                <div className="inner">
                  <h3>53<sup className="fs-5">%</sup></h3>
                  <p>Bounce Rate</p>
                </div>
                <svg className="small-box-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                </svg>
                <a href="#" className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover">
                  More info <i className="bi bi-link-45deg" />
                </a>
              </div>
            </div>

            <div className="col-lg-3 col-6">
              <div className="small-box text-bg-warning">
                <div className="inner">
                  <h3>44</h3>
                  <p>User Registrations</p>
                </div>
                <svg className="small-box-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                </svg>
                <a href="#" className="small-box-footer link-dark link-underline-opacity-0 link-underline-opacity-50-hover">
                  More info <i className="bi bi-link-45deg" />
                </a>
              </div>
            </div>

            <div className="col-lg-3 col-6">
              <div className="small-box text-bg-danger">
                <div className="inner">
                  <h3>65</h3>
                  <p>Unique Visitors</p>
                </div>
                <svg className="small-box-icon" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" />
                  <path clipRule="evenodd" fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" />
                </svg>
                <a href="#" className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover">
                  More info <i className="bi bi-link-45deg" />
                </a>
              </div>
            </div>
          </div>

          {/* Main row */}
          <div className="row">
            {/* Left */}
            <div className="col-lg-7 connectedSortable">
              <div className="card mb-4">
                <div className="card-header">
                  <h3 className="card-title">Sales Value</h3>
                </div>
                <div className="card-body">
                  <div id="revenue-chart" />
                </div>
              </div>

              {/* Direct Chat (bạn có thể copy tiếp nguyên khối vào đây) */}
              {/* ... */}
            </div>

            {/* Right */}
            <div className="col-lg-5 connectedSortable">
              <div className="card text-white bg-primary bg-gradient border-primary mb-4">
                <div className="card-header border-0">
                  <h3 className="card-title">Sales Value</h3>
                  <div className="card-tools">
                    <button type="button" className="btn btn-primary btn-sm" data-lte-toggle="card-collapse">
                      <i data-lte-icon="expand" className="bi bi-plus-lg" />
                      <i data-lte-icon="collapse" className="bi bi-dash-lg" />
                    </button>
                  </div>
                </div>

                <div className="card-body">
                  <div id="world-map" style={{ height: 220 }} />
                </div>

                <div className="card-footer border-0">
                  <div className="row">
                    <div className="col-4 text-center">
                      <div id="sparkline-1" className="text-dark" />
                      <div className="text-white">Visitors</div>
                    </div>
                    <div className="col-4 text-center">
                      <div id="sparkline-2" className="text-dark" />
                      <div className="text-white">Online</div>
                    </div>
                    <div className="col-4 text-center">
                      <div id="sparkline-3" className="text-dark" />
                      <div className="text-white">Sales</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
