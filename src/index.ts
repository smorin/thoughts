#!/usr/bin/env node

import { Command } from 'commander'
import { thoughtsCommand } from './commands/thoughts.js'
import chalk from 'chalk'

// Version is injected at build time by tsup
const VERSION = process.env.PACKAGE_VERSION || '0.1.0'

const program = new Command()

program
  .name('thoughts')
  .description('Developer thoughts and notes management system')
  .version(VERSION)

// Add thoughts command
thoughtsCommand(program)

// Parse command line arguments
program.parse(process.argv)

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp()
}