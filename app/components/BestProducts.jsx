import { useEffect, useState } from "react";

const BestProducts = () => {
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products/bestproducts")
      .then((response) => response.json())
      .then((data) => setBestProducts(data))
      .catch((error) => console.error("Error fetching buyers:", error));
  }, []);

  console.log(bestProducts);
  return (
    <div className="py-10">
      <p className="text-4xl font-bold text-center uppercase py-6">Best sale</p>
      <div className="grid grid-cols-3 gap-4">
        {bestProducts?.map((item, index) => (
          <div
            key={index}
            className="h-full w-full px-6 py-10 rounded-md shadow-2xl border border-gray-200 flex flex-col items-center justify-center gap-4"
          >
            <div>
              <img src={item.productData[0].productImg} alt="" />
            </div>
            <p className="text-2xl font-semibold text-center">
              {item.productData[0].productName}
            </p>
            <p className="text-lg font-semibold text-center">
              price:{" "}
              <span className="text-green-600 pl-2">
                {item.productData[0].productPrice}
              </span>
            </p>
            <p className="text-lg font-semibold text-center">
              avialable:
              <span className="text-green-600 pl-2">
                {item.productData[0].productQuantity}
              </span>
            </p>
            <p className="text-lg font-semibold text-center">
              Date:
              <span className="text-red-600 pl-2">
                {item.productData[0].createdAt.substring(0, 10)}
              </span>
            </p>
            <p className="text-sm font-semibold text-center">
              Seller Email:
              <span className="text-green-600 pl-2">
                {item.productData[0].sellerEmail}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestProducts;
