import { useState, useEffect } from "react";
import "../styles/messagestream.css";


export default function MessageStream() {
  const [msgStream, setMsgStream] = useState([]);
  // console.table(msgStream);

  useEffect(
    () => {
      const eventSource = new EventSource("/api/messagestream");
      eventSource.onopen = () => console.log("connection opened");
      eventSource.onerror = (e) => {
        console.log("error: ", e);
        eventSource.close();
        console.log("conection closed");
      };
      eventSource.onmessage = function (event) {
        try {
          console.log(JSON.parse(event.data));
          console.log(msgStream);
          setMsgStream([...msgStream, JSON.parse(event.data)]);
          eventSource.close()
        } catch (e) {
          console.log("oof ", e);
          eventSource.close()

        }
      };
    },
    [msgStream]
  );

  return (
    <div className="message-container">
     
        {msgStream.map((msg) => {
          return (
            <div className="message">
            <p>{msg.fullDocument.author}: {msg.fullDocument.content}</p>
            <p className="message-time">{msg.fullDocument.timestamp}</p>
            </div>
          ) 
        })}
     
    </div>
  );
}
