import React from "react";
import Comment from "./Comment";

const Card = ({
  selectedTopic,
  showButtonIsClicked,
  onSetShowButtonIsClicked,
  cardDeleted,
  onSetCardDeleted,
  onSetSelectedTopic,
  topicType,
}) => {
  const handleRemove = async () => {
    if (topicType === "Web Frameworks") {
      try {
        const response = await fetch(
          `http://localhost:3000/api/webcards/${selectedTopic._id}`,
          {
            method: "DELETE",
          }
        );
        onSetCardDeleted(true);
        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.log(error);
      }
    } else if (topicType === "Programing Basics") {
      try {
        const response = await fetch(
          `http://localhost:3000/api/progcards/${selectedTopic._id}`,
          {
            method: "DELETE",
          }
        );
        onSetCardDeleted(true);
        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleAddToFavorites = async () => {
    const response = await fetch(`/api/favorites`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({selectedTopic})
    });
    
    try {
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Card">
      {!cardDeleted ? (
        <div>
          <div>
            <h2>{selectedTopic.question}</h2>
          </div>
          {!showButtonIsClicked ? (
            <div>
              <button
                type="button"
                onClick={() => {
                  onSetShowButtonIsClicked(true);
                }}
              >
                Show the Answer!
              </button>
            </div>
          ) : (
            <div>
              <h3>{selectedTopic.answer}</h3>
              <h4>Your comment: {selectedTopic.comment}</h4>

              <Comment
                topicType={topicType}
                selectedTopic={selectedTopic}
                onSetSelectedTopic={onSetSelectedTopic}
              />
              <button type="button" onClick={handleRemove}>
                I knew that! Out of Deck!
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Card has been removed</h2>
          <p>Generate new one</p>
        </div>
      )}

      <button onClick={handleAddToFavorites}>ADD TO FAVORITES</button>
    </div>
  );
};

export default Card;
