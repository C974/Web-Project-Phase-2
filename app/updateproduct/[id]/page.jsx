"use client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../../common/Footer";
import Navbar from "../../common/Navbar";

const UpdateProduct = ({ params }) => {
  const productName = decodeURIComponent(params.id);

  const [productData, setProductData] = useState({
    productName: "",
    productImg: "",
    productPrice: 0,
    productQuantity: 0,
    productDesc: "",
    sellerEmail: "",
  });

  useEffect(() => {
    fetch(`/api/products/${productName}`)
      .then((response) => response.json())
      .then((data) => setProductData(data[0]))
      .catch((error) => console.error("Error fetching users:", error));
  }, [productName]);

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
      const response = await fetch(`/api/products/${productData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        toast.success("Product Update Successfully", {
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
      <h2 className="text-3xl text-center py-6">Update Product</h2>
      <form className="container py-6">
        <div className="purchase__form">
          <div>
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName"
              name="productName"
              defaultValue={productData.productName}
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
              defaultValue={productData.productImg}
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
              defaultValue={productData.productPrice}
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
              defaultValue={productData.productQuantity}
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
            defaultValue={productData.productDesc}
            onChange={handleChange}
            rows="6"
          ></textarea>
        </div>

        <button
          className="bg-green-700 px-6 py-2 rounded-lg"
          onClick={handleProductSubmit}
        >
          Add Product
        </button>
      </form>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default UpdateProduct;
