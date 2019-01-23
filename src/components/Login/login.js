import React, { Component } from "react";
import {
  Wrapper,
  Title,
  StyledInput,
  StyledButton,
  StyledForm
} from "./login_styles";
import axios from "axios";

class Login extends Component {
  state = {
    login: "",
    password: ""
  };

  componentWillMount() {
    if (localStorage.getItem("token")) {
      this.props.history.push("/dashboard");
    }
  }

  handleLogin = e => {
    this.setState({ login: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  loginFunc = async event => {
    event.preventDefault();
    const { login, password } = this.state;
    const form = {
      login,
      password
    };
    if (login.length > 0 && password.length > 0) {
      try {
        const response = await axios({
          method: "post",
          url: "/login",
          data: form,
          config: { headers: { "Content-Type": "aplication/json" } }
        });
        localStorage.setItem("login", response.data.login);
        localStorage.setItem("token", response.data.token);
        this.props.history.push("/dashboard");

        console.log(response.data);
      } catch (err) {
        switch (err.response.status) {
          case 401:
            alert("Invalid login or password.");
            window.location.reload();
            break;
          default:
            alert("Something went wrong, please try again.");
            window.location.reload();
        }
      }
    } else {
      alert("Fulfill all inputs.");
    }
  };

  render() {
    return (
      <Wrapper>
        <StyledForm onSubmit={this.loginFunc}>
          <Title>Messenger</Title>
          <StyledInput
            onChange={e => {
              this.handleLogin(e);
            }}
            placeholder="Enter login"
          />
          <StyledInput
            type="password"
            onChange={e => {
              this.handlePassword(e);
            }}
            placeholder="Enter password"
          />
          <StyledButton>LOGIN</StyledButton>
        </StyledForm>
      </Wrapper>
    );
  }
}

export default Login;
