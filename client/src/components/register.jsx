import React from "react";
import Input from "./common/input";
import Form from "./common/form";
import Joi from "joi-browser";
import { Redirect, Link } from "react-router-dom";
import * as userService from "../services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/react-toastify.esm";
import "../utils/Register.css";

class Register extends Form {
  state = {
    data: { username: "", email: "", password: "", password2: "", name: "" },
    errors: { username: "", email: "", password: "", password2: "", name: "" },
  };

  schema = {
    name: Joi.string().required().label("Full Name"),
    username: Joi.string().required().label("Username"),
    email: Joi.string().required().label("Email ID"),
    password: Joi.string().required().label("Password"),
    password2: Joi.string().required().label("Confirm Password"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("User Already Registered");
      }
    }
  };

  render() {
    const { data, errors } = this.state;
    if (localStorage.getItem("token")) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <React.Fragment>
        <ToastContainer />
        <div className="register-container">
          <h1 className="text-center mb-4">Create an Account</h1>
          <form onSubmit={this.handleSubmit} className="login-form">
            <Input
              value={data.name}
              onChange={this.handleChange}
              label="Full Name"
              name="name"
              type="text"
              error={errors.name}
            />
            <Input
              name="username"
              value={data.username}
              label="Username"
              type="text"
              onChange={this.handleChange}
              error={errors.username}
            />
            <Input
              value={data.email}
              onChange={this.handleChange}
              label="Email Address"
              type="email"
              name="email"
              error={errors.email}
            />
            <Input
              value={data.password}
              onChange={this.handleChange}
              label="Password"
              type="password"
              name="password"
              error={errors.password}
            />
            <Input
              value={data.password2}
              onChange={this.handleChange}
              label="Confirm Password"
              name="password2"
              type="password"
              error={errors.password2}
            />
            <div className="d-grid gap-2">
              <button
                className="btn btn-primary register-btn"
                disabled={this.validate()}
              >
                Register
              </button>
            </div>
          </form>
          <div className="container col-lg-3 col-md-6 border rounder mt-1 p-3 text-center">
            Existing user?<Link to="/users/login">Login Here</Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
