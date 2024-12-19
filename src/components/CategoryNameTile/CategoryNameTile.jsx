import { useState } from 'react'
import classes from './CategoryNameTile.module.css'

function CategoryNameTile({categoryName}){
    return (
        <div className={classes.category_name_tile}>{categoryName}</div>
    );
}

export default CategoryNameTile;