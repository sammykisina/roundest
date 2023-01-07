import { number, object, string } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

import { PokemonClient } from "pokenode-ts";

export const pokemonRoutes = createTRPCRouter({
  getPokemonById: publicProcedure
    .input(object({ id: number() }))
    .query(({ input }) => {
      const { id } = input;

      const api = new PokemonClient();
      const pokemon = api.getPokemonById(id);

      return pokemon;
    }),
});
