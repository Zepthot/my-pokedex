// import libraries
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Spinner,
  Badge,
  Button,
  Tab,
  Tabs,
  Table,
  Placeholder,
} from "react-bootstrap";
import { FaStar } from "react-icons/fa6";
import { IoMdFemale, IoMdMale } from "react-icons/io";
// import components
import CardEvo from "../../components/cardEvo";
import TriggerEvo from "../../components/triggerEvo";
import CarouselGallery from "../../components/CarouselGallery";
import PreviousNext from "../../components/previousNext";
// import assets
import pokeball from "../../assets/images/pokeball.png";
// import css
import "../../assets/styles/types.scss";
import "../../assets/styles/pokemon.scss";

// Home function
function Pokemon() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [dataspec, setDataspec] = useState([]);
  const [dataevo, setDataevo] = useState([]);
  const [weaknessCol1, setWeaknessCol1] = useState([]);
  const [weaknessCol2R1, setWeaknessCol2R1] = useState([]);
  const [weaknessCol2R2, setWeaknessCol2R2] = useState([]);
  const [weaknessCol3, setWeaknessCol3] = useState([]);
  const [weaknessCol4R1, setWeaknessCol4R1] = useState([]);
  const [weaknessCol4R2, setWeaknessCol4R2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isShiny, setShiny] = useState(false);
  const [key, setKey] = useState("about");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPkmn = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const datajson = await res.json();
        setData(datajson);
        const resp = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        const dataspecjson = await resp.json();
        setDataspec(dataspecjson);
        // setLoading(false);
      } catch (error) {
        navigate("/error");
        console.log(error);
      }
    };
    fetchPkmn();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    const fetchEvo = async () => {
      try {
        const respo = await fetch(dataspec.evolution_chain.url);
        const dataevojson = await respo.json();
        setDataevo(dataevojson);
        const response = await fetch("./types.json");
        const datatypejson = await response.json();
        let AllWeakness = {};
        if (data.types[1]) {
          const weakness0 = datatypejson[data.types[0].type.name];
          const weakness1 = datatypejson[data.types[1].type.name];
          for (const key in weakness0) {
            AllWeakness[key] = weakness0[key] * weakness1[key];
          }
        } else {
          AllWeakness = datatypejson[data.types[0].type.name];
        }
        setWeaknessCol1(
          Object.keys(AllWeakness).filter((key) => AllWeakness[key] === 0)
        );
        setWeaknessCol2R1(
          Object.keys(AllWeakness).filter((key) => AllWeakness[key] === 0.25)
        );
        setWeaknessCol2R2(
          Object.keys(AllWeakness).filter((key) => AllWeakness[key] === 0.5)
        );
        setWeaknessCol3(
          Object.keys(AllWeakness).filter((key) => AllWeakness[key] === 1)
        );
        setWeaknessCol4R1(
          Object.keys(AllWeakness).filter((key) => AllWeakness[key] === 2)
        );
        setWeaknessCol4R2(
          Object.keys(AllWeakness).filter((key) => AllWeakness[key] === 4)
        );
        setLoading(false);
      } catch (error) {
        if (dataspec.length !== 0) {
          console.error(error);
        }
      }
    };
    fetchEvo();
    // eslint-disable-next-line
  }, [dataspec]);

  let totalStats = 0;

  return (
    <div
      className={`pkmn ${
        loading ? `normal-light` : `${data.types[0].type.name}-light`
      }`}
    >
      <div className='pkmn__header'>
        {id === "1" ? (
          <PreviousNext previous={true} id='1025' shiny={isShiny} />
        ) : (
          <PreviousNext previous={true} id={id - 1} shiny={isShiny} />
        )}
        <div style={{ display: "flex" }}>
          <div className='pkmn__header__images'>
            <img
              src={pokeball}
              alt='Pokéball transparent'
              className='pkmn__header__images__pokeball'
            />
            {loading ? (
              <Spinner className='pkmn__header__images__sprite__loading' />
            ) : (
              <img
                src={
                  isShiny
                    ? data.sprites.other["official-artwork"].front_shiny
                    : data.sprites.other["official-artwork"].front_default
                }
                alt={isShiny ? `${data.name} shiny` : data.name}
                className='pkmn__header__images__sprite'
              />
            )}
          </div>
          <div className='pkmn__header__infos'>
            <div className='pkmn__header__infos__number__star'>
              <p className='pkmn__header__infos__number__star__numb'>
                #{id.toString().padStart(4, "0")}
              </p>
              <Button
                variant=''
                className='pkmn__header__infos__number__star__button'
                onClick={() => setShiny(!isShiny)}
              >
                <FaStar
                  style={isShiny ? { color: "gold" } : { color: "ghostwhite" }}
                />
              </Button>
            </div>
            {loading ? (
              <Placeholder
                md={12}
                size='lg'
                className='pkmn__header__infos__name__loading'
              />
            ) : (
              <h1 className='pkmn__header__infos__name'>
                {data.name.charAt(0).toUpperCase()}
                {data.name.slice(1)}
              </h1>
            )}
            <div className='pkmn__header__infos__types'>
              {loading ? (
                <Badge
                  className={`pkmn__header__infos__types__badge normal`}
                  bg=''
                >
                  <Placeholder md={10} />
                </Badge>
              ) : (
                <>
                  {data.types.map((type, index) => (
                    <Badge
                      key={index}
                      className={`pkmn__header__infos__types__badge ${type.type.name}`}
                      bg=''
                    >
                      {`${type.type.name}`.toUpperCase()}
                    </Badge>
                  ))}{" "}
                </>
              )}
            </div>
          </div>
        </div>
        {id === "1025" ? (
          <PreviousNext previous={false} id='1' shiny={isShiny} />
        ) : (
          <PreviousNext previous={false} id={id - 1 + 2} shiny={isShiny} />
        )}
      </div>
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className={`mb-3 ${loading ? `normal` : `${data.types[0].type.name}`}`}
      >
        <Tab
          eventKey='about'
          title='About'
          className={`pkmn__tab ${
            loading ? `normal` : `${data.types[0].type.name}`
          }`}
        >
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
                  {loading ? (
                    <td>
                      <Placeholder md={5} />
                    </td>
                  ) : (
                    <td>
                      {dataspec.genera.map((element, index) => {
                        if (element.language.name === "en") {
                          return (
                            <Fragment key={index}>
                              {dataspec.genera[index].genus}
                            </Fragment>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </td>
                  )}
                </tr>
                <tr>
                  <td>Height</td>
                  {loading ? (
                    <td>
                      <Placeholder md={2} />
                    </td>
                  ) : (
                    <td>{data.height / 10} m</td>
                  )}
                </tr>
                <tr>
                  <td>Weight</td>
                  {loading ? (
                    <td>
                      <Placeholder md={2} />
                    </td>
                  ) : (
                    <td>{data.weight / 10} kg</td>
                  )}
                </tr>
                <tr>
                  <td>Abilities</td>
                  <td>
                    {loading ? (
                      <ol>
                        <li>
                          <Placeholder md={4} />
                        </li>
                        <li>
                          <Placeholder md={6} />
                        </li>
                      </ol>
                    ) : (
                      <ol>
                        {data.abilities.map((ability, index) => {
                          return (
                            <li key={index}>
                              {ability.ability.name.charAt(0).toUpperCase()}
                              {ability.ability.name.slice(1)}
                            </li>
                          );
                        })}
                      </ol>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Egg Groups</td>
                  <td>
                    {loading ? (
                      <ol>
                        <li>
                          <Placeholder md={4} />
                        </li>
                        <li>
                          <Placeholder md={5} />
                        </li>
                      </ol>
                    ) : (
                      <ol>
                        {dataspec.egg_groups.map((group, index) => {
                          return (
                            <li key={index}>
                              {group.name.charAt(0).toUpperCase()}
                              {group.name.slice(1)}
                            </li>
                          );
                        })}
                      </ol>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Hatch time</td>
                  {loading ? (
                    <td>
                      <Placeholder md={2} /> - <Placeholder md={4} />
                    </td>
                  ) : (
                    <td>
                      {dataspec.hatch_counter} cycles -{" "}
                      {dataspec.hatch_counter * 128} steps
                    </td>
                  )}
                </tr>
                <tr>
                  <td>EV yield</td>
                  {loading ? (
                    <td>
                      <Placeholder md={6} />
                    </td>
                  ) : (
                    <td className='pkmn__tab__section__table__EV'>
                      {/* eslint-disable-next-line */}
                      {data.stats.map((stat, index) => {
                        if (stat.effort > 0) {
                          return (
                            <span key={index}>
                              +{stat.effort}{" "}
                              {stat.stat.name.charAt(0).toUpperCase()}
                              {stat.stat.name.slice(1)}
                            </span>
                          );
                        }
                      })}
                    </td>
                  )}
                </tr>
                <tr>
                  <td>Color</td>
                  {loading ? (
                    <td>
                      <Placeholder md={2} />
                    </td>
                  ) : (
                    <td>
                      {dataspec.color.name.charAt(0).toUpperCase()}
                      {dataspec.color.name.slice(1)}
                    </td>
                  )}
                </tr>
                <tr>
                  <td>Gender ratio</td>
                  {loading ? (
                    <td>
                      <Placeholder md={4} />
                    </td>
                  ) : (
                    <td>
                      {(dataspec.gender_rate / 8) * 100}% <IoMdFemale />{" "}
                      {100 - (dataspec.gender_rate / 8) * 100}% <IoMdMale />
                    </td>
                  )}
                </tr>
              </tbody>
            </Table>
          </section>
        </Tab>
        <Tab
          eventKey='stats'
          title='Statistics'
          className={`pkmn__tab ${
            loading ? `normal` : `${data.types[0].type.name}`
          }`}
        >
          <section id='stats' className='pkmn__tab__section pkmn__stats'>
            <Table borderless className='pkmn__tab__section__table'>
              <thead>
                <tr>
                  <th>Base Stats</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              {loading ? (
                <tbody>
                  <tr>
                    <td>
                      <Placeholder md={2} />
                    </td>
                    <td>
                      <Placeholder md={2} />
                    </td>
                    <td>
                      <Placeholder md={8} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Placeholder md={4} />
                    </td>
                    <td>
                      <Placeholder md={2} />
                    </td>
                    <td>
                      <Placeholder md={6} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Placeholder md={4} />
                    </td>
                    <td>
                      <Placeholder md={2} />
                    </td>
                    <td>
                      <Placeholder md={5} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Placeholder md={6} />
                    </td>
                    <td>
                      <Placeholder md={2} />
                    </td>
                    <td>
                      <Placeholder md={7} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Placeholder md={6} />
                    </td>
                    <td>
                      <Placeholder md={2} />
                    </td>
                    <td>
                      <Placeholder md={3} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Placeholder md={3} />
                    </td>
                    <td>
                      <Placeholder md={2} />
                    </td>
                    <td>
                      <Placeholder md={8} />
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {data.stats.map((stat, index) => {
                    totalStats += stat.base_stat;
                    return (
                      <tr key={index}>
                        <td>
                          {stat.stat.name.charAt(0).toUpperCase()}
                          {stat.stat.name.slice(1)}
                        </td>
                        <td>{stat.base_stat}</td>
                        <td className='pkmn__stats__bars'>
                          <div
                            style={{ width: `${stat.base_stat}px` }}
                            className={`${data.types[0].type.name} pkmn__stats__bars__bar`}
                          ></div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
              <tfoot>
                {loading ? (
                  <tr>
                    <td>
                      <Placeholder md={3} />
                    </td>
                    <td>
                      <Placeholder md={2} />
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td>Total</td>
                    <td>{totalStats}</td>
                  </tr>
                )}
              </tfoot>
            </Table>
          </section>
        </Tab>
        <Tab
          eventKey='type'
          title='Type effectiveness'
          className={`pkmn__tab ${
            loading ? `normal` : `${data.types[0].type.name}`
          }`}
        >
          <section id='type' className='pkmn__tab__section'>
            <Table borderless className='pkmn__tab__section__table'>
              <thead>
                <tr>
                  {weaknessCol1.length > 0 && (
                    <th className='pkmn__tab__section__table__head'>
                      Immune to
                    </th>
                  )}
                  <th className='pkmn__tab__section__table__head'>
                    Resistant to
                  </th>
                  <th className='pkmn__tab__section__table__head'>
                    Damaged normally by
                  </th>
                  <th className='pkmn__tab__section__table__head'>Weak to</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {weaknessCol1.length > 0 && (
                    <td>
                      {weaknessCol1.map((type) => (
                        <Badge
                          key={type}
                          className={`${type} pkmn__tab__section__table__badge`}
                        >
                          {type}
                        </Badge>
                      ))}
                    </td>
                  )}
                  <td>
                    {weaknessCol2R1.length > 0 && (
                      <div>
                        <span className='pkmn__tab__section__table__subdiv'>
                          x 0.25
                        </span>
                        {weaknessCol2R1.map((type) => (
                          <Badge
                            key={type}
                            className={`${type} pkmn__tab__section__table__badge`}
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {weaknessCol2R2.length > 0 && (
                      <div>
                        <span className='pkmn__tab__section__table__subdiv'>
                          x 0.5
                        </span>
                        {weaknessCol2R2.map((type) => (
                          <Badge
                            key={type}
                            className={`${type} pkmn__tab__section__table__badge`}
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </td>
                  <td>
                    {weaknessCol3 &&
                      weaknessCol3.map((type) => (
                        <Badge
                          key={type}
                          className={`${type} pkmn__tab__section__table__badge`}
                        >
                          {type}
                        </Badge>
                      ))}
                  </td>
                  <td>
                    {weaknessCol4R1.length > 0 && (
                      <div>
                        <span className='pkmn__tab__section__table__subdiv'>
                          x 2
                        </span>
                        {weaknessCol4R1.map((type) => (
                          <Badge
                            key={type}
                            className={`${type} pkmn__tab__section__table__badge`}
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {weaknessCol4R2.length > 0 && (
                      <div>
                        <span className='pkmn__tab__section__table__subdiv'>
                          x 4
                        </span>
                        {weaknessCol4R2.map((type) => (
                          <Badge
                            key={type}
                            className={`${type} pkmn__tab__section__table__badge`}
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
          </section>
        </Tab>
        {!loading && dataevo.chain.evolves_to.length !== 0 && (
          <Tab
            eventKey='evolution'
            title='Evolution'
            className={`pkmn__tab ${data.types[0].type.name}`}
          >
            <section
              id='evolution'
              className='pkmn__tab__section pkmn__evolution'
            >
              <div className='pkmn__evolution__container'>
                <CardEvo
                  url={dataevo.chain.species.url.split("/")[6]}
                  name={dataevo.chain.species.name}
                  shiny={isShiny}
                />
                <div className='pkmn__evolution__container__treeEvo'>
                  {/* test with 265 = evolution-chain/135/ + 133 = evolution-chain/67*/}
                  {dataevo.chain.evolves_to.map((first, index) => {
                    return (
                      <div
                        key={index}
                        className='pkmn__evolution__container__treeEvo__column'
                      >
                        <div className='pkmn__evolution__container__treeEvo__column'>
                          <TriggerEvo
                            evo={
                              first.evolution_details[
                                first.evolution_details.length - 1
                              ]
                            }
                          />
                          <CardEvo
                            url={first.species.url.split("/")[6]}
                            name={first.species.name}
                            shiny={isShiny}
                          />
                        </div>
                        <div className='pkmn__evolution__container__treeEvo'>
                          {first.evolves_to.map((second, ind) => {
                            return (
                              <div
                                key={ind}
                                className='pkmn__evolution__container__treeEvo__column'
                              >
                                <TriggerEvo
                                  evo={
                                    second.evolution_details[
                                      second.evolution_details.length - 1
                                    ]
                                  }
                                />
                                <CardEvo
                                  url={second.species.url.split("/")[6]}
                                  name={second.species.name}
                                  shiny={isShiny}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </Tab>
        )}
        <Tab
          eventKey='gallery'
          title='Gallery'
          className={`pkmn__tab ${
            loading ? `normal` : `${data.types[0].type.name}`
          }`}
        >
          <section
            id='gallery'
            className={`pkmn__tab__section ${loading ? `pkmn__gallery` : null}`}
          >
            {loading ? (
              <Spinner className='pkmn__gallery__loading' />
            ) : (
              <CarouselGallery
                officialSprites={data.sprites.other["official-artwork"]}
                defaultSprites={data.sprites}
                homeSprites={data.sprites.other.home}
                dreamworldSprite={data.sprites.other.dream_world}
                name={data.name}
              />
            )}
          </section>
        </Tab>
      </Tabs>
    </div>
  );
}
// Export to call it up in app.jsx
export default Pokemon;
