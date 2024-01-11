# create-t3-app-study

## Getting Started

To scaffold an app using `create-t3-app`, run any of the following four commands and answer the command prompt questions:

### npm

```bash
npm create t3-app@latest
```

### yarn

```bash
yarn create t3-app
```

### pnpm

```bash
pnpm create t3-app@latest
```

### bun

```bash
bun create t3-app@latest
```

For this project, I used npm.

Then, it will automatically let you choose the configuration:

- What will your project be called?
  - t3todolist

- Will you be using TypeScript or JavaScript?
  - TypeScript

- Will you be using Tailwind CSS for styling?
  - Yes

- Would you like to use tRPC?
  - Yes

- What authentication provider would you like to use?
  - None

- What database ORM would you like to use?
  - Drizzle

Since the project includes Drizzle ([Drizzle Documentation](https://create.t3.gg/en/usage/first-steps)), check the `.env` file for instructions on how to construct your `DATABASE_URL` env variable. Once your env file is ready, run `pnpm db:push` (or the equivalent for other package managers) to push your schema.

Configure Drizzle and Postgresql (Supabase) ([Drizzle Postgresql Setup](https://orm.drizzle.team/docs/get-started-postgresql))

Modify `drizzle.config.ts`

```tsx
export default {
  schema: "./src/server/db/schema.ts",
  out: "./src/server/db/drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  tablesFilter: ["*"],
  verbose: true,
  strict: true,
};
```

Modify `package.json`

```json
"db:push": "drizzle-kit push:pg",
"db:generate": "drizzle-kit generate:pg",
"db:pull": "drizzle-kit introspect:pg",
"db:studio": "drizzle-kit studio",
```

Run `npm run db:pull`.

(For this moment, issue from t3 repo: at .env, should change the query params at the end of the URL to “sslaccept=strict”).

This lets you pull DDL from an existing database and generate `schema.ts` file in a matter of seconds.

```bash
npm i postgres
```

Modify `db`

```tsx
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from "~/env";
import { eq } from "drizzle-orm";

type NewTodo = typeof todo.$inferInsert;

const client = postgres(env.DATABASE_URL,{
  ssl: {
    rejectUnauthorized: false,
  },
});
const db = drizzle(client);
```

Add CRUD tRPC

```tsx
todo: publicProcedure.query(async () => {
    const allTodos = await db.select().from(todo);
    return {
      todos: allTodos,
    };
  }),

  updateTodo: publicProcedure
    .input(z.object({ id: z.number(), status: z.boolean() }))
    .mutation(async ({ input }) => {
      const { id, status } = input;
      const updateTodo = await db.update(todo)
        .set({status: status})
        .where(eq(todo.id, id));
      return updateTodo;
  }),

  insertTodo: publicProcedure
  .input(z.object({ id: z.number(), description: z.string() }))
  .mutation(async ({ input }) => {
    const { id, description} = input;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const newtodo: NewTodo = {id: id, description: description, dueTime: tomorrow.toISOString()};
    const insertTodo = await db.insert(todo).values(newtodo).onConflictDoNothing();
    return insertTodo;
  }),
```

```json
"build": "next build",
```

Reference:

- [T3 OSS GitHub](https://github.com/t3-oss/create-t3-app)
- [Create T3 App Documentation](https://create.t3.gg/en/usage/first-steps)
- [Drizzle ORM Kit Documentation](https://orm.drizzle.team/kit-docs/overview)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)