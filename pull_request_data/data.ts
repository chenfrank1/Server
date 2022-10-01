export class PullRequestDetails {

  name: string;
  url: string;
  id: string;
  created: string;
  title: string;

  constructor(data:any) {
    this.name = data.pull_request.user.login;
    this.url = data.pull_request.url;
    this.id = data.pull_request.id;
    this.created = data.pull_request.created_at
    this.title = data.pull_request.title
  }
}