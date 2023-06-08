import React, { useState } from "react";
import Login from "./components/Login";
import TopicSelector from "./components/TopicSelector";
import Card from "./components/Card";
import "./App.css";
import drDuck from "./drDuck.jpg";

const App = () => {
  const [userName, setUserName] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState(false)
  const [showButtonIsClicked, setShowButtonIsClicked] = useState(false)
  const [cardDeleted, setCardDeleted] = useState(false)
  const [topicType, setTopicType] = useState("");

  return (
    <div className="Main">
      {!submitted ? (
        <div className="Duck">
          <div className="DuckImage"> 
             <img src={drDuck} alt="Duck" />
          </div>
          <Login onSetSubmitted={setSubmitted} onSetUserName={setUserName} />
        </div>
      ) : (
        <div>
          <TopicSelector
          selectedTopic={selectedTopic}
            topicType={topicType}
            onSetTopicType={setTopicType}
            userName={userName}
            onSetSelectedTopic={setSelectedTopic}
            onSetShowButtonIsClicked={setShowButtonIsClicked}
            onSetCardDeleted={setCardDeleted}
          />
        </div>
      )}
      {selectedTopic ? (
        <div>
          <Card
            topicType={topicType}
            selectedTopic={selectedTopic}
            onSetSelectedTopic={setSelectedTopic}
            showButtonIsClicked={showButtonIsClicked}
            onSetShowButtonIsClicked={setShowButtonIsClicked}
            cardDeleted={cardDeleted}
            onSetCardDeleted={setCardDeleted}
          />
        </div>
      ) : null}
    </div>
  );
};

export default App;
