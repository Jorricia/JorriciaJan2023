import { useState } from "react";
import SelectPokedex from "./SelectPokedex";
import SelectPokemon from "./SelectPokemon";
//import PokemonDetail from "./PokemonInfo";
import './App.css';
import PokemonInfo from "./PokemonInfo";
export default function App() {
  const [pokedexName, setPokedexName] = useState(null);
  const [pokemonName, setPokemonName] = useState(null);

  function goHome() {
    setPokemonName(null);
    setPokedexName(null);
  }
  if (pokedexName === null) {
    return <SelectPokedex onSelection={(name) => setPokedexName(name)} />
  }

   if (pokemonName === null) {
     return <SelectPokemon onSelection={(name) => setPokemonName(name)}  pokedex={pokedexName} />
   }

  return (
    <PokemonInfo pokemonName = {pokemonName} goHome = {goHome} goBack ={()=>{
      setPokemonName(null);
    }} />
  )
}
