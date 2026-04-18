import React, { useState } from 'react';

const AddItem = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('pizza');
  const [image, setImage] = useState('');

  const categories = ['pizza', 'drinks', 'bread', 'dessert'];

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: Date.now(),
      name,
      description,
      price: parseFloat(price),
      category,
      img: image
    };

    const existingItems = JSON.parse(localStorage.getItem('items') || '[]');
    existingItems.push(newItem);
    localStorage.setItem('items', JSON.stringify(existingItems));

    console.log("New Item Added:", newItem);
    alert("Item added successfully!");

    // Reset form
    setName('');
    setDescription('');
    setPrice('');
    setCategory('pizza');
    setImage('');
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

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
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