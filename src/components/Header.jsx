import React, { useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "./CartContext";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, firestore, storage } from "../firebase/Firebase";
import { getDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { FaShoppingCart, FaUser, FaSignOutAlt } from "react-icons/fa";

function Header() {
  const { cart } = useContext(CartContext);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const storedUserInfo = localStorage.getItem("userInfo");

        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo));
        } else if (auth.currentUser) {
          const userDoc = doc(firestore, `users/${auth.currentUser.uid}`);
          const userSnap = await getDoc(userDoc);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            let profilePicUrl = null;

            if (userData.profilePic) {
              try {
                profilePicUrl = await getDownloadURL(
                  ref(storage, userData.profilePic)
                );
              } catch (err) {
                console.error("Error fetching profile picture URL:", err);
              }
            }

            const userWithProfilePic = { ...userData, profilePicUrl };
            setUserInfo(userWithProfilePic);
            localStorage.setItem(
              "userInfo",
              JSON.stringify(userWithProfilePic)
            );
          } else {
            setUserInfo(null);
          }
        } else {
          setUserInfo(null);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("userInfo");
      setUserInfo(null);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center"
          >
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
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 fixed w-full z-20 top-0 start-0 border-b border-gray-200 shadow-lg"
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <motion.a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="https://img.icons8.com/?size=160&id=MKU1TQCqFRQI&format=png"
              className="h-10"
              alt="Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              My Cart
            </span>
          </motion.a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <NavLink to="/cart">
              <motion.button
                disabled
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center flex items-center space-x-2"
              >
                <FaShoppingCart />
                <span>Cart ({totalItems})</span>
              </motion.button>
            </NavLink>
            {userInfo ? (
              <div className="relative flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-3 py-1"
                >
                  {userInfo.profilePicUrl ? (
                    <img
                      src={userInfo.profilePicUrl}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <FaUser className="text-white" />
                  )}
                  <span className="text-white">{userInfo.username}</span>
                </motion.button>
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                      <motion.button
                        whileHover={{ backgroundColor: "#f3f4f6" }}
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaSignOutAlt className="mr-2" />
                        Sign out
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  Login
                </motion.button>
              </NavLink>
            )}
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <motion.ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
              {["Home", "Products", "Services"].map((item, index) => (
                <motion.li
                  key={item}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <NavLink
                    to={item === "Home" ? "/main" : `/${item.toLowerCase()}`}
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded md:p-0 ${
                        isActive
                          ? "text-2xl font-extrabold text-white"
                          : "text-white hover:text-gray-200"
                      }`
                    }
                  >
                    {item}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </motion.nav>
    </>
  );
}

export default Header;
