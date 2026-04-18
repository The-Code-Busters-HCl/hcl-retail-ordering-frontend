import React from 'react';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="row g-4">
      {/* Sidebar column: auto collapses into offcanvas on small screens */}
      <div className="col-md-4 col-lg-3">
        <Sidebar />
      </div>
      
      {/* Main dashboard content */}
      <div className="col-md-8 col-lg-9">
        <h1 className="mb-4">Dashboard</h1>
        <div className="row g-4">
          <div className="col-12 col-md-6 text-center">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Tasks Completed</h5>
                <p className="display-4 text-primary mb-0">12</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 text-center">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Active Projects</h5>
                <p className="display-4 text-success mb-0">3</p>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card shadow-sm mt-3">
              <div className="card-body">
                <h5 className="card-title">Recent Activity</h5>
                <p className="card-text text-muted">
                  You can only see this page if you are logged in. Your private metrics and data go here. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
