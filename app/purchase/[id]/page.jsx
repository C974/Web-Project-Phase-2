"use client";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../../common/Footer";
import Navbar from "../../common/Navbar";

const Purchase = ({ params }) => {
  const productName = decodeURIComponent(params.id);

  const [filteredProduct, setFilteredProduct] = useState({});
  const [buyer, setBuyer] = useState({});
  const [seller, setSeller] = useState([]);

  const currentBuyer = localStorage.getItem("userMail");

  const [purchaseData, setPurchaseData] = useState({
    name: "",
    address: "",
    mobileNumber: "",
    city: "",
    quantity: 1,
    price: 0,
    buyerEmail: currentBuyer,
    sellerEmail: "",
    productName: "",
  });

  useEffect(() => {
    fetch(`/api/products/${productName}`)
      .then((response) => response.json())
      .then((data) => setFilteredProduct(data[0]))
      .catch((error) => console.error("Error fetching users:", error));
  }, [productName]);

  useEffect(() => {
    if (filteredProduct) {
      const email = filteredProduct?.sellerEmail;

      fetch(`/api/users/seller/${email}`)
        .then((response) => response.json())
        .then((data) => setSeller(data))
        .catch((error) => console.error("Error fetching users:", error));
    }
  }, [filteredProduct]);

  useEffect(() => {
    fetch(`/api/users/buyer/${currentBuyer}`)
      .then((response) => response.json())
      .then((data) => setBuyer(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [currentBuyer]);

  const handleChange = (e) => {
    if (filteredProduct) {
      const value =
        e.target.name === "quantity"
          ? parseInt(e.target.value)
          : e.target.value;
      setPurchaseData({
        ...purchaseData,

        [e.target.name]: value,

        sellerEmail: filteredProduct?.sellerEmail,
        price: filteredProduct?.productPrice,
        productName: filteredProduct?.productName,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      filteredProduct?.productQuantity - purchaseData.quantity < 1 ||
      purchaseData.price * purchaseData.quantity > buyer?.balance
    ) {
      toast.error("You cannot buy this products", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          setTimeout(() => {
            window.location.href = "/products";
          }, 2000);
        },
      });
    } else {
      try {
        const response = await fetch("/api/purchases", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(purchaseData),
        });

        if (response.ok) {
          toast.success("Product Purchases Successfully!!!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          const totalPrice = purchaseData.price * purchaseData.quantity;

          if (buyer) {
            const response = await fetch(`/api/users/buyer/${buyer?.email}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ balance: (buyer.balance -= totalPrice) }),
            });
          }

          if (seller) {
            const email = filteredProduct?.sellerEmail;
            const newBalance = (seller[0].balance += totalPrice);

            const response = await fetch(`/api/users/seller/${email}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ balance: newBalance }),
            });
          }
          if (seller) {
            let oldQuantity = filteredProduct?.productQuantity;
            const newQuantity = (oldQuantity -= purchaseData.quantity);

            const response = await fetch(
              `/api/products/${filteredProduct?.id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  productQuantity: newQuantity,
                }),
              }
            );
          }

          window.location.href = "/products/myorder";
        } else {
          throw new Error("Failed to add User");
        }
      } catch (error) {
        console.error("Error adding user:", error);
        alert("Failed to add user");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container purchase__form-container">
        <h1>Enter Purchase Details</h1>
        <h1>Net balance: ${buyer?.balance}</h1>
        <form id="purchaseForm">
          <div className="purchase__form">
            <div>
              <label for="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="name"
                placeholder={buyer?.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label for="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={handleChange}
                required
                placeholder="House no. / building / street / area"
              />
            </div>
            <div>
              <label for="mobileNumber">Mobile Number</label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                onChange={handleChange}
                required
                placeholder="Mobile Number"
              />
            </div>
            <div>
              <label for="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                onChange={handleChange}
                required
                placeholder="City"
              />
            </div>
          </div>
          <div>
            <label for="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={purchaseData.quantity}
              name="quantity"
              min={1}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" onClick={handleSubmit}>
            Purchase
          </button>
        </form>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Purchase;
