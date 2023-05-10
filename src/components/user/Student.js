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
  Alert,
  Badge,
} from "reactstrap";
import { supabase } from "../../contexts/supabase";
import { getStudentInfo } from "../../contexts/Users";
import { faculties, departments } from "../auth/Dropdowns";
import { useParams } from "react-router-dom";
export default function Student() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    console.log(id);
    async function getInfo() {
      const user = await getStudentInfo(id);
      setUser(user);
    }
    getInfo();
  }, [id]);
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

  return (
    <>
      <Container>
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
          <div className="d-block">
            {displayEmail ? (
              <Alert color="info">Student email: {user.student_email} </Alert>
            ) : null}
            {displayOtherEmail ? (
              <Alert color="info">Other email: {otherEmail} </Alert>
            ) : null}
            {displayPhone ? (
              <Alert color="info">Phone number: {phone} </Alert>
            ) : null}
          </div>
        </div>
      </Container>
    </>
  );
}
