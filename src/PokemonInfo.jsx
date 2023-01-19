import { Pokedex } from "pokeapi-js-wrapper";
import { useEffect, useState } from "react";

export default  function PokemonInfo(props){
  const { pokemonName, goHome, goBack } = props;
  const [hasError, setErrors] = useState(false);
  const [pokemon, setPokemon] = useState(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await (new Pokedex()).getPokemonByName(pokemonName)
        setPokemon(response);
      }
      catch (error) {
        setErrors(error)
      }
    }
    fetchData();
  }, [pokemonName]);

  if (hasError) {
    return <div>ope</div>
  }

  if (pokemon === null) {
    return null
  }

  // TODO - update this to retun the name, sprite, abilites, types, stats
  return (
    <div>
        <button onClick = {goHome}>Home</button>
        <button onClick = {goBack}>Back</button>
        <div>
            <span>{pokemon.name}</span>
            <img src = {pokemon.sprites.front_default} alt ={pokemon.name}/>
            <div>{pokemon.abilities.map((ability, i) => <div key={i}>{ability.ability.name}</div>)}</div>
            <div>{pokemon.stats.map((stat, i) => <div key={i}>{stat.stat.name}: {stat.base_stat}</div>)}</div>
            <div>{pokemon.types.map((type, i) => <div key={i}>{type.type.name}</div>)}</div>
      </div>
    </div>
  )
}

