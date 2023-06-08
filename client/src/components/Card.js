import React, { useState } from "react";
import Comment from "./Comment";

const Card = ({
    selectedTopic, showButtonIsClicked, onSetShowButtonIsClicked, cardDeleted, onSetCardDeleted, onSetSelectedTopic, topicType

}) => {

const [addedTofavorites, setAddedTofavorites] = useState(false)

    const handleRemove = async () => {


        try {
            const response = await fetch(`http://localhost:3000/api/card/${selectedTopic._id}`, {
                method: "DELETE"

            })
            onSetCardDeleted(true);
            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddToFavourites = async (e) => {
        e.preventDefault()
        const card = {
            topic: "favourite",
            question: selectedTopic.question,
            answer: selectedTopic.answer,
            comment: selectedTopic.comment
        }
        try {
            const response = await fetch("http://localhost:3000/api/card", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(card),
            })
            const responseData = await response.json();
            console.log(responseData);
            setAddedTofavorites(true);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="Card">
            {!cardDeleted ? (
                <div>
                    <div>
                        <h2>{selectedTopic.question}</h2>
                    </div>
                    {!showButtonIsClicked ? (
                        <div>
                            <button type="button" onClick={() => { onSetShowButtonIsClicked(true) }}>Show the Answer!</button>
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
                            <button type="button" onClick={handleRemove}>I knew that! Out of Deck!</button>
                            
                            {topicType !== "favourite" && !addedTofavorites &&
                            <>
                            <button type="button" onClick={handleAddToFavourites}>Add to favourites </button>
                            </>

                            }
                            
                        </div>

                    )}
                </div>

            ) : (
                <div>
                    <h2>Card has been removed</h2>
                    <p>Generate new one</p>
                </div>
            )}





        </div>
    )
};

export default Card