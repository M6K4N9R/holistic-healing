import BottomNavBar from "./BottomNavBar";

const LayoutNavBar = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <BottomNavBar />
    </>
  );
};

export default LayoutNavBar;
