import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid py-5">
      <div className="row align-items-center">

        {/* LEFT - Image */}
        <div className="col-md-6 text-center">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
            alt="Food"
            className="img-fluid rounded"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>

        {/* RIGHT - Content */}
        <div className="col-md-6">

          <h1 className="fw-bold">
            Happy With <span className="text-warning">Delicious Food</span> And Get New Experiences With Asian Food
          </h1>

          <p className="text-muted mt-3">
            Exploring new food with different tradition from all Asian country especially from Cambodia that you can try at this place and get a good price from us as well we will make a good impact to our customers.
          </p>

          <div className="mt-4 d-flex gap-3">

            {/* ✅ Order Food Button */}
            <button
              className="btn btn-warning px-4"
              onClick={() => navigate("/products")}
            >
              Order Food 🛒
            </button>

            {/* ✅ Learn More Button */}
            <button
              className="btn btn-outline-dark px-4"
              onClick={() => navigate("/products")}
            >
              Learn More
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;