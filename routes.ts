import express, { Router, Request, Response } from "express";
const router: Router = express.Router();
const bp = require('body-parser')
import {takeScreenshot} from './screenshots/screenshot'

import { PullRequestDetails } from './pull_request_data/data'
import { saveToDB } from './database/save_data'
import { getPullRequestInfo } from './database/get_data'

router.use(bp.json())
router.use(bp.urlencoded({ extended: true }))



// Define the home page route.
router.get('/getpullrequestdata', async function(req: Request, res: Response) {

    const result = await getPullRequestInfo()
    res.send(result.rows);
    
  });

  // Save data set from github webhook to AWS postgres.
  router.post("/getupdates", async function(req, res) {
   
    const pullrequest = req.body;

    if(!pullrequest.hasOwnProperty('action'))
    {
      res.send({ status: 'SUCCESS' });
      return;
    }

    // I'm only saving data of pull requests opened state.
    if (pullrequest.action != 'opened')
    {
      res.send({ status: 'SUCCESS' });
      return;
    }
    
    try
    {
      // Create object with the data to save.
      const pr_data = new PullRequestDetails(pullrequest)

      // Save to DB.
      const status = await saveToDB(pr_data);
      if (status)
      {
        takeScreenshot('https://github.com/chenfrank1/demo/pulls')
        res.send({ status: 'SUCCESS' });
      }
      else
        res.status(500).send({ status: 'FAILURE' });

    }
    catch(e)
    {
      res.status(500).send({ status: 'Internal Server Error' });
      return;
    }
    });
  
  module.exports = router;  