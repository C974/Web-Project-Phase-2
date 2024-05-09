"use client";

import Footer from "@/app/common/Footer";
import Navbar from "@/app/common/Navbar";
import { useEffect, useState } from "react";

const SalesHistory = () => {
  const [mySales, setMySales] = useState([]);
  const currentSeller = localStorage.getItem("userMail");
  useEffect(() => {
    fetch(`/api/purchases/seller/${currentSeller}`)
      .then((response) => response.json())
      .then((data) => setMySales(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  return (
    <>
      <Navbar />
      <h2 className="text-3xl text-center py-6">MY Sales</h2>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 py-8">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Buyer
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {mySales.map((item, index) => (
              <tr
                key={index}
                className="bg-white bSales-b dark:bg-gray-800 dark:bSales-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.productName}
                </td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.mobileNumber}</td>
                <td className="px-6 py-4">{item.city}</td>
                <td className="px-6 py-4">${item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default SalesHistory;
