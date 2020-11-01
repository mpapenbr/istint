import { Card, Row } from "antd";
import React, { Component } from "react";
import { FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL } from "../../constants";
import fbLogo from "../../img/fb-logo.png";
import googleLogo from "../../img/google-logo.png";
import "./SocialLogin.css";

class SocialLogin extends Component {
  render() {
    return (
      <Card title="Choose login">
        <Row>
          <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
            <img src={googleLogo} alt="Google" /> Log in with Google
          </a>
        </Row>
        <Row>
          <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
            <img src={fbLogo} alt="Facebook" /> Log in with Facebook
          </a>
        </Row>
      </Card>
    );
  }
}

export default SocialLogin;
