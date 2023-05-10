import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Badge,
} from "reactstrap";
import { supabase } from "../../contexts/supabase";
import { getUserInfo } from "../../contexts/Users";
import { faculties, departments } from "../auth/Dropdowns";
export default function Profile() {
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    async function getInfo() {
      const user = await getUserInfo();
      setUser(user);
    }
    getInfo();
  }, []);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [yearEnrolled, setYearEnrolled] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [otherEmail, setOtherEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [displayEmail, setDisplayEmail] = useState(false);
  const [displayOtherEmail, setDisplayOtherEmail] = useState(false);
  const [displayPhone, setDisplayPhone] = useState(false);
  const [studentEmail, setStudentEmail] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setFaculty(user.faculty);
      setDepartment(user.department);
      setYearEnrolled(user.year_enrolled);
      setDateOfBirth(user.dateofbirth);
      setNationality(user.nationality);
      setProfilePicture(user.profile_picture);
      setOtherEmail(user.other_email);
      setPhone(user.phone);
      setDisplayEmail(user.display_email);
      setDisplayOtherEmail(user.display_other_email);
      setDisplayPhone(user.display_phone);
      setStudentEmail(user.student_email);
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase
      .from("user")
      .update({
        first_name: firstName,
        last_name: lastName,
        faculty,
        department,
        year_enrolled: yearEnrolled,
        dateofbirth: dateOfBirth,
        nationality,
        other_email: otherEmail,
        phone,
        display_email: displayEmail,
        display_other_email: displayOtherEmail,
        display_phone: displayPhone,
        student_email: studentEmail,
      })
      .eq("id", user.id);
    if (error) console.log(error);
    else {console.log(data); setEdit(false)};
  };

  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const handleProfilePictureUpload = async () => {
    const { data, error } = await supabase.storage
      .from("images")
      .upload(
        `profile_picture/user-${user.id}-${profilePicture.name}`,
        profilePicture
      );
    if (error) console.log(error);
    else {
      console.log(data);
      const { data: userData, error: userError } = await supabase
        .from("user")
        .update({
          profile_picture: `https://uxpzyohjandlabfflidg.supabase.co/storage/v1/object/public/images/${data.path}`,
        })
        .eq("id", user.id);
      if (userError) console.log(userError);
      else console.log(userData);
    }
  };

  return (
    <>
      <Container>
        {edit ? (
          <>
            <Button
              style={{ float: "right" }}
              onClick={(e) => {
                e.preventDefault();
                setEdit(false);
              }}
              color="danger"
            >
              Cancel Edit
            </Button>
            <Form onSubmit={handleSubmit}>
              <Row>
                <h1>Profile</h1>
                <Col lg="6">
                  <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter your first name"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Enter your last name"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <Label for="faculty">Faculty</Label>
                    <Input
                      type="select"
                      name="faculty"
                      id="faculty"
                      placeholder="Enter your faculty"
                      value={faculty}
                      onChange={(event) => setFaculty(event.target.value)}
                    >
                      <option disabled selected value="">
                        Faculty
                      </option>
                      {faculties.map((faculty) => (
                        <option key={faculty}>{faculty}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <Label for="department">Department</Label>
                    <Input
                      type="select"
                      name="department"
                      id="department"
                      placeholder="Enter your department"
                      value={department}
                      onChange={(event) => setDepartment(event.target.value)}
                    >
                      <option disabled selected value="">
                        Department
                      </option>
                      {faculty &&
                        departments[faculty]?.map((department) => (
                          <option key={department}>{department}</option>
                        ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <Label for="yearEnrolled">Year Enrolled</Label>
                    <Input
                      type="number"
                      name="yearEnrolled"
                      id="yearEnrolled"
                      placeholder="Enter the year you enrolled"
                      value={yearEnrolled}
                      onChange={(event) => setYearEnrolled(event.target.value)}
                    />
                  </FormGroup>
                </Col>

                <Col lg="6">
                  <FormGroup>
                    <Label for="dateOfBirth">Date of Birth</Label>
                    <Input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      placeholder="Enter your date of birth"
                      value={dateOfBirth}
                      onChange={(event) => setDateOfBirth(event.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <Label for="nationality">Nationality</Label>
                    <Input
                      type="text"
                      name="nationality"
                      id="nationality"
                      placeholder="Enter your nationality"
                      value={nationality}
                      onChange={(event) => setNationality(event.target.value)}
                    />
                  </FormGroup>
                </Col>

                <Col lg="6">
                  <FormGroup>
                    <Label for="otherEmail">Other Email</Label>
                    <Input
                      type="email"
                      name="otherEmail"
                      id="otherEmail"
                      placeholder="Enter your other email"
                      value={otherEmail}
                      onChange={(event) => setOtherEmail(event.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        name="displayEmail"
                        checked={displayEmail}
                        onChange={(event) =>
                          setDisplayEmail(event.target.checked)
                        }
                      />
                      Display my email to others
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        name="displayOtherEmail"
                        checked={displayOtherEmail}
                        onChange={(event) =>
                          setDisplayOtherEmail(event.target.checked)
                        }
                      />
                      Display my other email to others
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        name="displayPhone"
                        checked={displayPhone}
                        onChange={(event) =>
                          setDisplayPhone(event.target.checked)
                        }
                      />
                      Display my phone number to others
                    </Label>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <Label for="profilePicture">Profile Picture</Label>
                    {profilePicture && (
                      <img src={profilePicture} alt="Profile" width="200" />
                    )}
                    <Input
                      type="file"
                      name="profilePicture"
                      id="profilePicture"
                      onChange={handleProfilePictureChange}
                    />
                    <Button
                      color="primary"
                      onClick={handleProfilePictureUpload}
                    >
                      Upload
                    </Button>
                  </FormGroup>
                </Col>
                <FormGroup>
                  <Button color="primary">Update Profile</Button>
                </FormGroup>
              </Row>
            </Form>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "auto",
              backgroundColor: "white",
              borderRadius: "3rem",
              justifyContent: "space-between",
              padding: "5rem",
            }}
          >
            <div className="d-flex">
              <img
                src={profilePicture || "https://via.placeholder.com/150"}
                alt="Profile"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  marginRight: "20px",
                }}
              />

              <div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                }}
              >
                {firstName} {lastName}
              </div>
                <Badge color="primary" style={{marginBottom: "10px"}} pill>{nationality || 'International'}</Badge>
              
                <div style={{ fontSize: "18px", marginBottom: "10px" }}>
                  {faculty} - {department}
                </div>
                
                <div
                  style={{
                    fontSize: "14px",
                    color: "#8B8D91",
                    marginBottom: "10px",
                  }}
                >
                  Joined in {yearEnrolled || "2023"}
                </div>
              </div>
            </div>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setEdit(true);
              }}
              color="success"
            >
              Edit Profile
            </Button>
          </div>
        )}
      </Container>
    </>
  );
}
