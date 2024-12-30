import { Table, Dropdown, Menu, Switch } from "antd";
import "../../../styles/table/table.scss";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";

const CustomTable = ({
  columns,
  data,
  dropdownItems = [],
  onDropdownAction,
  showSwitch = false,
  switchProps = {},
  onDelete,
  showDeleteIcon = false,
  DeleteIcon,
  onRowClick
}) => {
  const handleDropdownClick = (item, record, event) => {
    if (event && event.stopPropagation) {
      event.stopPropagation(); // Prevent row click when action button is clicked
    }
    if (onDropdownAction) {
      onDropdownAction(item, record);
    }
  };

  const getDropdownItems = (record) => {
    if (record.isBlocked) {
      return dropdownItems.map((item) => (item === "Block" ? "Unblock" : item));
    }
    return dropdownItems;
  };

  const renderActionColumn = (text, record) => (
    <div className="action-cell" onClick={(e) => e.stopPropagation()}>
      {showSwitch ? (
        <Switch
          {...switchProps}
          checked={record.switchChecked}
          onChange={(checked) => {
            if (switchProps.onChange) {
              switchProps.onChange(checked, record);
            }
          }}
        />
      ) : (
        <>
          {showDeleteIcon ? (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onDelete(record);
              }}
              className="deleteStyle"
            >
              <DeleteIcon />
            </span>
          ) : (
            <Dropdown
              className="menu"
              overlay={
                <Menu>
                  {getDropdownItems(record).length > 0 ? (
                    getDropdownItems(record).map((item, index) => (
                      <Menu.Item
                        key={index}
                        className="menu-item"
                        onClick={(e) => handleDropdownClick(item, record, e)} // Ensure event is passed here
                      >
                        {item}
                      </Menu.Item>
                    ))
                  ) : (
                    <Menu.Item key="no-action" disabled>
                      No actions available
                    </Menu.Item>
                  )}
                </Menu>
              }
              trigger={["click"]}
            >
              <PiDotsThreeOutlineVerticalBold className="cursor-sett" />
            </Dropdown>
          )}
        </>
      )}
    </div>
  );

  const dynamicColumns = columns.map((col) => {
    if (col.key === "action") {
      return { ...col, render: renderActionColumn };
    }
    return col;
  });

  return (
    <div className="table-container w-full  h-full">
      <Table
        // tableLayout="fixed"
        columns={dynamicColumns}
        dataSource={data.map((item, index) => ({ ...item, key: index + 1 }))}
        pagination={true}
        bordered
        rowClassName={(record, index) =>
          index % 2 === 0 ? "even-row" : "odd-row"
        }
        headerRowClassName="custom-header"
        onRow={(record) => ({
          onClick: () => onRowClick && onRowClick(record)
        })}
      />
    </div>
  );
};

export default CustomTable;
