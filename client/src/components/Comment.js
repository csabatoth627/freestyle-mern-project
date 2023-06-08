import React, { useState } from "react";

function Comment({ selectedTopic, onSetSelectedTopic, topicType }) {
  const [comment, setComment] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(comment);
    const addComment = { title: comment };

    if (topicType === "Web Frameworks") {
      try {
        await fetch(`http://localhost:3000/api/webcards/${selectedTopic._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(addComment),
        });

        try {
          const webCard = await fetch(`http://localhost:3000/api/webcards/${selectedTopic._id}`);
          const webCardData = await webCard.json();
          onSetSelectedTopic(webCardData);


        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (topicType === "Programing Basics") {
      try {
        await fetch(`http://localhost:3000/api/progcards/${selectedTopic._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(addComment),
        });

        try {
          const progCard = await fetch(`http://localhost:3000/api/progcards/${selectedTopic._id}`);
          const progCardData = await progCard.json();
          onSetSelectedTopic(progCardData);


        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <input type="submit" value="Add Comment" />
      </form>

    </div>
  );
}

export default Comment;
