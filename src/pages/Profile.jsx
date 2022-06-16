import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

import Layout from "../components/Layout";
import { withRouter } from "../utils/navigation";

class Profile extends Component {
  state = {
    email: "",
    first_name: "",
    last_name: "",
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios
      .get("https://alta-kitchen-sink.herokuapp.com/api/v1/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("userToken")
          )}`,
        },
      })
      .then((res) => {
        const { data } = res;
        this.setState({
          email: data.data.email,
          first_name: data.data.first_name,
          last_name: data.data.last_name,
        });
      })
      .catch((err) => {
        const { response } = err;
        alert(response.statusText);
        if (response.status === 401) {
          localStorage.removeItem("userToken");
          this.props.navigate("/login", { replace: true });
        }
      });
  }

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
    const { email, first_name, last_name } = this.state;

    if (JSON.parse(localStorage.getItem("userToken"))) {
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
              id="input-first-name"
              label="First Name"
              variant="outlined"
              value={first_name}
              onChange={(e) => this.setState({ first_name: e.target.value })}
            />
            <TextField
              className="w-1/2"
              id="input-last-name"
              label="Last Name"
              variant="outlined"
              value={last_name}
              onChange={(e) => this.setState({ last_name: e.target.value })}
            />
            <Button
              variant="contained"
              onClick={() => this.handleSubmit()}
              disabled={
                email.length === 0 ||
                first_name.length === 0 ||
                last_name.length === 0
              }
            >
              Login
            </Button>
          </div>
        </Layout>
      );
    } else {
      return <Navigate to="/login" />;
    }
  }
}

export default withRouter(Profile);
