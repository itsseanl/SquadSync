import { useState, useEffect, useRef } from "react";

export default function MessageStream() {
  const [msgStream, setMsgStream] = useState([]);
  // console.table(msgStream);

  useEffect(
    (elem) => {
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
    <div className="message">
      <p>
        {msgStream.map((msg) => {
          return msg.fullDocument.timestamp;
        })}
      </p>
    </div>
  );
}
