import { pgTable, serial, varchar, date, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  firstname: varchar('firstname', { length: 255 }).notNull(),
  lastname: varchar('lastname', { length: 255 }).notNull(),
  birthdate: date('birthdate').notNull(),
});

export const addresses = pgTable('addresses', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  street: varchar('street', { length: 255 }),
  city: varchar('city', { length: 255 }),
  province: varchar('province', { length: 255 }),
  postalCode: varchar('postal_code', { length: 10 }),
});
