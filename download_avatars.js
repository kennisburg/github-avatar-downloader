var request = require('request');

var fs = require('fs')

var GITHUB_TOKEN = require('./secret.js')

console.log("Welcome to the Github Avatar Downloader");

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body) {
    cb(err, body);
  });
}


var owner = process.argv.slice(2, 3)[0];
var repo = process.argv.slice(3, 4)[0]

console.log(owner, repo)

getRepoContributors(owner, repo, function(err, result) {
  console.log("Errors:", err);
  var result2 = JSON.parse(result)

  result2.forEach(function(account) {
    downloadImageByURL(account.avatar_url, './avatars/' + account.login + '.jpg')
  })
});
// does not download unless avatars folder is already made @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


function downloadImageByURL(url, filepath) {
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function(res) {
      console.log("success. status:", res.statusMessage);
    })
    .on('end', function() {
      console.log('end');
    })
    // 'success. status: statusMessage' && 'end' repeat after downloading images @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    .pipe(fs.createWriteStream(filepath));

};


// does not download unless avatars folder is already made @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


function downloadImageByURL(url, filepath) {
  request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function(res) {
      console.log("success. status:", res.statusMessage);
    })
    .on('end', function() {
      console.log('end');
    })
    .pipe(fs.createWriteStream(filepath));
};
