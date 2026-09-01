
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;