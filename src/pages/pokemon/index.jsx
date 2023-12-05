// import libraries
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Table from 'react-bootstrap/Table';
import { FaStar } from "react-icons/fa6";
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

    const [isShiny, setShiny] = useState(false);

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

    let totalStats = 0;
    // use tabs on each section in menu instead
    // add data in about
    // tab évolution type tree struct + image on line for method + overlay BS clickable full description
    // add toasts on homepage 'welcome in my pokedex blablabla'
    // add carrousel for gallery [offi + offish] + [front + frontsh] + [back + backsh] + [home + homesh] + dreamworld
    // add pixels on div stats
    // add pagination on bottom
    // add filter in header by type route on new page
    return (
        <div >
            {loading ? (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            ) : (
                <div className='pkmn'>
                    <div className={`pkmn__header ${data.types[0].type.name}-light`}>
                        {loading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        ) : (
                        <div className="pkmn__header__images">
                            <img src={pokeball} alt="Pokéball transparent" className="pkmn__header__images__pokeball"/>
                            <img src={isShiny ? (data.sprites.other['official-artwork'].front_shiny) : (data.sprites.other['official-artwork'].front_default)} alt={data.name} className='pkmn__header__images__sprite'/>
                        </div>
                        )}
                        <div className='pkmn__header__infos'>
                            <div className='pkmn__header__infos__number__star'>
                                <p className='pkmn__header__infos__number__star__numb'>#{id.toString().padStart(4, '0')}</p>
                                <Button variant='' className='pkmn__header__infos__number__star__button' onClick={() => setShiny(!isShiny)}><FaStar style={isShiny ? {color: "gold"} : {color: "ghostwhite"}} /></Button>
                            </div>
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
                    <section id='about' className='pkmn__section pkmn__about'>
                        <h2>About</h2>
                        <Table borderless>
                            <thead>
                                <tr>
                                    <th>Pokédex Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Height</td>
                                    <td>{data.height/10} m</td>
                                </tr>
                                <tr>
                                    <td>Weight</td>
                                    <td>{data.weight/10} kg</td>
                                </tr>
                                <tr>
                                    <td>Abilities</td>
                                    <td>
                                        <ol>
                                            {data.abilities.map((ability, index) => {
                                        return (
                                            <li key={index}>{ability.ability.name.charAt(0).toUpperCase()}{ability.ability.name.slice(1)}</li>
                                    )})}</ol>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </section>
                    <section id='stats' className='pkmn__section pkmn__stats'>
                        <h2>Statistics</h2>
                        <Table borderless>
                                <thead>
                                    <tr>
                                        <th>Base Stats</th>
                                    </tr>
                                </thead>
                                    {data.stats.map((stat, index) => {
                                        totalStats += stat.base_stat;
                                        return (
                                            <tbody key={index}>
                                                <tr>
                                                    <td>{stat.stat.name.charAt(0).toUpperCase()}{stat.stat.name.slice(1)}</td>
                                                    <td>{stat.base_stat}</td>
                                                    <td className='pkmn__stats__bars'><div className={`${data.types[0].type.name} pkmn__stats__bars__bar`}></div></td>
                                                </tr>
                                            </tbody>
                                    )})}
                                    <tfoot>
                                        <tr>
                                            <td>Total</td>
                                            <td>{totalStats}</td>
                                        </tr>
                                    </tfoot>
                            </Table>
                    </section>
                    <section id='gallery' className='pkmn__section pkmn__gallery'>
                        <h2>Gallery</h2>
                        <img src={data.sprites.front_default} alt='front' />
                        <img src={data.sprites.front_shiny} alt='fronts' />
                        <img src={data.sprites.back_default} alt='back' />
                        <img src={data.sprites.back_shiny} alt='backs' />
                        <img src={data.sprites.other.home.front_default} alt='home' />
                        <img src={data.sprites.other.home.front_shiny} alt='homes' />
                        <img src={data.sprites.other.dream_world.front_default} alt='dreamworld' />
                    </section>
                </div>
            )}
        </div>
    );
}
// Export to call it up in app.jsx
export default Pokemon;