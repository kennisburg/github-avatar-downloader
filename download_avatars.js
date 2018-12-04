var request = require('request');

var GITHUB_TOKEN = require('./secret.js')

console.log("Welcome to the Github Avatar Downloader");

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'GITHUB_TOKEN': GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

function downloadImageByURL(url, filepath) {
  request(url)
  .pipe(fs.createWriteStream(filepath))
}

var avatars = {};

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  var result2 = JSON.parse(result)
  for (var i in result2) {
    avatars[i] = result2[i];
  };
});

console.log(avatars)