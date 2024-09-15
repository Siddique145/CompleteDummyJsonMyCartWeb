import Header from "../components/Header";
import Products from "./Products";

function Home() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* <Route path='/' element={<Signup/>}></Route> */}
          {/* <Route path="/" element={<Home/>}></Route> */}
          {/* <Route path="/products" element={<Products />}></Route>
          <Route path="/products/:id" element={<ProductsDetail />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Home;
