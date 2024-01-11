import { pgTable, pgEnum, varchar, timestamp, text, integer, uniqueIndex, serial, boolean} from "drizzle-orm/pg-core"

export const keyStatus = pgEnum("key_status", ['expired', 'invalid', 'valid', 'default'])
export const keyType = pgEnum("key_type", ['stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf'])
export const factorType = pgEnum("factor_type", ['webauthn', 'totp'])
export const factorStatus = pgEnum("factor_status", ['verified', 'unverified'])
export const aalLevel = pgEnum("aal_level", ['aal3', 'aal2', 'aal1'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['plain', 's256'])


export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar("id", { length: 36 }).primaryKey().notNull(),
	checksum: varchar("checksum", { length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text("logs"),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const pokemon = pgTable("Pokemon", {
	id: serial("id").primaryKey().notNull(),
	ball: text("ball").notNull(),
	name: text("name"),
},
(table) => {
	return {
		ballKey: uniqueIndex("Pokemon_ball_key").on(table.ball),
	}
});

export const post = pgTable("Post", {
	id: serial("id").primaryKey().notNull(),
	title: text("title").notNull(),
	content: text("content"),
	published: boolean("published").default(false).notNull(),
	authorId: integer("authorId").references(() => pokemon.id, { onDelete: "set null", onUpdate: "cascade" } ),
});

export const todo = pgTable("Todo", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: integer("id").primaryKey().notNull(),
	description: varchar("description"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	dueTime: timestamp("due_time", { withTimezone: true, mode: 'string' }),
	status: boolean("status").default(false),
});