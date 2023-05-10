import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Col, FormText, Input, Row } from "reactstrap";
import { signup } from "../../contexts/Auth";
import logoBlack from "../../media/logoBlack.svg";
import { departments, faculties } from './Dropdowns'
export default function Signup() {
  const [info, setInfo] = useState({
    id: "",
    email: "",
    password: "",
    repassword: "",
    firstname: "",
    lastname: "",
    phone: "",
  });
  
  const [ogrError, setOgrError] = useState(false);
  const [result, setResult] = useState(null);
  const [passmatch, setPassmatch] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !(pattern.test(info?.email) && info?.email.endsWith("@ogr.halic.edu.tr"))
    ) {
      setOgrError(true);
    } else if (info?.password != info?.repassword) {
      setPassmatch(true);
    } else if (!info?.password || !info?.id) {
      setResult({ error: true });
    } else {
      setOgrError(false);
      const res = await signup(info);
      setResult(res);
    }
  };
  return (
    <>
      <div className='background-image'>
    </div>
      <Row>
        
        <Col lg="4"></Col>
        <Col lg="4">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="auth-card container">
            {ogrError ? (
                  <Alert color="danger">Please use a student email!</Alert>
                ) : passmatch ? (
                  <Alert color="danger">Your passwords don't match!</Alert>
                ) : result?.error ? (
                  <Alert color="danger">Please check your information!</Alert>
                ) : result?.data ? (
                  <Alert color="success">
                    Registration successful! Please check your inbox to confirm
                    your email.{" "}
                    <b>{"(If you can't find it check your spam folder)"}</b>
                  </Alert>
                ) : (
                  <></>
                )}
              <div className="auth-card-headers">
                <h3 className="primary">
                  <b>Create a new Account</b>
                </h3>
                <p className="text-black">
                  and start chatting with your classmates!
                </p>
              </div>
              <Row>
                <Col lg="6">
                  <Input
                    placeholder="First Name"
                    name="firstname"
                    type="text"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    className="mb-3"
                  ></Input>
                </Col>
                <Col lg="6">
                  <Input
                    placeholder="Last Name"
                    name="lastname"
                    type="text"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    className="mb-3"
                  ></Input>
                </Col>
                <Col lg="12">
                  <Input
                    placeholder="Student ID"
                    name="id"
                    type="text"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    className="col-12 mb-3"
                  ></Input>
                </Col>
                <Col lg="12">
                  <Input
                    placeholder="Email"
                    name="email"
                    type="text"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    className="col-12 mb-3"
                  ></Input>
                </Col>
                <Col lg="12">
                  <Input
                    placeholder="Password"
                    name="password"
                    type="password"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    className="col-12 mb-3"
                  ></Input>
                </Col>
                <Col lg="12">
                  <Input
                    placeholder="Re-Enter Password"
                    name="repassword"
                    type="password"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    className="col-12 mb-3"
                  ></Input>
                </Col>
                <Col lg="12">
                  <Input
                    placeholder="Phone number"
                    name="phone"
                    type="text"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    className="col-12 mb-3"
                  ></Input>
                </Col>
                <Col lg="12">
                  <FormText>Your date of birth</FormText>
                  <Input
                    placeholder="You date of birth"
                    name="date"
                    type="date"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    className="col-12 mb-3"
                  ></Input>
                </Col>
                <Col lg={6}>
                  <Input
                    placeholder="Faculty"
                    name="faculty"
                    type="select"
                    onChange={(e)=>{
                      handleInputChange(e);
                    }}
                    className="mb-3"
                  >
                    <option disabled selected value="">
                      Faculty
                    </option>
                    {faculties.map((faculty) => (
                      <option key={faculty}>{faculty}</option>
                    ))}
                  </Input>
                </Col>
                <Col lg={6}>
                  <Input
                    placeholder="Department"
                    name="department"
                    type="select"
                    disabled={!info?.faculty}
                    onChange={(e)=>{
                      handleInputChange(e)
                    }}
                    className="mb-3"
                  >
                    <option disabled selected value="">
                      Department
                    </option>
                    {info?.faculty &&
                      departments[info?.faculty]?.map((department) => (
                        <option key={department}>{department}</option>
                      ))}
                  </Input>
                </Col>

                <Button
                  size="lg"
                  block
                  className="primary-background white mb-3"
                  type="Submit"
                >
                  Signup
                </Button>
                <hr></hr>
                <p className="text-center">Already have an account?</p>
                <Link to='/' style={{textDecoration: 'none'}}>
                <Button
                  size="lg"
                  block
                  className="secondary-background white mb-3"
                >
                  Login
                </Button>
                </Link>
              </Row>
            </div>
          </form>
        </Col>
        <Col lg="4"></Col>
      </Row>
    </>
  );
}
