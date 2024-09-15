// import axios from "axios";
// import { useEffect, useState } from "react";
// import ProductCard from "../components/ProductCard";
// import CategoryDropdown from "../components/CategoryChips";
// import Header from "../components/Header";

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [chosenCategory, setChosenCategory] = useState("All");
//   const [sortOption, setSortOption] = useState("default"); // New state for sorting
//   const [loadingProducts, setLoadingProducts] = useState(true);
//   const [loadingCategories, setLoadingCategories] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const sortParams =
//       sortOption === "default" ? "" : `&sortBy=${sortOption}&order=asc`;
//     const url =
//       chosenCategory === "All"
//         ? `https://dummyjson.com/products?${sortParams}`
//         : `https://dummyjson.com/products/category/${chosenCategory}?${sortParams}`;

//     axios
//       .get(url)
//       .then((res) => {
//         setProducts(res.data.products);
//         setLoadingProducts(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching products:", err);
//         setError("Failed to load products.");
//         setLoadingProducts(false);
//       });
//   }, [chosenCategory, sortOption]);

//   useEffect(() => {
//     axios
//       .get("https://dummyjson.com/products/categories")
//       .then((res) => {
//         setCategories(res.data);
//         setLoadingCategories(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching categories:", err);
//         setError("Failed to load categories.");
//         setLoadingCategories(false);
//       });
//   }, []);

//   if (loadingProducts || loadingCategories) {
//     return (
//       <div className="loader-container">
//         <div className="dot"></div>
//         <div className="dot"></div>
//         <div className="dot"></div>
//         <div className="dot"></div>
//         <style>
//           {`
//             .loader-container {
//               position: fixed;
//               top: 0;
//               left: 0;
//               right: 0;
//               bottom: 0;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               background-color: rgba(255, 255, 255, 0.8);
//               z-index: 1000;
//             }

//             .dot {
//               position: relative;
//               width: 20px;
//               height: 20px;
//               margin: 5px;
//               border-radius: 50%;
//               background-color: black;
//               animation: bounce 1.2s infinite ease-in-out;
//             }

//             .dot:nth-child(2) {
//               animation-delay: -0.4s;
//             }

//             .dot:nth-child(3) {
//               animation-delay: -0.8s;
//             }

//             @keyframes bounce {
//               0%, 20%, 50%, 80%, 100% {
//                 transform: translateY(0);
//               }
//               40% {
//                 transform: translateY(-30px);
//               }
//               60% {
//                 transform: translateY(-15px);
//               }
//             }
//           `}
//         </style>
//       </div>
//     );
//   }

//   if (error) {
//     return <h1>{error}</h1>;
//   }

//   return (
//     <>
//       <Header />
//       <div className="container mx-auto mt-20">
//         <div className="my-4 flex h-12 gap-4">
//           <CategoryDropdown
//             categories={categories}
//             chosenCategory={chosenCategory}
//             onCategoryChange={setChosenCategory}
//           />
//           <div className="relative inline-block w-full max-w-xs">
//             <select
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//               className="block w-full h-10 px-4 rounded-md border border-gray-300 bg-white text-black focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300"
//             >
//               <option value="default">Default Sort</option>
//               <option value="title">Sort by Title</option>
//               <option value="price">Sort by Price</option>
//               {/* Add more sorting options if needed */}
//             </select>
//           </div>
//         </div>
//         <div className="flex flex-wrap -m-4 my-4">
//           {products.length > 0 ? (
//             products.map((item) => <ProductCard item={item} key={item.id} />)
//           ) : (
//            <>
//             <Header/>
//             <h2 className="mt-24">No products available.</h2>
//            </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Products;

// 'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../components/ProductCard";
import CategoryDropdown from "../components/CategoryChips";
import Header from "../components/Header";
import { FaSort, FaSearch } from "react-icons/fa";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chosenCategory, setChosenCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const sortParams =
      sortOption === "default" ? "" : `&sortBy=${sortOption}&order=asc`;
    const url =
      chosenCategory === "All"
        ? `https://dummyjson.com/products?${sortParams}`
        : `https://dummyjson.com/products/category/${chosenCategory}?${sortParams}`;

    axios
      .get(url)
      .then((res) => {
        setProducts(res.data.products);
        setLoadingProducts(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
        setLoadingProducts(false);
      });
  }, [chosenCategory, sortOption]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => {
        setCategories(res.data);
        setLoadingCategories(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
        setLoadingCategories(false);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loadingProducts || loadingCategories) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-red-500 text-center mt-20"
      >
        {error}
      </motion.h1>
    );
  }

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto mt-24 px-4"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="my-4 flex flex-col md:flex-row gap-4"
        >
          <CategoryDropdown
            categories={categories}
            chosenCategory={chosenCategory}
            onCategoryChange={setChosenCategory}
          />
          <div className="relative inline-block w-full md:w-64">
            <FaSort className="absolute top-3 left-3 text-gray-400" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="block w-full h-10 pl-10 pr-4 rounded-md border border-gray-300 bg-white text-black focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300"
            >
              <option value="default">Default Sort</option>
              <option value="title">Sort by Title</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
          <div className="relative inline-block w-full md:w-64">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full h-10 pl-10 pr-4 rounded-md border border-gray-300 bg-white text-black focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300"
            />
          </div>
        </motion.div>
        <AnimatePresence>
          {filteredProducts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredProducts.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ProductCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-xl font-semibold text-center mt-8 text-gray-600"
            >
              No products available.
            </motion.h2>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default Products;
