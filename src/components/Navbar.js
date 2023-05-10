import React from "react";
import { Button } from "reactstrap";
import { logout } from "../contexts/Auth";
import logoWhite from "../media/logoWhite.svg";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="App-header">
        <a href="/">
        <img src={logoWhite} />
        </a>
    <div>
    <a className="white" href="/profile">
        <Button style={{backgroundColor: '#FFBC5C', border: 'none', margin: '0 1rem'}}>
        Profile
        </Button>
    </a>
      <Button
        color="danger"
        onClick={(e) => {
          logout();
        }}
      >
        Log Out
      </Button>
    </div>
    </div>
  );
}
