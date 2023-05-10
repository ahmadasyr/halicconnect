import React, { useEffect, useState, useRef } from "react";
import { Button, Input, Col, Row, Container } from "reactstrap";
import { supabase } from "../../contexts/supabase";
import { getMessages, getUserID, sendMessage } from "../../contexts/Users";
import { X } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
export default function Chat(props) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [id, setId] = useState('');
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const id = async () => await getUserID();
    setId(id);
    const getMes = async () => {
      let data = await getMessages(props?.chat_id);
      setMessages(data);
    };
    getMes();
    const message = supabase
  .channel("custom-filter-channel")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "message",
      filter: "chat_id=eq." + props?.chat_id.id,
    },
    (payload) => {
      setMessages((prevMessages) => [...prevMessages, payload.new]);
    }
  )
  .subscribe();
  }, [props.chat_id]);

  // scroll to the bottom of the chat-messages container on messages update
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTo(0, chatMessagesRef.current.scrollHeight);
    }
  }, [messages]);

  return (
    <div className="chat-popup">
      <div className="chat-head">
        <Link style={{textDecoration: 'none', alignSelf: 'center'}} className="text-white" to={`/student/${props?.chat_user?.id}`}><p style={{margin: '0', alignSelf: 'center'}}>{props?.chat_user?.first_name}</p></Link>
        <i style={{cursor: 'pointer', fontSize: '1.6rem'}} onClick={(e) => props?.setChatter(false)}><X/></i>
      </div>
      <div className="chat-content">
        <div className="chat-messages" ref={chatMessagesRef}> {/* assign ref to chat-messages container */}
          <Container>
            <Row>
              {messages.map((i) => (
                i.user_from_id === id ? (
                  <Col lg="12" key={i.id}>
                    <div className="message-from">{i.message}</div>
                  </Col>
                ) : (
                  <Col lg="12" key={i.id}>
                    <div className="message-to">{i.message}</div>
                  </Col>
                )
              ))}
            </Row>
          </Container>
        </div>
        <div className="message-input">
            <form className="d-flex w-100" onSubmit={async (e)=>{
                e.preventDefault();
                await sendMessage(props?.chat_id, input);
                setInput("");
            }}>

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write your message.."
            />
          <Button type="submit">
            Send
          </Button>
              </form>
        </div>
      </div>
    </div>
  );
}
