"use strict";
var _ = require("lodash")
var expect = require("must")
var pgu = require("../")

describe("parse-github-url", function () {
  var urls = {
    "https://github.com/some-user/some-repo": {
      user: "some-user", repo: "some-repo"
    },
    "git@github.com:some-user/some-repo.git": {
      user: "some-user", repo: "some-repo"
    }
  }
  _.map(urls, function (ideal, url) {
    it("should parse " + url, function () {
      expect(pgu(url)).to.eql(ideal)
    })
  })

})
