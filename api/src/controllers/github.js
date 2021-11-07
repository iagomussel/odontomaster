const github = require('../utils/GitHub');

const GitHubController = {
    async report(req, res) {
        github.sendIssue(req.body.title, req.body.description);
        res.json("ok");
    }
};

module.exports = GitHubController;