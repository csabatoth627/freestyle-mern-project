import React, { useState } from "react";

function Comment({ selectedTopic, onSetSelectedTopic,  }) {
  const [comment, setComment] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(comment);
    const addComment = { title: comment };

    
      try {
        await fetch(`http://localhost:3000/api/card/${selectedTopic._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(addComment),
        });

        try {
          const card = await fetch(`http://localhost:3000/api/card/${selectedTopic._id}`);
          const cardData = await card.json();
          onSetSelectedTopic(cardData);


        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
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
