import React, { useState } from 'react'

function ProductsWithoutLibrary() {
  const [product, setProduct] = useState({ name: '', price: '', category: '', description: '', instock: false });
  const [errors, setErrors] = useState({})
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(product);

    if (!validate()) return;

    console.log('Submitting', product);

    fetch("https://api.oluwasetemi.dev/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...product,
        price: Number(product.price)
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log('Created Product Successfully:', data);


      })
      .catch(err => {
        console.error("Error:", err)
      })

  }

  const validate = () => {
    const newErrors = {};

    if (!product.name) newErrors.name = 'Please Input your name';
    if (!product.category) newErrors.category = 'Please input your category';
    if (!product.price || product.price <= 0)
      newErrors.price = 'Let your price be greater than 0';


    setErrors(newErrors)
    return Object.keys(newErrors).length === 0;
  }



  return (
    <div>

      <form onSubmit={handleSubmit}>
        <p>Without Library</p>
        <input type="text" name='name' value={product.name} onChange={handleChange} placeholder="Product Name" />
        {errors && <p style={{ color: 'red' }}>{errors.name}</p>}
        <input type="number" name='price' value={product.price} onChange={handleChange} placeholder="Price" />
        {errors && <p style={{ color: 'red' }}>{errors.price}</p>}
        <input type="text" name='category' value={product.category} onChange={handleChange} placeholder="Category" />
        {errors && <p style={{ color: 'red' }}>{errors.category}</p>}
        <textarea name='description' value={product.description} onChange={handleChange} placeholder="Description"></textarea>
        <input type="checkbox" name='instock' checked={product.instock} onChange={handleChange} /> In Stock
        <button>Create Product</button>
      </form>
    </div>
  )
}

export default ProductsWithoutLibrary