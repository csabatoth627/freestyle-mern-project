import React, { useState} from "react";

const TopicSelector = ({ userName, onSetSelectedTopic, onSetShowButtonIsClicked, onSetCardDeleted,topicType, 
    
    onSetTopicType 
}) => {
    

   
    const handleClick = async () => {


        if (topicType === "Web Frameworks") {
            try {
                const response = await fetch("http://localhost:3000/api/webcards");
                const question = await response.json();
                const randomQuestion =
                    question[Math.floor(Math.random() * question.length)];
                onSetSelectedTopic(randomQuestion);
                onSetShowButtonIsClicked(false)
                onSetCardDeleted(false)
            } catch (error) {
                console.log(error);
            }
        }

       else if (topicType === "Programing Basics") {
            try {
                const response = await fetch("http://localhost:3000/api/progcards");
                const question = await response.json();
                const randomQuestion =
                    question[Math.floor(Math.random() * question.length)];
                onSetSelectedTopic(randomQuestion);
                onSetShowButtonIsClicked(false)
                onSetCardDeleted(false)
            } catch (error) {
                console.log(error);
            }
        }


    }

    return (
        <div>

            {!topicType ? (

                <div>
                    <div>
                        <h3 className="hi">Hi {userName}, pick your topic!</h3>
                    </div>
                    <div>
                        <button type="button" onClick={() => { onSetTopicType("Programing Basics") }}>Programing Basics</button>
                    </div>
                    <div>
                        <button type="button" onClick={() => { onSetTopicType("Web Frameworks") }}>Web Frameworks</button>
                    </div>
                </div>
            ) : (

                <div>
                    <div>
                        <h1>{topicType}</h1>
                    </div>
                    <div>
                        <button type="button" onClick={handleClick}>Give me a question!</button>

                    </div>

                    <div>
                        <button type="button" onClick={() => {
                            onSetTopicType("")
                            onSetSelectedTopic(false)
                        }}>Back to the topics</button>
                    </div>

                </div>
            )}




        </div>

    )

};

export default TopicSelector