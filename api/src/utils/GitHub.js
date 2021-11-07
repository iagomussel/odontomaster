const Constants = require("./Constants")

const { Octokit } = require("@octokit/rest")
class GitHub {
    constructor() {
        console.log("called GitHub")
        this.user = Constants.GitHub.user;
        this.repo = Constants.GitHub.repo;
        this.opts = {
            token: Constants.GitHub.token,
        }

    }

    sendIssue(title, description) {
        console.log("called sendIssue")
        const octokit = new Octokit({
            auth: this.opts.token,
        })
        octokit.issues.create({
            owner: this.user,
            repo: this.repo,
            title: title,
            body: description,
        })
    }

    getAllIssues() {
        console.log("called getAllIssues")
        const octokit = new Octokit({
            auth: this.opts.token,
        })
        return octokit.issues.listForRepo({
            owner: this.user,
            repo: this.repo,
        })
    }



}

module.exports = new GitHub();