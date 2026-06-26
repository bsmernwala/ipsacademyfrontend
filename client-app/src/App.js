// import React, { useState } from "react";
// import AdminLogin from "./AdminViews/AdminLogin";
// import CustomerMain from "./CustomerViews/CustomerMain";
// import VendorMain from "./vendorviews/VendorMain";
// import ProductListforMainPage from "./ProductViews/ProductListforMainPage";
// import "./App.css";
// import mainpic from "./mainpic.jpg"

// function App() {
//   const [page, setPage] = useState("");

//   if (page === "admin") {
//     return <AdminLogin />;
//   }

//   if (page === "customer") {
//     return <CustomerMain />;
//   }

//   if (page === "vendor") {
//     return <VendorMain />;
//   }

//   return (
//     <div className="app-container">
//       {/* Navigation Bar */}
//       <nav className="navbar">
//         <div className="logo">
//           E-Shopee........
//         </div>

//         <div className="nav-buttons">
//           <button
//             className="nav-btn admin-btn"
//             onClick={() => setPage("admin")}
//           >
//             Admin Login
//           </button>

//           <button
//             className="nav-btn customer-btn"
//             onClick={() => setPage("customer")}
//           >
//             Customer Portal
//           </button>

//           <button
//             className="nav-btn vendor-btn"
//             onClick={() => setPage("vendor")}
//           >
//             Vendor Portal
//           </button>
//         </div>
//       </nav>

      
//       <div className="hero-section">        
//         <img src={mainpic}  alt="mainpic" width={1140} height={250} style={{borderRadius:15}}/>
//       </div>
     
      
//       {/* Products */}
//       <div className="product-section">
//         <ProductListforMainPage />
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";

import AdminLogin from "./AdminViews/AdminLogin";
import CustomerMain from "./CustomerViews/CustomerMain";
import VendorMain from "./vendorviews/VendorMain";
import ProductListforMainPage from "./ProductViews/ProductListforMainPage";

import "./App.css";
import mainpic from "./mainpic.jpg";

function App() {
  const [page, setPage] = useState("");

  const [internet, setInternet] = useState(true);
  const [serverStatus, setServerStatus] = useState("checking");

  const API = process.env.REACT_APP_BASE_API_URL;

  useEffect(() => {
    // Initial Check
    checkStatus();

    // Listen for Internet changes
    window.addEventListener("online", checkStatus);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", checkStatus);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleOffline = () => {
    setInternet(false);
    setServerStatus("offline");
  };

  const checkStatus = async () => {
    // Internet Check
    if (!navigator.onLine) {
      setInternet(false);
      setServerStatus("offline");
      return;
    }

    setInternet(true);

    try {
      await axios.get(`${API}/health`, {
        timeout: 5000,
      });

      setServerStatus("online");
    } catch (error) {
      setServerStatus("offline");
    }
  };

  // No Internet
  if (!internet) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <h1>📡 No Internet Connection</h1>
        <p>Please connect to the Internet.</p>

        <button onClick={checkStatus}>
          Retry
        </button>
      </div>
    );
  }

  // Checking Server
  if (serverStatus === "checking") {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <h2>⏳ Connecting to Server...</h2>
      </div>
    );
  }

  // Backend Offline
  if (serverStatus === "offline") {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <h1>⚠ Backend Server is Offline</h1>

        <p>Please start the backend server.</p>

        <button onClick={checkStatus}>
          Retry
        </button>
      </div>
    );
  }

  // Navigation
  if (page === "admin") return <AdminLogin />;
  if (page === "customer") return <CustomerMain />;
  if (page === "vendor") return <VendorMain />;

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">E-Shopee........</div>

        <div className="nav-buttons">
          <button
            className="nav-btn admin-btn"
            onClick={() => setPage("admin")}
          >
            Admin Login
          </button>

          <button
            className="nav-btn customer-btn"
            onClick={() => setPage("customer")}
          >
            Customer Portal
          </button>

          <button
            className="nav-btn vendor-btn"
            onClick={() => setPage("vendor")}
          >
            Vendor Portal
          </button>
        </div>
      </nav>

      <div className="hero-section">
        <img
          src={mainpic}
          alt="mainpic"
          width={1140}
          height={250}
          style={{ borderRadius: 15 }}
        />
      </div>

      <div className="product-section">
        <ProductListforMainPage />
      </div>
    </div>
  );
}

export default App;