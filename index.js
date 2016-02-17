"use strict";
var urllib = require("url")
var ss = require("simple-strings.js")

/**
 * urls can be of type
 * `https://github.com/user/repo` or `git@github.com:user/repo.git`
 * @param {String} url
 * @returns {{user:String, repo:String}}
 * */
module.exports = function (url) {
  var parsehttps = function () {
    var parsed = urllib.parse(url)
    var splittedPath = parsed.path.split("/")
    return {user: splittedPath[1], repo: splittedPath[2]}
  }
  var parsegithub = function (urlpart) {
    var superfluousEnding = ".git"
    var trimmed = urlpart.slice(0, -superfluousEnding.length)
    var splittedPath = trimmed.split("/")
    return {user: splittedPath[0], repo: splittedPath[1]}
  }

  var needle = "git@github.com:"
  if (ss.startsWith(url, needle)) {
    return parsegithub(url.slice(needle.length))
  } else {
    return parsehttps()
  }
}
