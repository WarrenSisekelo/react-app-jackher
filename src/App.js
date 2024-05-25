import React from 'react';
import './App.css';
import PropTypes from "prop-types"
import styled from '@emotion/styled/macro';

const PokemonRow = ({ pokemon, onSelect }) => {
  return (
    <tr>
      <td>{pokemon.name.english}</td>
      <td>{pokemon.type.join(" : ")}</td>
      <td>
        <button
          onClick={() => onSelect(pokemon)}
        >Select!</button>
      </td>
    </tr>
  )
}

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string,
    }),
    type: PropTypes.arrayOf(PropTypes.string),
  }),
  onSelect: PropTypes.func,
};

const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      {Object.keys(base).map((key) => (
        <tr key={key}>
          <td>{key}</td>
          <td>{base[key]}</td>
        </tr>
      ))}
    </table>
  </div>
)

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
}

//emotion/styled components
const Title = styled.h1`
  text-align: center;
`;
const TwoColumnLayout = styled.div`
  display: grid,
  grid-template-columns: 70% 30%,
  grid-column-gap: 1rem,
`;
const Container = styled.div`
  margin: auto,
  width: 800px,
  paddingTop: 1rem,
`;
const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.2rem;
`;

const TableHead = styled.th`
  text-align: left;
  font-size: x-large;
  font-weight: 500;
`;

function App() {
  const [filter, filterSet] = React.useState("");
  const [pokemon, pokemonSet] = React.useState();
  const [selectedItem, selectedItemSet] = React.useState(null);

  React.useEffect(() => {
    fetch("http://localhost:3000/react-app-jackher/pokemon.json")
      .then((respnse) => respnse.json())
      .then((data) => pokemonSet(data));
  }, [])
  /*
    when you don't have a unique id use this instead:
    <tr key={[pokemon.id, pokemon.name.english].join(':')}>
  */
  return (
    <Container>
      <Title>Pokemon Search</Title>

      <TwoColumnLayout>
        <div>
          {/* input */}
          <Input
            value={filter}
            onChange={(evt) => filterSet(evt.target.value)}
          />

          {/* table */}
          <table width={"100%"}>
            <thead>
              <tr>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
              </tr>
            </thead>
            <tbody>
              {
                pokemon?.filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase())).slice(0, 20).map((pokemon) => (
                  <PokemonRow pokemon={pokemon} key={pokemon.id} onSelect={(pokemon) => selectedItemSet(pokemon)} />
                ))
              }
            </tbody>
          </table>
        </div>

        {selectedItem && (
          <PokemonInfo {...selectedItem} />
        )}
      </TwoColumnLayout>

    </Container>
  );
}

export default App;
