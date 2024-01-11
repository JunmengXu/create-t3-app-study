import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  out: "./src/server/db/drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  // tablesFilter: ["t3todolist_*"],
  // tablesFilter: ["*"],
  verbose: true,
  strict: true,
} satisfies Config;
