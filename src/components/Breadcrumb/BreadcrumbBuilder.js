import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
// import loginLogo from "../../Images/Login.jpg";
import "./BreadcrumbBuilder.css";

const BreadcrumbBuilder = ({ data }) => {
  return (
    <div className="BreadcrumbBuilder">
      <Breadcrumb>
        {/* <BreadcrumbItem>
          <Link className="breadcrumb-link" to="/">
            <img alt="Home logo" src={loginLogo} className="home-img" />
          </Link>
        </BreadcrumbItem> */}
        {data.map(i => (
          <BreadcrumbItem key={i.linkTo}>
            {i.active && i.name}
            {!i.active && (
              <Link className="breadcrumb-link" to={i.linkTo}>
                {i.name}
              </Link>
            )}
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbBuilder;
