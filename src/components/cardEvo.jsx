// import libraries
import React from 'react';
import { Link } from 'react-router-dom';
// import components

// import assets

// import css
import '../assets/styles/cardEvo.scss';

/*
cardEvo component
@params :
    - url: {string} - url of pokemon details
    - name: {string} - name of pokemon
    - shiny: {boolean} - ref isShiny in parent

Component description
*/

function cardEvo({url, name, shiny}) {

    return (
        <Link to={`/${url}`} className='cardEvo'>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${shiny ? 'shiny/' : ''}${url}.png`} alt={name} className='cardEvo__image' />
                <span>{name.charAt(0).toUpperCase()}{name.slice(1)}</span>
        </Link>
    )
};
// Export to call it up
export default cardEvo;