import { prisma } from "../server/db";
import type { GetServerSideProps } from "next";
import Image from "next/image";
import React, { type FC } from "react";
import type { AsyncReturnType } from "src/types/ts-bs";

const getPokemonInOrder = async () => {
  return await prisma.pokemon.findMany({
    orderBy: {
      VoteFor: {
        _count: "desc",
      },
    },
    select: {
      id: true,
      name: true,
      spriteUrl: true,
      _count: {
        select: {
          VoteFor: true,
          VoteAgainst: true,
        },
      },
    },
  });
};

type PokemonQueryResult = AsyncReturnType<typeof getPokemonInOrder>;

type ResultProps = {
  pokemon: PokemonQueryResult;
};

type PokemonListingProps = {
  pokemon: PokemonQueryResult[number];
};

const generateCountPercent = (pokemon: PokemonQueryResult[number]) => {
  const { VoteAgainst, VoteFor } = pokemon._count;
  if (VoteFor + VoteAgainst === 0) {
    return 0;
  }
  return (VoteFor / (VoteFor + VoteAgainst)) * 100;
};

const PokemonListing: FC<PokemonListingProps> = ({ pokemon }) => {
  return (
    <div className="flex  items-center justify-between border-b p-2">
      <div className="flex items-center ">
        <Image src={pokemon.spriteUrl} width={64} height={64} alt="" />

        <div className="capitalize">{pokemon.name}</div>
      </div>

      <div className="pr-4">
        {generateCountPercent(pokemon).toFixed(2) + "%"}
      </div>
    </div>
  );
};

const Results: FC<ResultProps> = ({ pokemon }) => {
  return (
    <div className="flex flex-col items-center px-5">
      <h2 className="p-4 text-2xl">Results</h2>

      <div className="p-2" />

      <div className="flex w-full max-w-2xl flex-col border">
        {pokemon
          ?.sort((a, b) => generateCountPercent(b) - generateCountPercent(a))
          .map((single_pokemon, single_pokemon_index) => {
            return (
              <PokemonListing
                key={single_pokemon_index}
                pokemon={single_pokemon}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Results;

export const getStaticProps: GetServerSideProps = async () => {
  const pokemonOrdered = await getPokemonInOrder();

  return {
    props: {
      pokemon: pokemonOrdered,
    },
    revalidate: 60,
  };
};
