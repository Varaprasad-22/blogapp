import { Outlet } from "react-router-dom";
import Header from "./components/header/header";

import Footer from "./components/footer/footer";

function RootLayout() {
  return (
    <div>
      <Header />
      <div style={{ minHeight: "70vh" }}>
        <div className="x">
          {" "}
          <Outlet />
        </div>
      </div>
      <div style={{ marginTop: "100px" }}>
        <Footer />
      </div>
    </div>
  );
}

export default RootLayout;