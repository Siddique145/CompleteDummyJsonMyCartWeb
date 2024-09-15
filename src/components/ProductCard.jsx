import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CartContext } from "./CartContext";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

function ProductCard({ item }) {
  const { thumbnail, price, category, title, id } = item;
  const { cart, addItemToCart, removeItemFromCart } = useContext(CartContext);

  const isInCart = cart.items.some((cartItem) => cartItem.id === id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (isInCart) {
      removeItemFromCart(id);
    } else {
      addItemToCart(item);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center p-4"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-sm"
      >
        <Link to={`/products/${id}`} className="block relative">
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-64 overflow-hidden"
          >
            <img
              alt={title}
              className="object-cover object-center w-full h-full"
              src={thumbnail}
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white text-black py-2 px-4 rounded-full font-semibold"
              >
                View Details
              </motion.button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="p-4"
          >
            <h3 className="text-xs text-indigo-500 tracking-widest uppercase mb-1">
              {category}
            </h3>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h2>
            <p className="text-xl font-bold text-indigo-600">${price}</p>
          </motion.div>
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="p-4 pt-0 flex justify-between items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className={`py-2 px-4 rounded-full font-semibold text-white flex items-center gap-2 ${
              isInCart
                ? "bg-red-500 hover:bg-red-600"
                : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            <FaShoppingCart />
            {isInCart ? "Remove" : "Add to Cart"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            <FaHeart />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default ProductCard;
