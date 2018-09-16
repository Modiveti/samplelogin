import React from "react";
import { Container } from "reactstrap";
import "./PageContainer.css";

//pass in fluid as a prop to get full screen width
const PageContainer = ({ fluid, style, children }) => {
  return (
    <div className="PageContainer" style={style}>
      <Container style={{ height: "100%" }} fluid={fluid}>
        {children}
      </Container>
    </div>
  );
};

export default PageContainer;
