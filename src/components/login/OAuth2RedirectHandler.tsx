import React, { Component } from "react";
import { RouteComponentProps } from "react-router";
import { Redirect } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constants";

class OAuth2RedirectHandler extends Component<RouteComponentProps> {
  getUrlParameter(name: any) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

    const results = regex.exec(this.props.location ? this.props.location.search : "");
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  render() {
    const token = this.getUrlParameter("token");
    const error = this.getUrlParameter("error");

    if (token) {
      // console.log("Got a token " + token)
      localStorage.setItem(ACCESS_TOKEN, token);
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: this.props.location },
          }}
        />
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              from: this.props.location,
              error: { error },
            },
          }}
        />
      );
    }
  }
}

export default OAuth2RedirectHandler;
