// import libraries
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Spinner, Placeholder } from 'react-bootstrap';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
// import components

// import assets
import pokeball from '../assets/pokeball.png';
// import css
import '../assets/styles/types.scss';
import '../assets/styles/previousNext.scss';

/*
PreviousNext component
@params :
    - firstParams: {type} - description

Component description
*/

function PreviousNext({previous, id, shiny}) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPkmn = async () => {
            setLoading(true);
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                // console.log('res: ', res); TODO, look for react query / axios
                const datajson = await res.json();
                // console.log('data: ', datajson);
                setData(datajson);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchPkmn();
        // eslint-disable-next-line
    }, [id]);

    return (
        <Card as={Link} to={`/${id}`} className={previous ? `side previous ${loading ? `normal` : `${data.types[0].type.name}`}` : `side next ${loading ? `normal` : `${data.types[0].type.name}`}`} >
            {previous ? <GrFormPrevious className='side__arrow'/> : <GrFormNext className='side__arrow' />}
            <div className='side__pkmn'>
                    <Card.Img src={pokeball} alt="Pokéball transparent" className='side__pkmn__pokeball' />
                    {loading ? <Spinner className='side__pkmn__loading' /> : 
                    <Card.Img 
                        variant="top" 
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${shiny ? 'shiny/' : ''}${id}.png`} 
                        alt={data.name} 
                        className='side__pkmn__sprite' /> }
            </div>
            <Card.Body className={previous ? 'side__body' : 'side__body next__side'}>
                {loading ?
                ( <Placeholder as={Card.Title} animation="glow" className='side__body__title'>
                    <Placeholder md={12} />
                </Placeholder> ) :
                    <Card.Title className='side__body__title'>{`${data.name}`.charAt(0).toUpperCase()}{`${data.name}`.slice(1)}</Card.Title>
                }
                <Card.Text className='side__body__id'>#{id.toString().padStart(4, '0')}</Card.Text>
            </Card.Body>
        </Card>
        
    )
};
// Export to call it up
export default PreviousNext;