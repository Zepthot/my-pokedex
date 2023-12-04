// import libraries
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import assets
import pokeball from '../../assets/pokeball.png';
// import css
import '../../styles/types.scss';
import '../../styles/pokemon.scss';

// Home function
function Pokemon () {
    const { id } = useParams();

    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(true);

    const [isActive, setActive] = useState('about');

    useEffect(() => {
        const fetchPkmn = async () => {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const json = await res.json();
                setData(json);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchPkmn();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='pkmn'>
            {loading ? (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            ) : (
                <div>
                    <div className={`pkmn__header ${data.types[0].type.name}-light`}>
                        {loading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        ) : (
                        <div className="pkmn__header__images">
                            <img src={pokeball} alt="Pokéball transparent" className="pkmn__header__images__pokeball"/>
                            <img src={data.sprites.front_default} alt={data.name} className='pkmn__header__images__sprite'/>
                        </div>
                        )}
                        <div className='pkmn__header__infos'>
                            <p className='pkmn__header__infos__number'>#{id.toString().padStart(4, '0')}</p>
                            <h1 className='pkmn__header__infos__name'>{`${data.name}`.charAt(0).toUpperCase()}{`${data.name}`.slice(1)}</h1>
                            <div className='pkmn__header__infos__types'>
                                {data.types.map((type, index) => (
                                    <Badge key={index} className={`pkmn__header__infos__types__badge ${type.type.name}`} bg="">{`${type.type.name}`.toUpperCase()}</Badge>
                                ))}
                            </div>
                        </div>
                        <ButtonGroup vertical className='pkmn__header__buttonmenu'>
                            <Button variant='' className={isActive === 'about' ? `${data.types[0].type.name}` : `${data.types[0].type.name}-light`} onClick={() => setActive('about')}>About</Button>
                            <Button variant='' className={isActive === 'stats' ? `${data.types[0].type.name}` : `${data.types[0].type.name}-light`} onClick={() => setActive('stats')}>Statistics</Button>
                            <Button variant='' className={isActive === 'gallery' ? `${data.types[0].type.name}` : `${data.types[0].type.name}-light`} onClick={() => setActive('gallery')}>Gallery</Button>
                        </ButtonGroup>
                    </div>
                    <section className='pkmn__about'>
                        <p>about</p>
                    </section>
                    <section>
                        <p>stats</p>
                    </section>
                    <section>
                        <p>gallery</p>
                    </section>
                </div>
            )}
        </div>
    );
}
// Export to call it up in app.jsx
export default Pokemon;