# Changelog

[![Build Status](https://travis-ci.com/ibrahimbutt/changelog.svg?branch=master)](https://travis-ci.com/ibrahimbutt/changelog) [![Maintainability](https://api.codeclimate.com/v1/badges/2a51ff08766a58fabcdd/maintainability)](https://codeclimate.com/github/ibrahimbutt/changelog/maintainability) <a href="https://codeclimate.com/github/ibrahimbutt/changelog/test_coverage"><img src="https://api.codeclimate.com/v1/badges/2a51ff08766a58fabcdd/test_coverage" /></a>

Create or update your `CHANGELOG.md` with a single command. For this to work, your commits must be following the [Conventional Commits](www.conventionalcommits.org) format.

## Usage

Inside your project, run `yarn changelog` or `npm run changelog`.

## Example

Take this pretty printed `git log`:

```shell
chore(release): release 1.1.0 (tag: v1.1.0) Fri, 21 Jun 2019 18:57:10 +0100
feat: user can change username Fri, 21 Jun 2019 18:57:10 +0100
fix(auth): login now persists on page change/refresh Fri, 21 Jun 2019 18:57:10 +0100
chore(release): release 1.0.0 (tag: v1.1.0) Fri, 20 Jun 2019 18:57:10 +0100
feat: user can log in/out Fri, 20 Jun 2019 18:57:10 +0100
feat: user can make an account Fri, 20 Jun 2019 18:57:10 +0100
```

A `CHANGELOG.md` with this commit history will be formatted as:

```md
## v1.1.0 – 21 Jun 2019

### Added

- user can change username

### Fixed

- **auth**: login now persists on page change/refresh

## v1.0.0 – 20 Jun 2019

### Added

- user can log in/out
- user can make an account
```

Only commits of the type `feat` and `fix` are included. A future version will include more types from those included in the Conventional Commits specification.

Commits with a scope will be formatted with the scope staying in place, in bold, with the type removed. The type is implied by the section header.

All other commits will not be included as they're not relavant to a changelog.
