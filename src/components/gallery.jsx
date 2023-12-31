// import libraries
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
// import assets
import pokeball from '../assets/pokeball.png';
// import css
import '../styles/gallery.scss';
import '../styles/types.scss';

// Gallery function
function Gallery () {
    // pokémon data
    const [data, setData] = useState([]);
    // display limit
    const [offset, setOffset] = useState(0);
    // display max
    const [totalOffset, setTotalOffset] = useState(0);
    // to change button on loading datas
    const [loading, setLoading] = useState(false);

    // fetch datas of 25 next pokémons on click
    useEffect(() => {
        const fetchData = async () => {
            try {
                // loading state start
                setLoading(true);
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=25&offset=${offset}`);
                const json = await res.json();
                const listPkmn = [];
                // fetch sprite, id, name and types of pokemon and push in array
                for (const pkmn of json.results) {
                    const resp = await fetch(pkmn.url);
                    const detailsPkmn = await resp.json();
                    const offSprite = detailsPkmn.sprites.other['official-artwork'].front_default;
                    const pkmnNb = detailsPkmn.id.toString().padStart(4, '0');
                    const pkmnTypes = [];
                    for (let i = 0; i < detailsPkmn.types.length; i++) {
                        pkmnTypes.push(detailsPkmn.types[i].type.name);
                    }
                    const pkmnTemp = {sprite : `${offSprite}`, id : `${detailsPkmn.id}`, number : `${pkmnNb}`, name : `${detailsPkmn.species.name}`};
                    pkmnTemp.types = pkmnTypes;
                    listPkmn.push(pkmnTemp);
                }
                // loading state end
                setLoading(false);
                // add 25 pokémons created to data
                setData(pre => [...pre, ...listPkmn]);
                setTotalOffset(json.count);
            } catch(error) {
                console.error(error);
            }
        }
        fetchData();
    }, [offset]);

    return (
        <div className="gallery">
            <h2>List of pokemon</h2>
            {/* display pokémon image, numbers, name and types in a list */}
            <Row xs={{cols:2}} sm={{cols:2}} md={{cols:3}} lg={{cols:4}} xl={{cols: 5}} xxl={{cols:5}} className="gallery__group">
                {data && data.map((pkmn) => {
                    return (
                    <Link key={pkmn.id} to={`/${pkmn.id}`} className="gallery__group__button">
                        {/* card of pokemon */}
                        <Card border="dark" className={`gallery__card ${pkmn.types[0]}-light`} >
                            <div className="gallery__card__images">
                                <Card.Img src={pokeball} alt="Pokéball transparent" className="gallery__card__images__pokeball"/>
                                <Card.Img variant="top" src={pkmn.sprite} alt={pkmn.name} />
                            </div>
                            <Card.Body className="gallery__card__body">
                                <Card.Text className="gallery__card__body__id">#{pkmn.number}</Card.Text>
                                <Card.Title className="gallery__card__body__name">{`${pkmn.name}`.charAt(0).toUpperCase()}{`${pkmn.name}`.slice(1)}</Card.Title>
                                <div className="gallery__card__body__types">
                                    {pkmn.types.map((type, index) => (
                                        <Badge key={index} className={`card__body__types__badge ${type}`} bg="">{`${type}`.toUpperCase()}</Badge>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                    </Link>
                )})}
            </Row>
            {/* button to trigger useEffect and add 25 to display */}
            {offset < totalOffset && (
                <button onClick={() => setOffset(offset + 25)}>{loading ? (
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                ) : "Load more"}</button>
            )}
        </div>
    );
}
// Export to call it up in index.jsx
export default Gallery;