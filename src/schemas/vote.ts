import { number, object } from "zod";

const vote_schema = object({
  voted_for: number(),
  voted_against: number(),
});

export default vote_schema;
