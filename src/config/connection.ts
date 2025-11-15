import knexConfig from "../../knexfile";
import Knex from "knex";

const configs = knexConfig["development"];
const knex = Knex(configs);

export default knex;
