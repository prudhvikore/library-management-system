import path from "path";

const BASE_PATH = path.join(__dirname, "src", "config");

// Update with your config settings.

const config = {
  development: {
    client: "pg",
    connection: "postgres://prudhviraj-kore:12345@localhost:5432/goodreads",
    migrations: {
      directory: path.join(BASE_PATH, "migrations"),
    },
    seeds: {
      directory: path.join(BASE_PATH, "seeds"),
    },
  },
};

export = config;
