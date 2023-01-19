import { Pokedex } from "pokeapi-js-wrapper";
import { useEffect, useState } from "react";
export default  function SelectPokemon(props){
  const { onSelection,pokedex } = props;
  const [hasError, setErrors] = useState(false);
  const [pokemon, setPokemon] = useState([]);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await new Pokedex().getPokedexByName(pokedex);
        setPokemon(response.pokemon_entries)
      }
      catch (error) {
        setErrors(error)
      }
    }
    fetchData();
  }, [pokedex]);

  if (hasError) {
    return <div>ope</div>
  }

  return (
    <ul>
      {pokemon.map(function (pokemon, index) {
        return (<li key={index}>
          <span>{pokemon.pokemon_species.name}</span>
          <button onClick={() => onSelection(pokemon.pokemon_species.name)}>View</button>
        </li>)
      })}
    </ul>
  );
}
