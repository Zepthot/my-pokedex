// import libraries
import { useEffect } from "react";
import { useState } from "react";
// Home function
function Home () {
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
                // fetch sprite, id and name of pokemon and push in array
                for (const pkmn of json.results) {
                    const resp = await fetch(pkmn.url);
                    const detailsPkmn = await resp.json();
                    const homeSprite = detailsPkmn.sprites.front_default;
                    const pkmnTemp = {sprite : `${homeSprite}`, id : `${detailsPkmn.id}`, name : `${pkmn.name}`}
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
        <div>
            <h2>List of pokemon gen1</h2>
            <ul>
                {/* display pokémon image, numbers and name in a list */}
                {data.map((pkmn) => (
                    <li key={pkmn.id}><img src={pkmn.sprite} alt={pkmn.name} />{pkmn.id}{pkmn.name}</li>
                ))}
            </ul>
            {/* button to trigger useEffect and add 25 to display */}
            {offset < totalOffset && (
                <button onClick={() => setOffset(offset + 25)}>{loading ? "Loading..." : "Load more"}</button>
            )}
        </div>
    );
}
// Export to call it up in app.jsx
export default Home;