/**
 * @module header.tsx
 * This module provides a header wrapper to provide a consistent header to specified paged
 */
import React from "react";
import "./header.css";
import { useNavigate, Outlet} from "react-router-dom";


const PageHeader: React.FC = () => {
  const nav = useNavigate();
  
  return (
    <div id="page_header" className="row w-100 d-inline-block bg-dark">
      <div className="col-6 col-sm-12 gap-1 text-start d-flex align-items-center h-100 p-2">
          <img role="button" onClick = {() => {nav("/")}} src="../../public/Logo.svg" className="mh-100 h-75" />
          <h1 role="button" onClick = {() => {nav("/")}} className="heading_font">Gold Coin</h1>

      </div>
      <Outlet />
    </div>
  );
};

export default PageHeader;
