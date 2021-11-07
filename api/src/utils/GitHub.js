const Constants = require("./Constants")

class GitHub {
    constructor() {
        this.sendIssueToGh = require('github-create-issue');

        this.user = Constants.GitHub.user;
        this.repo = Constants.GitHub.repo;
        this.opts = {
            token: Constants.GitHub.token,
        }
    }

    sendIssue(title, description) {
        this.sendIssueToGh(this.user + '/' + this.repo, title + ' -[ Requisito do cliente]- \n' + description, this.opts,
            (error, issue, info) => {
                if (info) {
                    console.error(info);
                }
                if (error) {
                    throw new Error(error.message);
                }
                console.log(issue);
            });
    }
    async report(req, res) {
        this.sendIssue(req.body.title, req.body.description);
        res.json("ok");
    }
}


module.exports = new GitHub();