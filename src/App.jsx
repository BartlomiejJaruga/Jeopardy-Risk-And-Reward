import { useState } from 'react';
import './App.css';
import JeopardyQuestionsBoard from '@components/JeopardyQuestionsBoard/JeopardyQuestionsBoard';
import JeopardyScoreboard from '@components/JeopardyScoreboard/JeopardyScoreboard';
import Timer from '@components/Timer/Timer';
import ControlPanel from '@components/ControlPanel/ControlPanel';

const gameSettings = {
    numberOfCategories: 5,
    numberOfRowsInCategory: 5,
    categoryStartingMoney: 100,
    categoryMoneyIncreasesBy: 100,
    timeToAnswer: 90,   // sec
    playersCount: 3,
};

const categoriesAndQuestionsAndAnswers = {
    "Science": {
        "What is the chemical symbol for water?": "H2O",
        "What planet is known as the Red Planet?": "Mars",
        "What is the speed of light in a vacuum (km/s)?": "300,000",
        "Who developed the theory of relativity?": "Einstein",
        "What gas do plants absorb from the atmosphere?": "CO2",
        "What is the center of an atom called?": "Nucleus",
        "What organ pumps blood in the human body?": "Heart",
        "What is the most abundant gas in Earth's atmosphere?": "Nitrogen",
        "What force keeps us on the ground?": "Gravity",
        "What is the hardest natural substance on Earth?": "Diamond"
    },
    "History": {
        "Who was the first President of the United States?": "George Washington",
        "What year did World War II end?": "1945",
        "Which civilization built the pyramids?": "Egyptians",
        "Who discovered America in 1492?": "Christopher Columbus",
        "What was the name of the ship that brought the Pilgrims to America?": "Mayflower",
        "Who was known as the Iron Lady?": "Margaret Thatcher",
        "What year was the Declaration of Independence signed?": "1776",
        "Who was the first man to step on the moon?": "Neil Armstrong",
        "What empire was Julius Caesar part of?": "Roman Empire",
        "Who was the Queen of England during the Spanish Armada?": "Elizabeth I"
    },
    "Geography": {
        "What is the largest desert in the world?": "Sahara",
        "What is the capital of France?": "Paris",
        "Which country has the most people?": "China",
        "What is the tallest mountain in the world?": "Mount Everest",
        "What ocean is the largest?": "Pacific",
        "What is the longest river in the world?": "Nile",
        "What country has the most islands?": "Sweden",
        "What is the capital of Japan?": "Tokyo",
        "What continent is Australia part of?": "Australia",
        "What is the smallest country in the world?": "Vatican City"
    },
    "Sports": {
        "What sport is known as 'the beautiful game'?": "Soccer",
        "How many players are on a basketball team?": "5",
        "What country has won the most World Cups?": "Brazil",
        "What is the top division of English soccer?": "Premier League",
        "How many points is a touchdown worth?": "6",
        "What is the only sport played on the moon?": "Golf",
        "In what year were the first modern Olympics held?": "1896",
        "What is the national sport of Japan?": "Sumo Wrestling",
        "How many bases are there in baseball?": "4",
        "What is the maximum score in a single bowling game?": "300"
    },
    "Movies": {
        "Who directed 'Jurassic Park'?": "Steven Spielberg",
        "What movie features the song 'My Heart Will Go On'?": "Titanic",
        "Who played Iron Man in the Marvel Cinematic Universe?": "Robert Downey Jr.",
        "What is the highest-grossing movie of all time?": "Avatar",
        "What year was 'The Lion King' released?": "1994",
        "Who directed 'Inception'?": "Christopher Nolan",
        "What is the name of the fictional world in 'Avatar'?": "Pandora",
        "Who played Jack in 'Titanic'?": "Leonardo DiCaprio",
        "What is the name of the hobbit played by Elijah Wood?": "Frodo",
        "What is the first rule of Fight Club?": "You do not talk about Fight Club"
    },
    "Music": {
        "Who is known as the King of Pop?": "Michael Jackson",
        "What instrument has 88 keys?": "Piano",
        "What band sang 'Hey Jude'?": "The Beatles",
        "Who is the lead singer of U2?": "Bono",
        "What is the highest female singing voice?": "Soprano",
        "Who wrote 'Bohemian Rhapsody'?": "Freddie Mercury",
        "What is the most streamed song on Spotify?": "Blinding Lights",
        "What instrument is used in jazz music?": "Saxophone",
        "What is Beethoven's first name?": "Ludwig",
        "Who sang 'Rolling in the Deep'?": "Adele"
    },
    "Technology": {
        "What does 'HTTP' stand for?": "HyperText Transfer Protocol",
        "Who is the CEO of Tesla?": "Elon Musk",
        "What is the name of Apple's virtual assistant?": "Siri",
        "What does 'AI' stand for?": "Artificial Intelligence",
        "What is the largest social media platform?": "Facebook",
        "What programming language is used for web development?": "JavaScript",
        "What is the parent company of Google?": "Alphabet",
        "What is the name of Microsoft's gaming console?": "Xbox",
        "Who invented the telephone?": "Alexander Graham Bell",
        "What does 'RAM' stand for?": "Random Access Memory"
    },
    "Literature": {
        "Who wrote 'To Kill a Mockingbird'?": "Harper Lee",
        "What is the first book in the Harry Potter series?": "Philosopher's Stone",
        "Who wrote '1984'?": "George Orwell",
        "What is the longest book ever written?": "In Search of Lost Time",
        "Who wrote 'The Great Gatsby'?": "F. Scott Fitzgerald",
        "What is the pen name of Samuel Clemens?": "Mark Twain",
        "Who wrote 'Pride and Prejudice'?": "Jane Austen",
        "What is the name of the famous detective created by Arthur Conan Doyle?": "Sherlock Holmes",
        "Who wrote 'Moby Dick'?": "Herman Melville",
        "What is the name of the hobbit who wrote 'There and Back Again'?": "Bilbo Baggins"
    },
    "Food": {
        "What is sushi traditionally wrapped in?": "Seaweed",
        "What is the main ingredient in guacamole?": "Avocado",
        "What spice is made from dried red peppers?": "Paprika",
        "What is the main ingredient in hummus?": "Chickpeas",
        "What is the national dish of Spain?": "Paella",
        "What is the most expensive spice in the world?": "Saffron",
        "What fruit is the most popular worldwide?": "Banana",
        "What is the main ingredient in bread?": "Flour",
        "What is the Italian word for pie?": "Pizza",
        "What is the most popular drink in the world?": "Water"
    },
    "Mythology": {
        "Who is the king of the Greek gods?": "Zeus",
        "What is Thor's hammer called?": "Mjolnir",
        "Who is the goddess of wisdom in Greek mythology?": "Athena",
        "Who is the god of war in Roman mythology?": "Mars",
        "What is the name of the Norse end of the world?": "Ragnarok",
        "Who is the Egyptian god of the dead?": "Anubis",
        "What creature is half lion and half eagle?": "Griffin",
        "What is the river that separates the living and the dead?": "Styx",
        "Who is the messenger god in Greek mythology?": "Hermes",
        "What is Medusa's power?": "Turning to stone"
    }
};



function App() {

    return (
        <>  
            <div className="main_container">
                <div className="left_side_container">
                    <div className="game_info_container">
                        <div className="game_logo_name">
                            <span>Jeopardy Risk & Reward</span>
                        </div>
                        <Timer timeToAnswer={gameSettings.timeToAnswer}/>
                    </div>
                    <div className="game_board_container">
                        <JeopardyQuestionsBoard numberOfCategories={gameSettings.numberOfCategories} 
                                                numberOfRowsInCategory={gameSettings.numberOfRowsInCategory}
                                                categoryStartingMoney={gameSettings.categoryStartingMoney}
                                                categoryMoneyIncreasesBy={gameSettings.categoryMoneyIncreasesBy}
                                                categoriesAndQuestionsAndAnswers={categoriesAndQuestionsAndAnswers}/>
                    </div>
                </div>
                <div className="right_side_container">
                    <JeopardyScoreboard />
                    <ControlPanel/>
                </div>
            </div>
        </>
    );
}

export default App;
