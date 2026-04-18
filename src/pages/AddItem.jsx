import React, { useState } from "react";

const AddItem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(""); // ✅ added
  const [category, setCategory] = useState("pizza");
  const [image, setImage] = useState("");

  const categories = ["pizza", "drinks", "bread", "dessert"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
      category,
      image, // ✅ correct key
    };

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8145/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      alert("Item added successfully!");

      // Reset form
      setName("");
      setPrice("");
      setStock("");
      setCategory("pizza");
      setImage("");

    } catch (error) {
      console.error(error);
      alert("Error adding item");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add New Item</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">

        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Item Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* ✅ Stock (new UI) */}
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Image URL */}
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>

        {/* Preview */}
        {image && (
          <div className="mb-3 text-center">
            <img
              src={image}
              alt="Preview"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              className="rounded"
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;