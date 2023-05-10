import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Input, Col, Row, FormFeedback } from "reactstrap";
import { login } from "../../contexts/Auth";
import logoBlue from "../../media/welcomeLogo.svg";
export default function Login() {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [emailValidity, setEmailValidity] = useState(false);
  const [ogrError, setOgrError] = useState(false);
  const [result, setResult] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInfo({ ...info, [name]: value });
  };
  function checkEmail(e) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !(pattern.test(info?.email) && info?.email.endsWith("@ogr.halic.edu.tr"))
    ) {
      setEmailValidity(true);
    } else {
      setEmailValidity(false);
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      pattern.test(info?.email) &&
      info?.email.endsWith("@ogr.halic.edu.tr")
    ) {
      setOgrError(false);
      const res = await login(info);
      setResult(res);
    } else {
      setOgrError(true);
    }
  };
  return (
    <>
      {/* <div className='background-image'>
    </div> */}
      <Row>
        <Col lg="1"></Col>
        <Col lg="6">
          <div style={{ padding: "30% 0" }}>
            <img style={{ width: "90%" }} src={logoBlue} />
            <h1 className="fader">Welcome to Haliç Connect!</h1>
          </div>
        </Col>
        <Col lg="4">
          <form
            style={{ padding: "30% 0" }}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="auth-card container">
              <div className="auth-card-headers"></div>
              <div className="Row">
                <Input
                  invalid={emailValidity}
                  placeholder="Email"
                  name="email"
                  type="text"
                  onBlur={(e) => {
                    checkEmail();
                  }}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="col-12"
                ></Input>
                {emailValidity ? (
                  <FormFeedback>Please use a valid student email!</FormFeedback>
                ) : (
                  <></>
                )}
                <Input
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="col-12 mb-3 mt-3"
                ></Input>
                <Button
                  size="lg"
                  block
                  className="primary-background white mb-3"
                  type="Submit"
                >
                  Login
                </Button>
                {/* <Link to="/forgot-password">Forgot password?</Link> */}
                <hr></hr>
                <Link style={{ textDecoration: "none" }} to="/signup">
                  <Button
                    size="lg"
                    block
                    className="secondary-background white mb-3"
                  >
                    Sign Up
                  </Button>
                </Link>
                {ogrError ? (
                  <Alert color="danger">Please use a student email!</Alert>
                ) : result?.error ? (
                  <Alert color="danger">Please check your information!</Alert>
                ) : result?.data ? (
                  <Alert color="danger">Success!</Alert>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </form>
        </Col>
        <Col lg="1" />
      </Row>
    </>
  );
}
