import React, { Component } from "react";
import {
  Wrapper,
  Logout,
  Content,
  StyledTabs,
  StyledTab,
  From,
  Message,
  MessageWrapper,
  StyledTextArea
} from "./dashboard_styles";
import axios from "axios";
import { StyledInput, StyledForm, StyledButton } from "../Login/login_styles";

class Dashboard extends Component {
  state = {
    login: "",
    token: "",
    user: "",
    message: "",
    messages: []
  };

  componentWillMount() {
    this.setState({
      login: localStorage.getItem("login"),
      token: localStorage.getItem("token")
    });
  }

  componentDidMount() {
    const { token } = this.state;
    if (!token) {
      this.props.history.push("/");
    }
    this.getAllMessages();
  }

  getAllMessages = async () => {
    const { login, token } = this.state;
    const form = {
      login,
      token
    };

    try {
      const response = await axios({
        method: "post",
        url: `/getmessages`,
        data: form,
        config: { headers: { "Content-Type": "application/json" } }
      });
      this.setState({ messages: response.data.messages });
    } catch (err) {
      switch (err.response.status) {
        case 401:
          alert("Invalid login or token.");
          window.location.reload();
          break;
        default:
          alert("Something went wrong, please try again.");
          window.location.reload();
      }
    }
  };

  handleLogout = async event => {
    event.preventDefault();
    const { login, token } = this.state;
    const form = {
      login,
      token
    };

    try {
      axios({
        method: "post",
        url: "/logout",
        data: form,
        config: { headers: { "Content-Type": "aplication/json" } }
      });
      alert("You have been successfully logged out!");
      localStorage.removeItem("login");
      localStorage.removeItem("token");
      this.props.history.push("/");
    } catch (err) {
      switch (err.response.status) {
        case 401:
          alert("Invalid login or token.");
          window.location.reload();
          break;
        default:
          alert("Something went wrong, please try again.");
          window.location.reload();
      }
    }
  };

  handleFrom = e => {
    this.setState({ user: e.target.value });
  };

  handleMessage = e => {
    this.setState({ message: e.target.value });
  };

  sendMessage = async event => {
    event.preventDefault();
    const { login, token, user, message } = this.state;
    const form = {
      login,
      token,
      user,
      message
    };
    console.log(form);

    if (user.length > 0 || message.length > 0) {
      try {
        await axios({
          method: "post",
          url: "/sendmessage",
          data: form,
          config: { headers: { "Content-Type": "aplication/json" } }
        });
        alert("Message has been sent.");
        window.location.reload();
      } catch (err) {
        switch (err.response.status) {
          case 401:
            alert("Invalid login or token.");
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
    const { login, messages } = this.state;
    return (
      <Wrapper>
        <div style={{ borderBottom: "1px solid black", padding: 8 }}>
          {login}
          <Logout onClick={this.handleLogout}>Logout</Logout>
        </div>
        <Content>
          <StyledTabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <StyledTab eventKey={1} title="Get Messages">
              {messages.map(item => (
                <MessageWrapper>
                  <From>
                    <b>From:</b> {item.from}
                  </From>
                  <Message>
                    <b>Message:</b> {item.message}
                  </Message>
                </MessageWrapper>
              ))}
            </StyledTab>
            <StyledTab eventKey={2} title="Send Message">
              <StyledForm onSubmit={this.sendMessage}>
                <StyledInput
                  onChange={e => {
                    this.handleFrom(e);
                  }}
                  placeholder="Message to:"
                />
                <StyledTextArea
                  onChange={e => {
                    this.handleMessage(e);
                  }}
                  placeholder="Message:"
                  maxLength={255}
                />
                <StyledButton>Send</StyledButton>
              </StyledForm>
            </StyledTab>
          </StyledTabs>
        </Content>
      </Wrapper>
    );
  }
}

export default Dashboard;
