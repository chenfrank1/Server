import { getClient } from './connect';

export let getPullRequestInfo = async () => {
  const client = await getClient();
  if (client == null)
    return [];

    try
    {
      const entries = await client.query('SELECT name, url, id, created, title FROM public.pull_requests_data;');
      return entries;
    }
    catch(e)
    {
      console.log(e)
      return [];
    }
    finally
    {
        await client.end();
    }
};