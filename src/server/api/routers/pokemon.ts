import { number, object, string } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

import { PokemonClient } from "pokenode-ts";

export const pokemonRoutes = createTRPCRouter({
  getPokemonById: publicProcedure
    .input(object({ id: number() }))
    .query(async ({ input }) => {
      const { id } = input;

      const api = new PokemonClient();
      const pokemon = await api.getPokemonById(id);

      return { name: pokemon?.name, sprites: pokemon.sprites };
    }),
});
