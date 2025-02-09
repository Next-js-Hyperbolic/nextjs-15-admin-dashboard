# JSM Admin Dashboard University Bookstore

### [JSM Video](https://www.youtube.com/watch?v=EZajJGOMWas&t=326s)

### [JSM Repo](https://github.com/adrianhajdin/university-library-jsm/blob/main/package.json)

### Dependencies

1. ImageKit
2. Neon / Postgres
3. Drizzle
4. Vercel
5. Zod (validation)
6. UseFormHook (react form)
7. AuthJS

### Important Commands:

#### Drizzle

---

> `npx drizzle-kit generate`

> `npm run db:generate` (Custom package.json script command)

This command will generate the SQL files converted from your JS/TS schema & config. This needs to be run every time a schema update is made, along with the following drizzle-kit migrate command.

---

> `npx drizzle-kit migrate`

> `npm run db:migrate` (Custom package.json script command)

This command will run the migrations. (NOTE\*\* If something goes wrong - it's likely a schema issue). This will apply all changes to the table.
