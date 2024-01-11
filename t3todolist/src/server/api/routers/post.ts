import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { pokemon, todo } from "~/server/db/schema";

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from "~/env";
import { eq } from "drizzle-orm";

type NewTodo = typeof todo.$inferInsert;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const client = postgres(env.DATABASE_URL,{
  // ...
  ssl: {
    rejectUnauthorized: false,
  },
});
const db = drizzle(client);

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // create: publicProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     await ctx.db.insert(posts).values({
  //       name: input.name,
  //     });
  //   }),

  // getLatest: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.query.posts.findFirst({
  //     orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  //   });
  // }),

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
      // Assuming db is an instance of your Prisma client
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

});
