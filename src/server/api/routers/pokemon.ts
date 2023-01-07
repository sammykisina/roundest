import { number, object, string } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

import { PokemonClient } from "pokenode-ts";
import { vote_schema } from "src/schemas";

export const pokemonRoutes = createTRPCRouter({
  getPokemonById: publicProcedure
    .input(object({ id: number() }))
    .query(async ({ input }) => {
      const { id } = input;
      const pokemon = await prisma?.pokemon.findFirst({
        where: { id: input.id },
      });

      if (!pokemon) throw new Error("lol doe's exits");

      return pokemon;
    }),

  voteForPokemon: publicProcedure
    .input(vote_schema)
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { voted_for, voted_against } = input;

      return await prisma.vote.create({
        data: {
          voted_against: voted_against,
          voted_for: voted_for,
        },
      });
    }),
});
