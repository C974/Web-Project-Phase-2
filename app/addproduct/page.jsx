/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Footer from "@/app/common/Footer";
import Navbar from "@/app/common/Navbar";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const AddProduct = () => {
  const currentSeller = localStorage.getItem("userMail");
  const [productData, setProductData] = useState({
    productName: "",
    productImg: "",
    productPrice: 0,
    productQuantity: 0,
    productDesc: "",
    sellerEmail: currentSeller,
  });

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };
  const handleProductSubmit = async (e) => {
    productData.productPrice = parseInt(productData.productPrice);
    productData.productQuantity = parseInt(productData.productQuantity);
    e.preventDefault();
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        toast.success("Product added successfully!!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.href = "/products";
      }
    } catch (error) {
      console.error("Error adding Product:", error);
      alert("Failed to add Product");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container purchase__form-container">
        <h1>Enter Product Details</h1>
        <form>
          <div className="purchase__form">
            <div>
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                id="productName"
                name="productName"
                onChange={handleChange}
                required
                placeholder="Product Name"
              />
            </div>

            <div>
              <label htmlFor="productImg">Product Image</label>
              <input
                type="text"
                id="productImg"
                name="productImg"
                onChange={handleChange}
                required
                placeholder="Product Img"
              />
            </div>
            <div>
              <label htmlFor="productPrice">Product Price</label>
              <input
                type="number"
                id="productPrice"
                onChange={handleChange}
                name="productPrice"
                required
                placeholder="Product Price"
              />
            </div>
            <div>
              <label htmlFor="productPrice">Product Quantity</label>
              <input
                type="number"
                id="productQuantity"
                onChange={handleChange}
                name="productQuantity"
                required
                placeholder="Product Quantity"
              />
            </div>
          </div>
          <div>
            <label htmlFor="productDesc">Product Description</label>
            <textarea
              id="productDesc"
              name="productDesc"
              onChange={handleChange}
              rows="6"
            ></textarea>
          </div>
        </form>
        <button onClick={handleProductSubmit}>Add Product</button>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default AddProduct;
