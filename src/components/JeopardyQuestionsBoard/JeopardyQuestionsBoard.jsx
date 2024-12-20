import { useState } from 'react'
import classes from './JeopardyQuestionsBoard.module.css'
import SingleQuestionTile from '@components/SingleQuestionTile/SingleQuestionTile'
import CategoryNameTile from '@components/CategoryNameTile/CategoryNameTile';

function getRandomCategoriesWithContent(categoriesAndQuestionsAndAnswers, count){
    const allCategories = Object.keys(categoriesAndQuestionsAndAnswers);
    const shuffled = allCategories.sort(() => Math.random() - 0.5);
    const selectedCategories = shuffled.slice(0, count);
    
    const result = {};
    selectedCategories.forEach(category => {
        result[category] = categoriesAndQuestionsAndAnswers[category];
    });
    
    return result;
}

function getRandomQuestions(allQuestions, count){
    const allQuestionsNames = Object.keys(allQuestions);
    const shuffled = allQuestionsNames.sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, count);

    const result = {};
    selectedQuestions.forEach(question => {
        result[question] = allQuestions[question];
    });

    return result;
}

const generateCategoryTiles = (howMany, startsAt, increasesBy, categoryName, questions) => {
    if(howMany < 1 || startsAt < 1 || increasesBy < 0){
        howMany = 5;
        startsAt = 100;
        increasesBy = 100;
    }

    const categoryNameAndTiles = [];
    categoryNameAndTiles.push(<CategoryNameTile categoryName={categoryName}/>);

    let questionCounter = 0;
    for(let question in questions){
        const tilePrize = (startsAt + increasesBy * questionCounter) + " $";
        const individualKey = categoryName + questionCounter;
        categoryNameAndTiles.push(<SingleQuestionTile key={individualKey} 
            prize={tilePrize}
            question={question}
            answer={questions[question]}/>);
        questionCounter++;
    }

    // for(let i = 0; i < howMany; i++){
    //     const tilePrize = (startsAt + increasesBy * i) + " $";
    //     categoryNameAndTiles.push(<SingleQuestionTile key={i} 
    //                                     prize={tilePrize}
    //                                     question="Is Earth round or flat?"
    //                                     answer="It is flat"/>);
    // }

    return categoryNameAndTiles;
}

const generateCategories = (howManyColumns, howManyRows, startsAt, increasesBy, categoriesQuestionsAnswers) => {
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
        
        const questions = getRandomQuestions(chosenCategoriesQuestionAnswers[category], howManyRows);

        categories.push(generateCategoryTiles(howManyRows, startsAt, increasesBy, category, questions));

        categoryCounter++;
    }
    
    return categories;
}

function JeopardyQuestionsBoard({numberOfCategories, 
                                numberOfRowsInCategory, 
                                categoryStartingMoney, 
                                categoryMoneyIncreasesBy,
                                categoriesAndQuestionsAndAnswers}) {
    const gridStyles = {
        gridTemplateColumns: `repeat(${numberOfCategories}, minmax(0, 1fr))`,
        gridTemplateRows: `0.5fr repeat(${numberOfRowsInCategory}, minmax(0, 1fr))`,
        aspectRatio: `${numberOfCategories} / ${numberOfRowsInCategory+0.5}`
    };

    return (
        <div className={classes.board} style={gridStyles}>
            {generateCategories(numberOfCategories, 
                                numberOfRowsInCategory, 
                                categoryStartingMoney, 
                                categoryMoneyIncreasesBy,
                                categoriesAndQuestionsAndAnswers)}
        </div>
    );
}

export default JeopardyQuestionsBoard;