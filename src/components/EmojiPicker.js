import React from "react";
import { useState, useEffect } from "react";

const EmojiPicker = () => {
  const emojis = [
    {
      name: "smirk",
      content: "😏",
    },
    {
      name: "hot-face",
      content: "🥵",
    },
    {
      name: "sunglasses",
      content: "😎",
    },
  ];
  return (
    <>
      {emojis.map((emoji) => {
        return emoji.content;
      })}
    </>
  );
};

export default EmojiPicker;
