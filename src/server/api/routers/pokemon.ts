import { number, object } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { vote_schema } from "src/schemas";
import { PokemonClient } from "pokenode-ts";

export const pokemonRoutes = createTRPCRouter({
  getPokemonById: publicProcedure
    .input(object({ id: number() }))
    .query(async ({ input, ctx }) => {
      const { prisma } = ctx;
      const { id } = input;
      const pokemon = await prisma?.pokemon.findFirst({
        where: { id: id },
      });

      // if (!pokemon) throw new Error("lol doe's exits");

      return pokemon;
    }),

  voteForPokemon: publicProcedure
    .input(vote_schema)
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { voted_for, voted_against } = input;

      return await prisma.vote.create({
        data: {
          votedForId: voted_for,
          votedAgainstId: voted_against,
        },
      });
    }),
});
