// import libraries
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Badge,
  Row,
  Spinner,
  Placeholder,
  Pagination,
} from "react-bootstrap";
// import assets
import pokeball from "../assets/images/pokeball.png";
// import css
import "../assets/styles/gallery.scss";
import "../assets/styles/types.scss";
import "../assets/styles/pagination.scss";

// Gallery function
function Gallery() {
  // pokémon data
  const [data, setData] = useState([]);
  // display limit
  const [offset, setOffset] = useState(0);
  // total pokemon
  const totalPkmn = Math.ceil(1025 / 20);
  // to change button on loading datas
  const [loading, setLoading] = useState(false);
  const fakeCards = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  // fetch datas of 25 next pokémons on click
  useEffect(() => {
    const fetchData = async () => {
      try {
        // loading state start
        setLoading(true);
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${
            offset + 1 === totalPkmn ? 5 : 20
          }&offset=${offset * 20}`
        );
        const json = await res.json();
        const listPkmn = [];
        // fetch sprite, id, name and types of pokemon and push in array
        for (const pkmn of json.results) {
          const resp = await fetch(pkmn.url);
          const detailsPkmn = await resp.json();
          const offSprite =
            detailsPkmn.sprites.other["official-artwork"].front_default;
          const pkmnNb = detailsPkmn.id.toString().padStart(4, "0");
          const pkmnTypes = [];
          for (let i = 0; i < detailsPkmn.types.length; i++) {
            pkmnTypes.push(detailsPkmn.types[i].type.name);
          }
          const pkmnTemp = {
            sprite: `${offSprite}`,
            id: `${detailsPkmn.id}`,
            number: `${pkmnNb}`,
            name: `${detailsPkmn.species.name}`,
          };
          pkmnTemp.types = pkmnTypes;
          listPkmn.push(pkmnTemp);
        }
        // loading state end
        setLoading(false);
        // add 25 pokémons created to data
        setData([...listPkmn]);
        // setTotalOffset(json.count);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [offset, totalPkmn]);

  const renderPaginationItems = () => {
    const items = [];
    const maxItems = 5; // Max number of pagination items to display
    const halfItems = Math.floor(maxItems / 2);

    let start = offset - halfItems;
    let end = offset + halfItems;

    if (start < 0) {
      start = 0;
      end = Math.min(maxItems - 1, totalPkmn - 1);
    }

    if (end >= totalPkmn) {
      end = totalPkmn - 1;
      start = Math.max(0, end - maxItems + 1);
    }

    for (let i = start; i <= end; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === offset}
          onClick={() => setOffset(i)}
          className={`pagination__item ${
            i === offset ? "pagination__item--active" : ""
          }`}
        >
          {i + 1}
        </Pagination.Item>
      );
    }

    if (start > 0) {
      items.unshift(
        <Pagination.Ellipsis
          key='start-ellipsis'
          className='pagination__item'
        />
      );
      items.unshift(
        <Pagination.Item
          key={0}
          onClick={() => setOffset(0)}
          className='pagination__item'
        >
          1
        </Pagination.Item>
      );
    }

    if (end < totalPkmn - 1) {
      items.push(
        <Pagination.Ellipsis key='end-ellipsis' className='pagination__item' />
      );
      items.push(
        <Pagination.Item
          key={totalPkmn - 1}
          onClick={() => setOffset(totalPkmn - 1)}
          className='pagination__item'
        >
          {totalPkmn}
        </Pagination.Item>
      );
    }

    return items;
  };

  const handlePrevPage = () => {
    setOffset(Math.max(0, offset - 1));
  };

  const handleNextPage = () => {
    setOffset(Math.min(totalPkmn - 1, offset + 1));
  };

  const handleFirstPage = () => {
    setOffset(Math.max(0, offset - 5));
  };

  const handleLastPage = () => {
    setOffset(Math.min(totalPkmn - 1, offset + 5));
  };

  return (
    <div className='gallery'>
      {/* display pokémon image, numbers, name and types in a list */}
      <Row
        xs={{ cols: 2 }}
        sm={{ cols: 2 }}
        md={{ cols: 3 }}
        lg={{ cols: 4 }}
        xl={{ cols: 5 }}
        xxl={{ cols: 5 }}
        className='gallery__group'
      >
        {loading ? (
          <React.Fragment>
            {fakeCards.map((element, index) => {
              return (
                <Card
                  key={index}
                  border='dark'
                  className='gallery__card normal-light'
                >
                  <div className='gallery__card__images'>
                    <Card.Img
                      src={pokeball}
                      alt='Pokéball transparent'
                      className='gallery__card__images__pokeball'
                    />
                    <Spinner className='gallery__card__images__loading' />
                  </div>
                  <Card.Body className='gallery__card__body'>
                    <Card.Text className='gallery__card__body__id'>
                      #<Placeholder md={4} />
                    </Card.Text>
                    <Card.Title className='gallery__card__body__name'>
                      <Placeholder
                        md={10}
                        size='lg'
                        className='gallery__card__body__name__loading'
                      />
                    </Card.Title>
                    <div className='gallery__card__body__types'>
                      <Badge className='card__body__types__badge normal' bg=''>
                        <Placeholder md={6} />
                      </Badge>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {data &&
              data.map((pkmn) => {
                return (
                  <Link
                    key={pkmn.id}
                    to={`/${pkmn.id}`}
                    className='gallery__group__button'
                  >
                    {/* card of pokemon */}
                    <Card
                      border='dark'
                      className={`gallery__card ${pkmn.types[0]}-light`}
                    >
                      <div className='gallery__card__images'>
                        <Card.Img
                          src={pokeball}
                          alt='Pokéball transparent'
                          className='gallery__card__images__pokeball'
                        />
                        <Card.Img
                          variant='top'
                          src={pkmn.sprite}
                          alt={pkmn.name}
                        />
                      </div>
                      <Card.Body className='gallery__card__body'>
                        <Card.Text className='gallery__card__body__id'>
                          #{pkmn.number}
                        </Card.Text>
                        <Card.Title className='gallery__card__body__name'>
                          {`${pkmn.name}`.charAt(0).toUpperCase()}
                          {`${pkmn.name}`.slice(1)}
                        </Card.Title>
                        <div className='gallery__card__body__types'>
                          {pkmn.types.map((type, index) => (
                            <Badge
                              key={index}
                              className={`card__body__types__badge ${type}`}
                              bg=''
                            >
                              {`${type}`.toUpperCase()}
                            </Badge>
                          ))}
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                );
              })}{" "}
          </React.Fragment>
        )}
      </Row>
      <Pagination className='pagination__container'>
        <Pagination.First
          onClick={handleFirstPage}
          className='pagination__item'
        />
        <Pagination.Prev
          onClick={handlePrevPage}
          className='pagination__item'
        />
        {renderPaginationItems()}
        <Pagination.Next
          onClick={handleNextPage}
          className='pagination__item'
        />
        <Pagination.Last
          onClick={handleLastPage}
          className='pagination__item'
        />
      </Pagination>
    </div>
  );
}
// Export to call it up in index.jsx
export default Gallery;
