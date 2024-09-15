import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { CartContext } from "../components/CartContext";

function ProductsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [notfound, setNotfound] = useState(false);

  useEffect(() => {
    setNotfound(false);
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoadingProducts(false);
      })
      .catch(() => {
        setNotfound(true);
        setLoadingProducts(false);
      });
  }, [id]);

  const handleBackClick = () => {
    navigate("/products");
  };

  const { addItemToCart, removeItemFromCart, cart } = useContext(CartContext);

  const isInCart = cart.items.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addItemToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeItemFromCart(product.id);
  };

  return (
    <div className="container mx-auto">
      {loadingProducts ? (
        <div className="loader-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <style>
            {`
              .loader-container {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgba(255, 255, 255, 0.8);
                z-index: 1000;
              }

              .dot {
                position: relative;
                width: 20px;
                height: 20px;
                margin: 5px;
                border-radius: 50%;
                background-color: black;
                animation: bounce 1.2s infinite ease-in-out;
              }

              .dot:nth-child(2) {
                animation-delay: -0.4s;
              }

              .dot:nth-child(3) {
                animation-delay: -0.8s;
              }

              @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                  transform: translateY(0);
                }
                40% {
                  transform: translateY(-30px);
                }
                60% {
                  transform: translateY(-15px);
                }
              }
            `}
          </style>
        </div>
      ) : notfound ? (
        <>
          <Header />
          <div className="container mx-auto flex flex-col items-center justify-center h-screen">
            <Link
              to="/products"
              className="flex items-center mt-5 text-gray-800 dark:text-black mb-4"
            >
              <svg
                className="w-6 h-6 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m15 19-7-7 7-7"
                />
              </svg>
              Back to Products
            </Link>
            <div className="text-center">
              <img
                src="https://th.bing.com/th/id/OIP.5m7WTZOic_ntpvVlXxeNLwAAAA?w=360&h=360&rs=1&pid=ImgDetMain"
                alt=""
                className="mx-auto"
              />
              <h1 className="text-2xl font-semibold mt-4">Data Not Found</h1>
            </div>
          </div>
        </>
      ) : (
        <>
          <Header />
          <div className="flex items-center mt-5">
            {/* <Link to="/products">
              <button className="flex items-center text-gray-800 dark:text-black">
                <svg
                  className="w-6 h-6 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m15 19-7-7 7-7"
                  />
                </svg>
                Back to Products
              </button>
            </Link> */}
          </div>
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <Link to="/main">
                <button className="flex items-center text-gray-800 dark:text-black">
                  <svg
                    className="w-6 h-6 mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m15 19-7-7 7-7"
                    />
                  </svg>
                  Back
                </button>
              </Link>
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    {product.category}
                  </h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                    {product.title}
                  </h1>
                  <div className="flex mb-4">
                    <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                      Description
                    </a>
                    <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                      Reviews
                    </a>
                    <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">
                      Details
                    </a>
                  </div>
                  <p className="leading-relaxed mb-4">{product.description}</p>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Color</span>
                    <span className="ml-auto text-gray-900">Blue</span>
                  </div>
                  <div className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">Size</span>
                    <span className="ml-auto text-gray-900">Medium</span>
                  </div>
                  <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                    <span className="text-gray-500">Quantity</span>
                    <span className="ml-auto text-gray-900">4</span>
                  </div>
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900">
                      ${product.price}
                    </span>
                    {isInCart ? (
                      <button
                        className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                        onClick={handleRemoveFromCart}
                      >
                        Remove from Cart
                      </button>
                    ) : (
                      <button
                        className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
                <img
                  alt="ecommerce"
                  className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                  src={product.thumbnail}
                />
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default ProductsDetail;
