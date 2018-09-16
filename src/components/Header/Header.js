import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import UserName from "../UserName/UserName";
import appLogo from "../../Images/AppLogo.jpg";
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { getLoginInfo } from '../../actions/loginAcctions';
import { selectUserInputData } from '../../selectors/loginSelectors';
import "./Header.css"

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: ""
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.userDetails) {
            let userDetails = nextProps.userDetails;
            if (userDetails) {
                if (userDetails.passWord !== "Didn't Match" && userDetails.userName !== "Didn't Match") {
                    let userName = userDetails.userName.split(" ")
                    this.setState({
                        firstName: userName[0],
                        lastName: userName[1]
                    })
                }
            }
        }
    }
    render() {
        return(
            <div>
            <Navbar dark className="bg-dark" expand="md">
                <img
                    src={appLogo}
                    alt="App Logo"
                    className="AppLogo"
                />
                <NavbarBrand style={{ color: "white", textAlign: "center", marginLeft: "38%" }}>
                    StarWars
                </NavbarBrand>
                <div style={{ display: "flex", position: "absolute", right: "10px" }}>
                <UserName
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                />
                </div>
            </Navbar>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userDetails: selectUserInputData(state),
  });
  
//   const mapDispatchToProps = (dispatch) => ({
//     actions: bindActionCreators({
//       getLoginInfo
//     }, dispatch),
//   });

export default connect(mapStateToProps, null)(Header);