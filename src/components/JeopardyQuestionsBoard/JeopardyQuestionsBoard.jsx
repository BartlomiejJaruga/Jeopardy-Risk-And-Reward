import { useState } from 'react'
import classes from './JeopardyQuestionsBoard.module.css'
import SingleQuestionTile from '@components/SingleQuestionTile/SingleQuestionTile'
import CategoryNameTile from '@components/CategoryNameTile/CategoryNameTile';

const generatePrizes = (howMany, startsAt, increasesBy) => {
    if(howMany < 1 || startsAt < 1 || increasesBy < 0){
        howMany = 5;
        startsAt = 100;
        increasesBy = 100;
    }

    const categoryNameAndTiles = [];
    categoryNameAndTiles.push(<CategoryNameTile categoryName="Games Trivia"/>);

    for(let i = 0; i < howMany; i++){
        const tilePrize = (startsAt + increasesBy * i) + " $";
        categoryNameAndTiles.push(<SingleQuestionTile key={i} 
                                        prize={tilePrize}
                                        question="Is Earth round or flat?"
                                        answer="It is flat"/>);
    }

    return categoryNameAndTiles;
}

const generateCategories = (howManyColumns, howManyRows, startsAt, increasesBy) => {
    if(howManyColumns < 1 || howManyRows < 1 || startsAt < 1 || increasesBy < 0){
        howManyColumns = 5;
        howManyRows = 5;
        startsAt = 100;
        increasesBy = 100;
    }
    const categories = [];
    for(let i = 0; i < howManyColumns; i++){
        categories.push(generatePrizes(howManyRows, startsAt, increasesBy));
    }
    
    return categories;
}

function JeopardyQuestionsBoard({numberOfCategories, 
                                numberOfRowsInCategory, 
                                categoryStartingMoney, 
                                categoryMoneyIncreasesBy}) {
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
                                categoryMoneyIncreasesBy)}
        </div>
    );
}

export default JeopardyQuestionsBoard;