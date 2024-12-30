import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { GoBell } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { Modal, Input } from "antd";
import "../../styles/Header/Header.scss";
import SidebarComponent from "../Sidebar/Sidebar";
import { useSearchContext } from "../../Components/SearchContext/SearchProvider";
const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { showSearch } = useSearchContext(); // Get the value of showSearch
  const showModal = () => {
    setIsModalOpen(true);
  };

  // console.log(showSearch);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="main-header">
      <div
        className="menu-icon"
        //onClick={showModal}
      >
        <FiMenu size={30} />
      </div>
      <div className="haeder-content">
        {showSearch ? (
          <div className="search">
            <Input
              placeholder="Search here"
              prefix={<IoSearchOutline className="w-[20px] h-[20px]" />}
              className="custom-input"
            />
          </div>
        ) : (
          <div style={{ flexGrow: 1 }}></div>
        )}
        <div className="right-icons">
          <div className="notify">
            <GoBell className="cursor-set w-[20px] h-[20px]" />
          </div>
          <div className="user-a">A</div>
        </div>
      </div>
      <Modal
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="sidebar-modal"
        closable={false}
      >
        <SidebarComponent />
      </Modal>
    </div>
  );
};

export default Header;
