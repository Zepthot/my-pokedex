// import libraries
import React from 'react';
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
// import components

// import assets

// import css
import '../assets/styles/triggerEvo.scss';

/*
triggerEvo component
@params :
    - evo: {object} - Pokemon evolution details

Component description
*/

function triggerEvo({evo}) {

    if (evo.item) {
        let item = evo.item.name.split('-')
        item.forEach((element, index) => {
            item[index] = element.charAt(0).toUpperCase() + element.slice(1);
        });
    }
    
    const renderTooltip = (props) => {
        let item = evo.item.name.split('-');
        item.forEach((element, index) => {
            item[index] = element.charAt(0).toUpperCase() + element.slice(1);
        });
        return (
            <Tooltip id="button-tooltip" {...props}>
                {item.toString().replace(',', ' ')}
            </Tooltip>
        )
    };

    return (
        <div className='triggerEvo'>
            <FaRegArrowAltCircleDown className='triggerEvo__arrow'/>
            <div>
                {/* rocabot evolution-chain/383/ + cosmog evolution-chain/413/ special method */}
                {/* review all https://bulbapedia.bulbagarden.net/wiki/Methods_of_evolution + certain game + Unique conditions + Additional factors etc + evoli fairy skill */}
                {evo.trigger.name === 'level-up' ? ' Level up ' : null}
                {evo.min_level ? `${evo.min_level}+` : null}
                {evo.min_happiness ? ` with min ${evo.min_happiness} hapiness`  : null}
                {evo.known_move ? ` knowing ${evo.known_move.name}` : null}
                {evo.time_of_day ? ` during ${evo.time_of_day} ` : null}
                {evo.trigger.name === 'use-item' ? ' Use ' : null}
                {evo.item ? 
                <OverlayTrigger delay={{ show: 100, hide: 200 }} overlay={renderTooltip}>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${evo.item.name}.png`} alt={evo.item.name} />
                </OverlayTrigger> : null}
                {evo.trigger.name === 'trade' ? ' Trade ' : null}
                {evo.held_item ? <>with <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${evo.held_item.name}.png`} alt={evo.held_item.name} /></> : null}
                {evo.gender ? evo.gender === 1 ? ` on only femelle` : ` on only male` : null}
            </div>
        </div>
    )
};
// Export to call it up
export default triggerEvo;