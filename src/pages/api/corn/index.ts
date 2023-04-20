import fetch from 'helpers/api/fetch';

export const config = {
  runtime: 'edge',
};

export default async function () {
  fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate-db-cache`);
}
