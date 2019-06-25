#!/usr/bin/env node

import FileSystem from "./fileSystem";
import Changelog from "./changelog";
import ChangelogFormatter from "./formatters/changelogFormatter";
import CommitLog from "./commitLog";

const commitLog = new CommitLog();
const commits = commitLog.getCommits();

const formatter = ChangelogFormatter;
const changelog = new Changelog(commits, formatter);
const content = changelog.content();

FileSystem.create("CHANGELOG.md", content);
