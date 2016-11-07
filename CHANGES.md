# Change log
Notable changes to this project will be documented here.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

### [Unreleased]
#### Added:
- Basic functionality
- Promise-based errors when Sander's errors aren't used


### v0.0.1
#### Added:
- `generateId()` function
- initial npm publish

### v0.1.0
#### Changes
- all responses returned in JSON format

### v0.2.0
#### Added:
- `try/catch` block for `JSON.parse`

### v0.2.1
#### Fixed:
- `generateId` returns NaN when files other than .json are present (`.DS_store`).
