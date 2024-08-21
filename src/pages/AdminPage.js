import React from 'react';
import ApprovalSection from "../components/admin/approval/ApprovalSection";
import {Outlet} from "react-router-dom";

const AdminPage = () => {
  return (
    <>
      <ApprovalSection />
        <Outlet/>
    </>
  );
};

export default AdminPage;