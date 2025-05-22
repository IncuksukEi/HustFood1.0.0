import { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");

  const navItems = [
    { id: "dashboard", icon: "las la-home", label: "Dashboard", to: "/dashboard" },
    { id: "analytics", icon: "las la-chart-bar", label: "Analytics", to: "/analytics" },
    { id: "orders", icon: "las la-clipboard-list", label: "Orders", to: "/orders" },
    { id: "products", icon: "las la-utensils", label: "Products", to: "/products" },
    { id: "customers", icon: "las la-user-friends", label: "Customers", to: "/customers" },
    { id: "settings", icon: "las la-cog", label: "Settings", to: "/settings" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <h2>
          <span className="lab la-react"></span> <span>HustFood Admin</span>
        </h2>
      </div>
      <div className="sidebar-menu">
        <ul>
          {navItems.map(item => (
            <li key={item.id} className={active === item.id ? "active" : ""}>
              <Link to={item.to} onClick={() => setActive(item.id)}>
                <span className={item.icon}></span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
