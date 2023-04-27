# Learning Platform

## 🏃‍♂️ how to Run project

1. specify environment variables in .env.local from root folder using .env.example as example
2. from root run `pnpm i`
3. execute query from supabase/migration.sql in your supabase sql editor
4. from root run `pnpm run seed`
5. if you want to enable rls execute query from supabase/enable-rls.sql
6. Expose the next_auth schema via the Supabase Serverless API in the API settings by adding next_auth to the "Exposed schemas" list.
7. from root run `npx supabase gen types typescript --project-id "YOU_SUPABASE_PROJECT_ID" > src/lib/database.types.ts`
8. from root run `pnpm husky install && npx husky add .husky/pre-commit "pnpm lint-staged"`
9. run `pnpm run preview`
10. go to `http://localhost:3000`

## 🏃‍♂️ how to Run storybook

1. from root run `yarn`
2. run `yarn run storybook`

or visit https://learning-platfrom-storybook.netlify.app/
