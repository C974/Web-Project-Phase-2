"use client";

import { useEffect, useState } from "react";

const AllOrderList = () => {
  const [order, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/purchases")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching buyers:", error));
  }, []);
  return (
    <>
      <div className="py-10">
        <p className="text-4xl font-bold text-center uppercase py-6">
          All order List
        </p>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 py-8">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Buyer
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Seller Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Total price
                </th>
              </tr>
            </thead>
            <tbody>
              {order.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.productName}
                  </td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.mobileNumber}</td>
                  <td className="px-6 py-4">{item.city}</td>
                  <td className="px-6 py-4">{item.quantity}</td>
                  <td className="px-6 py-4">{item.sellerEmail}</td>
                  <td className="px-6 py-4">${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllOrderList;
