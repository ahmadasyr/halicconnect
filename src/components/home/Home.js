import React, { useEffect, useState } from "react";
import { Col, Row, Container, Button, Media } from "reactstrap";
import { getChat, listUsers } from "../../contexts/Users";
import defaultUser from "../../media/defaultUser.jpeg";
import Chat from "./Chat";
export default function Home() {
  const [users, setUsers] = useState([]);
  const [chat_id, setChat_id] = useState('');
  const [chat_user, setChat_user] = useState({});
  const [chatter, setChatter] = useState(false)
  useEffect(() => {
    async function fetch() {
      const { data, error } = await listUsers();
      if (data) {
        setUsers(data);
      } else {
        console.log(error);
      }
    }
    fetch();
  }, []);
  return (
    <div className="App">
      {chatter ? 
      <Chat
      setChatter={setChatter}
      chat_id={chat_id}
      chat_user={chat_user}
      /> : <></>
      }
      <div className="content">
        <Container>
          <Row>
            <Col md="8">
              <div className="posts-section">
                <h2>Posts</h2>
                Coming soon...
              </div>
            </Col>
            <Col md="4">
              <div className="sidebar">
                <h2>Chat with Students</h2>
                <Row>
                  {users.map((user) => {
                    return (
                      <>
                        <Col 
                        style={{cursor: 'pointer'}}
                        onClick={async (e)=>{
                          setChat_id(await getChat(user?.id))
                          setChat_user(user)
                          setChatter(true);
                        }}
                        className="user-item" lg="12">
                          <div className="d-flex align-items-center">
                            <Media
                              object
                              src={
                                user?.profile_picture
                                  ? user?.profile_picture
                                  : defaultUser
                              }
                              className="rounded-circle mr-2"
                              style={{ width: "50px", height: "50px" }}
                            />
                            <p style={{marginLeft: '1rem'}}>{user?.first_name + " " + user?.last_name}</p>
                          </div>
                        </Col>
                      </>
                    );
                  })}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
