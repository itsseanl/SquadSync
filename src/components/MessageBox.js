import { useState, useEffect } from "react";
import "../styles/messagebox.css";

export default function MessageBox() {
//   const [message, setMessage] = useState([]);

//   useEffect(
//     () => {
     
//     },[]);

    function handleSubmit(e){
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        // You can pass formData as a fetch body directly:
        const date = new Date().toISOString();
        const message = {
            "content": formData.get("content"),
             "timestamp": date,
              "author" : "seanl"
             };
        fetch('/api/sendmessage', {
             method: "post", 
             mode: "cors",
             cache: "no-cache",
             headers: {"Content-Type": 'application/json'},
             body: JSON.stringify(message) 
            });

    }

  return (
    <div className="input">
        <form method="post" onSubmit={handleSubmit}>
            <label>
                Message
                <textarea name="content" id="chatInput"/>
            </label>
            <button id="submit-chat" type="submit">Submit</button>
        </form>
  </div>
  );
}
