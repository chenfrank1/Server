import { getClient } from './connect';
import { PullRequestDetails } from '../pull_request_data/data'

export let saveToDB = async(data:PullRequestDetails) => {
  const client = await getClient();
  if (client == null)
    return false;

  try
  {
    await client.query(`INSERT INTO public.pull_requests_data(name, url, id, created, title) VALUES ('${data.name}', '${data.url}', '${data.id}', '${data.created}', '${data.title}');`);
    return 'SUCCESS'
  }
  catch(e)
  {
    console.log(e)
    return true;
  }
  finally{
    await client.end();
  }
};
