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

var avatars = [];

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  var result2 = JSON.parse(result)
  for (var i of result2) {
    avatars.push(i.avatar_url);
    console.log(i.avatar_url)
  };

  avatars.forEach(function(avatarURL, filepath) {
    downloadImageByURL(avatarURL, './avatars/' + filepath + '.jpg')
  })
});



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


