import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getLoginInfo } from '../../actions/loginAcctions';
import { selectUserInputData } from '../../selectors/loginSelectors';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import ReactLoading from "react-loading";

import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
      loading: false,
      errorInfo: ""
    };
  }

  validateForm() {
    return this.state.userName.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  loadingIndicator = (loading) => {
    if(loading) {
      return ( <ReactLoading className="Spinner" type="spin" color="#D2B48C" height={60} width={40} /> );
    }
    return null;
  }

  userLogin = () => {
    this.setState({ loading: true})
    let { userName, password } = this.state;
    let userInfo={};
    userInfo.userName = userName;
    userInfo.passWord = password;
    this.props.actions.getLoginInfo(userInfo);
  }

  componentWillReceiveProps(nextProps) {
    let userDetails = nextProps.userDetails;
    this.setState({ loading: !this.state.loading})
    if(userDetails) {
      if(userDetails.passWord !== "Didn't Match" && userDetails.userName !== "Didn't Match") {
        this.props.history.push("/SearchPage")
      } else if(userDetails.userName !== "Didn't Match") {
          this.setState({ errorInfo: "Password Didn't Match with Birth Year"  })
      } else {
        this.setState({ errorInfo: "UserName Didn't Match with name" })
      }
    }
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="userName" bsSize="large">
            <ControlLabel>UserName</ControlLabel>
            <FormControl
              autoFocus
              value={this.state.userName}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            onClick={this.userLogin}
          >
            Login
          </Button>
        </form>
          {this.loadingIndicator(this.state.loading)}
          <div className="ErrorInfo">
            {this.state.errorInfo}
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userDetails: selectUserInputData(state),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    getLoginInfo
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
