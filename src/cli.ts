#!/usr/bin/env node

import FileSystem from "./fileSystem";
import Changelog from "./changelog";
import ChangelogFormatter from "./formatters/changelogFormatter";
import CommitLog from "./commitLog";
import Commit from "./commit";

const commitLog: CommitLog = new CommitLog();
const commits: Array<Commit> = commitLog.getCommits();

const formatter: any = ChangelogFormatter;
const changelog: Changelog = new Changelog(commits, formatter);
const content: string = changelog.content();

FileSystem.create("CHANGELOG.md", content);
