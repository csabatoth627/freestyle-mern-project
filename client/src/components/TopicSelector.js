
const TopicSelector = ({ userName, onSetSelectedTopic, onSetShowButtonIsClicked, onSetCardDeleted, topicType, onSetTopicType, selectedTopic }) => {
   

    const handleClick = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/cards?topic=${topicType}`);
            const question = await response.json();
            const randomQuestion = question[Math.floor(Math.random() * question.length)];
            onSetSelectedTopic(randomQuestion);
           
            
            onSetShowButtonIsClicked(false);
            onSetCardDeleted(false);
        } catch (error) {
            onSetSelectedTopic(error);
        }
    };

    return (
        <div>
            {!topicType ? (
                <div>
                    <div>
                        <h3 className="hi">Hi {userName}, pick your topic!</h3>
                    </div>
                    <div>
                        <button type="button" onClick={() => { onSetTopicType("progBasics") }}>Programing Basics</button>
                    </div>
                    <div>
                        <button type="button" onClick={() => { onSetTopicType("web") }}>Web Frameworks</button>
                    </div>
                    <div>
                        <button type="button" onClick={() => { onSetTopicType("favourite") }}>Favourite questions</button>
                    </div>
                </div>
            ) : (
                <div>
                    
                        <div>
                            <h1>{topicType}</h1>
                            <div>
                                <button type="button" onClick={handleClick}>Give me a question!</button>
                            </div>
                        </div>
                    
                    <div>
                        <button type="button" onClick={() => {
                            onSetTopicType("");
                            onSetSelectedTopic(false);
                            
                        }}>Back to the topics</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TopicSelector;
