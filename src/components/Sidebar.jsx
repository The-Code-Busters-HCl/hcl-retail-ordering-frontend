import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
      {/* Mobile toggle button */}
      <button 
        className="btn btn-outline-secondary d-md-none mb-3 border" 
        type="button" 
        data-bs-toggle="offcanvas" 
        data-bs-target="#dashboardSidebar" 
        aria-controls="dashboardSidebar"
      >
        &#9776; Toggle Menu
      </button>

      {/* Responsive Offcanvas Sidebar */}
      <div className="offcanvas-md offcanvas-start rounded bg-light border p-md-2" tabIndex="-1" id="dashboardSidebar" aria-labelledby="sidebarLabel">
        <div className="offcanvas-header border-bottom d-md-none">
          <h5 className="offcanvas-title" id="sidebarLabel">Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#dashboardSidebar" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body flex-column p-0 p-md-2">
          <h6 className="text-uppercase text-muted fw-bold mb-3 d-none d-md-block px-3">Categories</h6>
          <ul className="nav nav-pills flex-column w-100">
            <li className="nav-item mb-1">
              <NavLink className="nav-link text-dark" to="/products" end>
                🍽 All Menu
              </NavLink>
            </li>
            <li className="nav-item mb-1">
              <NavLink className="nav-link text-dark" to="/products?category=pizza">
                🍕 Pizza
              </NavLink>
            </li>
            <li className="nav-item mb-1">
              <NavLink className="nav-link text-dark" to="/products?category=drinks">
                🥤 Drinks
              </NavLink>
            </li>
            <li className="nav-item mb-1">
              <NavLink className="nav-link text-dark" to="/products?category=bread">
                🥖 Bread
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
