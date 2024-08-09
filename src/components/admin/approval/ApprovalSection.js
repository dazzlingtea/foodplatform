import React from 'react';
import ApprovalHeader from "./ApprovalHeader";
import ApprovalTable from "./ApprovalTable";

const ApprovalSection = () => {
  return (
    <>
      <h2>스토어 등록 요청</h2>
      <ApprovalHeader />
      <ApprovalTable />
    </>
  );
};

export default ApprovalSection;