import { useState, useEffect } from "react";
import "../styles/messagebox.css";
// import EmojiPicker from "./EmojiPicker";

export default function MessageBox() {
  const [msg, setMsg] = useState("");
  const [autoComplete, setAutoComplete] = useState("");
  const emojis = [
    {
      name: ":smirk:",
      content: "😏",
    },
    {
      name: ":hot-face:",
      content: "🥵",
    },
    {
      name: ":sunglasses:",
      content: "😎",
    },
  ];
  function handleEmojiPicker() {}

  function registerEmoji(e) {
    console.log(e.target.value);
    var msg = e.target.value;
    emojis.forEach((emoji) => {
      if (msg.includes(":")) {
        var match = msg.split(":")[1];
        match = emoji.name.includes(match)
          ? setAutoComplete(emoji.content)
          : "";
      } else {
        setAutoComplete("");
      }
      if (msg.includes(emoji.name)) {
        msg = msg.replace(emoji.name, emoji.content);
      }
    });

    setMsg(msg);
  }

  function autocompleteEmoji(e) {
    let msg = e.target.value;
    console.log(e);
    console.log("keycode: " + e.keyCode);
    if (autoComplete != "" && e.keyCode == 9) {
      e.preventDefault();
      msg = msg.split(":");
      try {
        msg[1] = autoComplete;
        msg = msg.join("");
        setMsg(msg);
        setAutoComplete("");
      } catch (er) {
        console.log("oofy", er);
      }
    }
  }

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    // You can pass formData as a fetch body directly:
    const date = new Date().toISOString();
    const message = {
      content: formData.get("content"),
      timestamp: date,
      author: "seanl",
    };
    fetch("/api/sendmessage", {
      method: "post",
      mode: "cors",
      cache: "no-cache",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
  }

  return (
    <div className="input">
      <form method="post" onSubmit={handleSubmit}>
        <div className="text-box-wrapper">
          <div id="emojiCollection"></div>
          <button id="addMedia">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 -960 960 960"
              width="48"
            >
              <path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z" />
            </svg>
          </button>
          <div id="autoComplete">{autoComplete}</div>

          <textarea
            name="content"
            id="chatInput"
            value={msg}
            onChange={registerEmoji}
            onKeyDown={autocompleteEmoji}
          />
          <button id="emojis">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 -960 960 960"
              width="48"
              onClick={handleEmojiPicker}
            >
              <path d="M480-480Zm.266 400q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.266T80-480.266Q80-563 111.599-636q31.6-73 85.77-127 54.17-54 127.401-85.5Q398-880 480-880q45.797 0 88.398 10Q611-860 650-842v67q-38-22-80.5-33.5T480.22-820q-141.404 0-240.812 99Q140-622 140-480.486q0 141.515 99.486 241Q338.971-140 480.486-140 622-140 721-239.344T820-480q0-34.783-6.5-67.391Q807-580 794-610h64q11 31.417 16.5 63.375T880-480q0 82-31.5 155.23Q817-251.539 763-197.369t-127 85.77Q563-80 480.266-80ZM810-680v-90h-90v-60h90v-90h60v90h90v60h-90v90h-60ZM626-533q22.5 0 38.25-15.75T680-587q0-22.5-15.75-38.25T626-641q-22.5 0-38.25 15.75T572-587q0 22.5 15.75 38.25T626-533Zm-292 0q22.5 0 38.25-15.75T388-587q0-22.5-15.75-38.25T334-641q-22.5 0-38.25 15.75T280-587q0 22.5 15.75 38.25T334-533Zm146 272q66 0 121.5-35.5T682-393H278q26 61 81 96.5T480-261Z" />
            </svg>
          </button>
        </div>
        <button id="submitChat" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="48"
            viewBox="0 -960 960 960"
            width="48"
          >
            <path d="M120-160v-640l760 320-760 320Zm60-93 544-227-544-230v168l242 62-242 60v167Zm0 0v-457 457Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
