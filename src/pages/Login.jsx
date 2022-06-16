import React, { Component } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

import Layout from "../components/Layout";
import { withRouter } from "../utils/navigation";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleSubmit() {
    axios
      .post(
        "https://alta-kitchen-sink.herokuapp.com/api/v1/login",
        {
          email: this.state.email,
          password: this.state.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const { data } = res;
        localStorage.setItem("userToken", JSON.stringify(data.data.token));
        alert(data.message);
        this.props.navigate("/homepage", { replace: true });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { email, password } = this.state;

    return (
      <Layout>
        <div className="flex flex-col justify-center items-center h-full">
          <TextField
            className="w-1/2"
            id="input-email"
            label="Email"
            variant="outlined"
            value={email}
            type="email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <TextField
            className="w-1/2"
            id="input-password"
            label="Password"
            variant="outlined"
            value={password}
            type="password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <p>Lupa password? klik disini</p>
          <Button
            variant="contained"
            onClick={() => this.handleSubmit()}
            disabled={email.length === 0 || password.length === 0}
          >
            Login
          </Button>
        </div>
      </Layout>
    );
  }
}

export default withRouter(Login);
