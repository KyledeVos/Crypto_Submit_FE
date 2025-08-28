/**
 * @module header.tsx
 * This module provides a header wrapper to provide a consistent header to specified paged
 */
import React from "react";
import "./header.css";

type PageHeaderProps = {
  children: React.ReactNode;
};

const PageHeader: React.FC<PageHeaderProps> = ({ children }) => {
  return (
    <div id="page_header" className="row w-100 d-inline-block bg-dark">
      <div className="col-6 gap-1 text-start d-flex align-items-center h-100 p-2">
        <img src="../../public/Logo.svg" className="mh-100 h-75" />
      </div>
      {children}
    </div>
  );
};

export default PageHeader;
