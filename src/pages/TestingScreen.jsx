import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import React, { Component } from "react";
import Modal from "@mui/material/Modal";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import axios from "axios";

import Layout from "../components/Layout";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

class TestingScreen extends Component {
  state = {
    data: [],
    title: "WELCOME",
    loading: true,
    openModal: false,
    formTitle: "",
    formBody: "",
    formID: "",
    mode: "create",
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    // GET -> axios.get(url, config?)
    axios
      .get("/posts")
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => this.setState({ loading: false }));
  }

  handleAdd = () => {
    this.setState({
      openModal: true,
      formTitle: "",
      formBody: "",
      formID: "",
      mode: "create",
    });
  };

  handleSubmit = () => {
    // POST -> axios.post(url, data?, config?)
    axios
      .post("/posts", {
        title: this.state.formTitle,
        body: this.state.formBody,
        userId: 1,
      })
      .then((res) => alert("Success"))
      .catch((err) => console.log(err))
      .finally(() => this.setState({ openModal: false }));
  };

  handleDelete = (id) => {
    // DELETE -> axios.delete(url, config?)
    axios
      .delete(`/posts/${id}`)
      .then((res) => alert(`Success delete ${id}`))
      .catch((err) => console.log(err));
  };

  handleEdit = () => {
    // PUT -> axios.put(url, data?, config?)
    axios
      .delete(`/posts/${this.state.formID}`)
      .then((res) => alert(`Success edit ${this.state.formID}`))
      .catch((err) => console.log(err))
      .finally(() => this.setState({ openModal: false }));
  };

  render() {
    const { formTitle, formBody } = this.state;

    if (this.state.loading) {
      return (
        <Layout title={this.state.title}>
          <div>Loading...</div>
        </Layout>
      );
    } else {
      return (
        <Layout title={this.state.title}>
          <div className="absolute bottom-5 right-10">
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => this.handleAdd()}
            >
              <AddIcon />
            </Fab>
          </div>
          {this.state.data.map((item) => (
            <div
              key={item.id}
              className="m-4 p-3 border-2 rounded-lg bg-slate-600 hover:bg-slate-900 shadow-lg shadow-black"
            >
              <h1 className="text-white font-bold">{item.title}</h1>
              <p className="text-white">{item.body}</p>
              <button
                className="text-red-500"
                onClick={() => this.handleDelete(item.id)}
              >
                <DeleteIcon />
              </button>
              <button
                className="text-cyan-500"
                onClick={() =>
                  this.setState({
                    openModal: true,
                    mode: "edit",
                    formTitle: item.title,
                    formBody: item.body,
                    formID: item.id,
                  })
                }
              >
                <EditIcon />
              </button>
            </div>
          ))}
          <Modal
            open={this.state.openModal}
            onClose={() => this.setState({ openModal: false })}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Title"
                variant="outlined"
                value={formTitle}
                onChange={(e) => this.setState({ formTitle: e.target.value })}
              />
              <TextField
                className="w-full"
                id="outlined-basic"
                label="Body"
                variant="outlined"
                value={formBody}
                onChange={(e) => this.setState({ formBody: e.target.value })}
              />
              <Button
                variant="contained"
                onClick={() =>
                  this.state.mode === "create"
                    ? this.handleSubmit()
                    : this.handleEdit()
                }
                disabled={formTitle.length === 0 || formBody.length === 0}
              >
                {this.state.mode === "create" ? "Submit" : "Edit"}
              </Button>
            </Box>
          </Modal>
        </Layout>
      );
    }
  }
}

export default TestingScreen;
