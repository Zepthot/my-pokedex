// import libraries
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Carousel from 'react-bootstrap/Carousel';
import { FaStar } from "react-icons/fa6";
import { IoMdFemale } from "react-icons/io";
import { IoMdMale } from "react-icons/io";
// import assets
import pokeball from '../../assets/pokeball.png';
// import css
import '../../styles/types.scss';
import '../../styles/pokemon.scss';

// Home function
function Pokemon () {
    const { id } = useParams();

    const [data, setData] = useState([]);
    const [dataspec, setDataspec] = useState([]);

    const [loading, setLoading] = useState(true);

    const [isShiny, setShiny] = useState(false);

    const [key, setKey] = useState('about');

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        const fetchPkmn = async () => {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const json = await res.json();
                setData(json);
                const resp = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
                const jsonn = await resp.json();
                setDataspec(jsonn);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchPkmn();
        // eslint-disable-next-line
    }, []);

    let totalStats = 0;
    // tab évolution type tree struct + image on line for method + overlay BS clickable full description
    // add pagination on bottom
    // add filter in header with dropdown by type route on new page
    // add toasts with timeout on api call + animation
    return (
        <div >
            {loading ? (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            ) : (
                <div className={`pkmn ${data.types[0].type.name}-light`}>
                    <div className='pkmn__header'>
                        {loading ? (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        ) : (
                        <div className="pkmn__header__images">
                            <img src={pokeball} alt="Pokéball transparent" className="pkmn__header__images__pokeball"/>
                            <img src={isShiny ? (data.sprites.other['official-artwork'].front_shiny) : (data.sprites.other['official-artwork'].front_default)} alt={isShiny ? `${data.name} shiny` : (data.name)} className='pkmn__header__images__sprite'/>
                        </div>
                        )}
                        <div className='pkmn__header__infos'>
                            <div className='pkmn__header__infos__number__star'>
                                <p className='pkmn__header__infos__number__star__numb'>#{id.toString().padStart(4, '0')}</p>
                                <Button variant='' className='pkmn__header__infos__number__star__button' onClick={() => setShiny(!isShiny)}><FaStar style={isShiny ? {color: "gold"} : {color: "ghostwhite"}} /></Button>
                            </div>
                            <h1 className='pkmn__header__infos__name'>{data.name.charAt(0).toUpperCase()}{data.name.slice(1)}</h1>
                            <div className='pkmn__header__infos__types'>
                                {data.types.map((type, index) => (
                                    <Badge key={index} className={`pkmn__header__infos__types__badge ${type.type.name}`} bg="">{`${type.type.name}`.toUpperCase()}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Tabs activeKey={key} onSelect={(k) => setKey(k)} className={`mb-3 ${data.types[0].type.name}`}>
                        <Tab eventKey='about' title='About' className={`pkmn__tab ${data.types[0].type.name}`}>
                            <section id='about' className='pkmn__tab__section pkmn__about'>
                                <Table borderless className='pkmn__tab__section__table'>
                                    <thead>
                                        <tr>
                                            <th>Pokédex Data</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Category</td>
                                            <td>{dataspec.genera[7].genus}</td>
                                        </tr>
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
                                                    )})}
                                                </ol>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Egg Groups</td>
                                            <td>
                                                <ol>
                                                    {dataspec.egg_groups.map((group, index) => {
                                                        return (
                                                            <li key={index}>{group.name.charAt(0).toUpperCase()}{group.name.slice(1)}</li>
                                                    )})}
                                                </ol>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Hatch time</td>
                                            <td>{dataspec.hatch_counter} cycles - {dataspec.hatch_counter * 128} steps</td>
                                        </tr>
                                        <tr>
                                            <td>EV yield</td>
                                            <td>
                                                {/* eslint-disable-next-line */}
                                                {data.stats.map((stat) => {
                                                    if(stat.effort > 0) {
                                                        return (
                                                            `+${stat.effort} ${stat.stat.name.charAt(0).toUpperCase()}${stat.stat.name.slice(1)}`
                                                        )
                                                    }
                                                })}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Color</td>
                                            <td>{dataspec.color.name.charAt(0).toUpperCase()}{dataspec.color.name.slice(1)}</td>
                                        </tr>
                                        <tr>
                                            <td>Gender ratio</td>
                                            <td>
                                                {(dataspec.gender_rate/8)*100}% <IoMdFemale /> {100-(dataspec.gender_rate/8)*100}% <IoMdMale />
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </section>
                        </Tab>
                        <Tab eventKey='stats' title='Statistics' className={`pkmn__tab ${data.types[0].type.name}`}>
                            <section id='stats' className='pkmn__tab__section pkmn__stats'>
                                <Table borderless className='pkmn__tab__section__table'>
                                        <thead>
                                            <tr>
                                                <th>Base Stats</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                            {data.stats.map((stat, index) => {
                                                totalStats += stat.base_stat;
                                                return (
                                                    <tbody key={index}>
                                                        <tr>
                                                            <td>{stat.stat.name.charAt(0).toUpperCase()}{stat.stat.name.slice(1)}</td>
                                                            <td>{stat.base_stat}</td>
                                                            <td className='pkmn__stats__bars'><div style={{width: `${stat.base_stat}px`}} className={`${data.types[0].type.name} pkmn__stats__bars__bar`}></div></td>
                                                        </tr>
                                                    </tbody>
                                            )})}
                                            <tfoot>
                                                <tr>
                                                    <td>Total</td>
                                                    <td>{totalStats}</td>
                                                    <td></td>
                                                </tr>
                                            </tfoot>
                                    </Table>
                            </section>
                        </Tab>
                        <Tab eventKey='gallery' title='Gallery' className={`pkmn__tab ${data.types[0].type.name}`}>
                            <section id='gallery' className='pkmn__tab__section pkmn__gallery'>
                                <Carousel activeIndex={index} onSelect={handleSelect}>
                                    <Carousel.Item>
                                        <div className='pkmn__gallery__item'>
                                            <img src={data.sprites.other['official-artwork'].front_default} alt={`Official artwork of ${data.name}`} />
                                            <img src={data.sprites.other['official-artwork'].front_shiny} alt={`Official artwork of ${data.name} shiny`} />
                                        </div>
                                        <Carousel.Caption>
                                            <h2>Official artwork of {data.name.charAt(0).toUpperCase()}{data.name.slice(1)}</h2>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className='pkmn__gallery__item gallery__item__grid'>
                                            <img className='pkmn__gallery__item__defaut' src={data.sprites.front_default} alt={`Sprite from front of ${data.name}`} />
                                            <img className='pkmn__gallery__item__defaut' src={data.sprites.back_default} alt={`Sprite from back of ${data.name}`} />
                                            <img className='pkmn__gallery__item__defaut' src={data.sprites.front_shiny} alt={`Sprite from front of ${data.name} shiny`} />
                                            <img className='pkmn__gallery__item__defaut' src={data.sprites.back_shiny} alt={`Sprite from back of ${data.name} shiny`} />
                                        </div>
                                        <Carousel.Caption>
                                            <h2>Sprite of {data.name.charAt(0).toUpperCase()}{data.name.slice(1)}</h2>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className='pkmn__gallery__item'>
                                            <img src={data.sprites.other.home.front_default} alt={`Home artwork from front of ${data.name}`} />
                                            <img src={data.sprites.other.home.front_shiny} alt={`Home artwork from front of ${data.name} shiny`} />
                                        </div>
                                        <Carousel.Caption>
                                            <h2>Sprite from Home of {data.name.charAt(0).toUpperCase()}{data.name.slice(1)}</h2>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div className='pkmn__gallery__item'>
                                            <img src={data.sprites.other.dream_world.front_default} alt={`Dreamworld artwork from front of ${data.name}`} />
                                        </div>
                                        <Carousel.Caption>
                                            <h2>Sprite from Dreamworld of {data.name.charAt(0).toUpperCase()}{data.name.slice(1)}</h2>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>
                            </section>
                        </Tab>
                    </Tabs>
                </div>
            )}
        </div>
    );
}
// Export to call it up in app.jsx
export default Pokemon;