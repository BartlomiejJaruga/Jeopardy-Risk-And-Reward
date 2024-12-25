import { useMemo, useState } from 'react'
import classes from './JeopardyQuestionsBoard.module.css'
import SingleQuestionTile from '@components/SingleQuestionTile/SingleQuestionTile'
import CategoryNameTile from '@components/CategoryNameTile/CategoryNameTile';

function getRandomCategoriesWithContent(categoriesAndQuestionsAndAnswers, count){
    const allCategories = Object.keys(categoriesAndQuestionsAndAnswers);
    const shuffledCategories = allCategories.sort(() => Math.random() - 0.5);
    const selectedCategories = shuffledCategories.slice(0, count);
    
    const result = {};
    selectedCategories.forEach(category => {
        result[category] = categoriesAndQuestionsAndAnswers[category];
    });
    
    return result;
}

function getRandomQuestions(allQuestions, count){
    const allQuestionsIDs = Object.keys(allQuestions);
    const shuffledQuestionsIDs = allQuestionsIDs.sort(() => Math.random() - 0.5);
    const selectedQuestionsIDs = shuffledQuestionsIDs.slice(0, count);

    const result = {};
    selectedQuestionsIDs.forEach(questionID => {
        result[questionID] = {
            question: allQuestions[questionID].question, 
            answer: allQuestions[questionID].answer
        };
    });

    return result;
}

const generateCategoryTiles = (howMany, 
                                startsAt, 
                                increasesBy, 
                                categoryName, 
                                questions, 
                                getCurrentQuestionID,
                                tileRefs) => {
    if(howMany < 1 || startsAt < 1 || increasesBy < 0){
        howMany = 5;
        startsAt = 100;
        increasesBy = 100;
    }

    const categoryNameAndTiles = [];
    categoryNameAndTiles.push(<CategoryNameTile categoryName={categoryName}/>);

    let questionCounter = 0;
    for(let questionID in questions){
        const tilePrize = (startsAt + increasesBy * questionCounter) + " $";

        categoryNameAndTiles.push(<SingleQuestionTile key={questionID} 
                                                    prize={tilePrize}
                                                    questionID={questionID}
                                                    question={questions[questionID].question}
                                                    answer={questions[questionID].answer}
                                                    getCurrentQuestionID={getCurrentQuestionID}
                                                    ref={(el) => (tileRefs.current[questionID] = el)}/>);

        questionCounter++;
    }

    return categoryNameAndTiles;
}

const generateCategories = (howManyColumns, 
                            howManyRows, 
                            startsAt, 
                            increasesBy, 
                            categoriesQuestionsAnswers, 
                            getCurrentQuestionID,
                            tileRefs) => {
    if(howManyColumns < 1 || howManyRows < 1 || startsAt < 1 || increasesBy < 0){
        howManyColumns = 5;
        howManyRows = 5;
        startsAt = 100;
        increasesBy = 100;
    }

    const chosenCategoriesQuestionAnswers = getRandomCategoriesWithContent(categoriesQuestionsAnswers, howManyColumns);

    const categories = [];
    let categoryCounter = 0;
    for (const category in chosenCategoriesQuestionAnswers) {
        if(categoryCounter >= howManyColumns){
            break;
        }
        
        const questionsAndAnswers = getRandomQuestions(chosenCategoriesQuestionAnswers[category], howManyRows);

        categories.push(generateCategoryTiles(howManyRows, 
                                                startsAt, 
                                                increasesBy, 
                                                category, 
                                                questionsAndAnswers, 
                                                getCurrentQuestionID,
                                                tileRefs));

        categoryCounter++;
    }
    
    return categories;
}

function JeopardyQuestionsBoard({numberOfCategories, 
                                numberOfRowsInCategory, 
                                categoryStartingMoney, 
                                categoryMoneyIncreasesBy,
                                categoriesAndQuestionsAndAnswers,
                                getCurrentQuestionID,
                                tileRefs}) {
    const gridStyles = {
        gridTemplateColumns: `repeat(${numberOfCategories}, minmax(0, 1fr))`,
        gridTemplateRows: `0.5fr repeat(${numberOfRowsInCategory}, minmax(0, 1fr))`,
        aspectRatio: `${numberOfCategories} / ${numberOfRowsInCategory+0.5}`
    };

    const generatedBoard = useMemo(() => {
        return generateCategories(numberOfCategories, 
            numberOfRowsInCategory, 
            categoryStartingMoney, 
            categoryMoneyIncreasesBy,
            categoriesAndQuestionsAndAnswers,
            getCurrentQuestionID,
            tileRefs);
    }, []);

    return (
        <div className={classes.board} style={gridStyles}>
            {generatedBoard}
        </div>
    );
}

export default JeopardyQuestionsBoard;