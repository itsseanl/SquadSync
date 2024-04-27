import { useState, useEffect } from "react";
import "../styles/messagestream.css";

export default function MessageStream() {
  const [msgStream, setMsgStream] = useState([]);
  const [run, setRun] = useState(0);
  // console.table(msgStream);

  useEffect(() => {
    getHistory();
    setRun(1);
  }, []);

  async function getHistory() {
    await fetch("/api/messagehistory", {
      method: "get",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        console.log(res.fullDocument);
        setMsgStream([...msgStream, ...JSON.parse(res)]);
      })
      .then(console.log(msgStream))
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    if (run == 1) {
      const eventSource = new EventSource("/api/messagestream");
      eventSource.onopen = () => console.log("connection opened");
      eventSource.onerror = (e) => {
        console.log("error: ", e);
        eventSource.close();
        console.log("connection closed");
      };
      eventSource.onmessage = function (event) {
        try {
          console.log(JSON.parse(event.data));
          console.log(msgStream);
          setMsgStream([...msgStream, JSON.parse(event.data)]);
          eventSource.close();
        } catch (e) {
          console.log("oof ", e);
          eventSource.close();
        }
      };
      var msgContainer = document.getElementById("msgContainer");
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }
  }, [msgStream]);

  return (
    <div id="msgContainer" className="message-container">
      {msgStream.map((msg, index) => {
        return (
          <div className="message" key={index}>
            {/* <p>{msg}</p> */}
            <p>
              {msg.fullDocument.author}: {msg.fullDocument.content}
            </p>
            <p className="message-time">{msg.fullDocument.timestamp}</p>
          </div>
        );
      })}
    </div>
  );
}
