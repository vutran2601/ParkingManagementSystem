import React from "react";
import {
  CDBSidebar,
  CDBSidebarHeader,
  CDBSidebarMenuItem,
  CDBSidebarContent,
  CDBSidebarMenu,
  CDBSidebarFooter,
} from "cdbreact";
import { Link } from "react-router-dom";

import Logo from "../../../../assets/images/logo.png";

function Sidebar() {
  return (
    <CDBSidebar
      textColor="#333"
      backgroundColor="#f0f0f0"
      style={{
        height: "100vh",
        position: "-webkit-sticky",
        position: "sticky",
        top: "0",
      }}
    >
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        <div
          className="container"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src={Logo}
            alt=""
            style={{ width: "40px", borderRadius: "180%", marginRight: "5px" }}
          />
          <h6 className="ml-2">Smart Home</h6>
        </div>
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <CDBSidebarMenuItem>Các mục chính</CDBSidebarMenuItem>
          <Link to="/dashboard">
            <CDBSidebarMenuItem icon="th-large">Dashboard</CDBSidebarMenuItem>
          </Link>
          <Link to="/rooms">
            <CDBSidebarMenuItem icon="kaaba" iconType="solid">
              Phòng
            </CDBSidebarMenuItem>
          </Link>
          <Link to="/history">
            <CDBSidebarMenuItem
              icon="scroll"
              iconType="solid"
              style={{ marginBottom: "20px" }}
            >
              Lịch sử
            </CDBSidebarMenuItem>
          </Link>
          <CDBSidebarMenuItem style={{ borderTop: "1px solid #C8CBD9" }}>
            Các mục khác
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="cog" iconType="solid">
            Thiết lập
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="info-circle" iconType="solid">
            Hỗ trợ
          </CDBSidebarMenuItem>
        </CDBSidebarMenu>
      </CDBSidebarContent>
      <CDBSidebarFooter>
        <CDBSidebarMenuItem icon="sign-out-alt" iconType="solid">
          Đăng xuất
        </CDBSidebarMenuItem>
      </CDBSidebarFooter>
    </CDBSidebar>
  );
}

export default Sidebar;
