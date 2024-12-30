import { Layout } from "antd";
import Sidebar from "./Sidebar/Sidebar";
import { SearchProvider } from "../Components/SearchContext/SearchProvider";
import Header from "./Header/Header";
import "../styles/Layout.scss";

const { Content } = Layout;

const AppLayout = ({ children }) => {
  return (
    <SearchProvider>
      <div
        className="flex h-[100vh] "
        // className="app-layout"
        // style={{ display: "flex", justifyContent: "space-between" }}
      >
        <aside className=" scrollbar-none relative h-full w-[300px] shadow-custom z-10 flex-shrink-0 overflow-y-auto">
          <Sidebar />
        </aside>
        <main className="min-h-full w-full  flex flex-col bg-[#F5F5F5] overflow-y-auto">
          <Header />
          {children}
        </main>
      </div>
    </SearchProvider>
  );
};

export default AppLayout;
