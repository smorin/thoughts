# Thoughts CLI

A standalone developer thoughts and notes management system for keeping project documentation separate from code.

## Overview

Thoughts CLI helps developers maintain project-specific notes, documentation, and thoughts in a centralized repository while keeping them separate from code repositories. This enables:

- **Clean Code Repositories**: Keep implementation notes and developer thoughts out of your production code
- **Centralized Knowledge**: All project thoughts in one searchable location
- **AI-Friendly**: Makes your notes easily accessible to AI assistants like Claude
- **Git Integration**: Automatic syncing through git hooks

## Installation

### Install globally via npm

```bash
npm install -g thoughts
```

### Install from source

```bash
git clone https://github.com/yourusername/thoughts.git
cd thoughts
npm install
npm run build
npm link
```

## Quick Start

```bash
# Initialize thoughts in your current repository
thoughts init

# Check the status of your thoughts setup
thoughts status

# Sync your thoughts manually
thoughts sync -m "Updated architecture notes"

# View your configuration
thoughts config

# Remove thoughts setup from a repository
thoughts uninit
```

## Commands

### `thoughts init`

Initialize thoughts tracking for the current git repository.

```bash
thoughts init [options]
```

**Options:**
- `--directory <name>` - Name for the thoughts directory (default: project name)
- `--thoughts-repo <path>` - Path to your central thoughts repository

**What it does:**
- Creates a `thoughts/` directory in your repository
- Sets up git hooks for automatic syncing
- Adds appropriate .gitignore entries
- Creates searchable hard links for AI assistants

### `thoughts sync`

Manually sync your thoughts to the central repository.

```bash
thoughts sync [options]
```

**Options:**
- `-m, --message <text>` - Commit message for the sync

**Note:** This is automatically triggered by git hooks on commit, but can be run manually when needed.

### `thoughts status`

Check the current status of your thoughts configuration.

```bash
thoughts status
```

**Shows:**
- Configuration status
- Repository mappings
- Git sync status
- Any pending changes

### `thoughts config`

View or edit your thoughts configuration.

```bash
thoughts config [options]
```

**Options:**
- `--json` - Output configuration in JSON format
- `--edit` - Open configuration file in editor

### `thoughts uninit`

Remove thoughts setup from the current repository.

```bash
thoughts uninit
```

**What it does:**
- Removes the `thoughts/` directory
- Removes git hooks
- Cleans up .gitignore entries
- Preserves your thoughts in the central repository

## How It Works

1. **Initialization**: When you run `thoughts init` in a git repository, it creates a local `thoughts/` directory and sets up git hooks.

2. **Separation**: Your thoughts stay in the `thoughts/` directory, which is gitignored in your code repository but tracked in a separate thoughts repository.

3. **Syncing**: Git hooks automatically sync your thoughts to a central repository whenever you commit code changes.

4. **Searchable Directory**: Hard links in `~/.thoughts-searchable/` make all your thoughts accessible to AI assistants and search tools.

## Configuration

Thoughts CLI stores its configuration in `~/.thoughts/config.json`. The configuration includes:

```json
{
  "thoughtsRepo": "/path/to/central/thoughts/repo",
  "repoMappings": {
    "/path/to/code/repo": "project-name"
  },
  "user": {
    "name": "Your Name",
    "email": "your.email@example.com"
  }
}
```

## Best Practices

1. **Regular Notes**: Keep implementation notes, architecture decisions, and debugging logs in thoughts
2. **Project Documentation**: Store project-specific documentation that doesn't belong in code
3. **AI Context**: Include context and background information to help AI assistants understand your project
4. **Commit Messages**: Use descriptive commit messages when syncing thoughts

## Examples

### Setting up thoughts for a new project

```bash
cd ~/projects/my-app
git init  # If not already a git repository
thoughts init --directory my-app-notes
echo "# Architecture Decisions" > thoughts/architecture.md
echo "# Implementation Notes" > thoughts/notes.md
thoughts sync -m "Initial thoughts setup"
```

### Adding thoughts before a code commit

```bash
echo "## 2024-01-15 - API Refactoring\nReasons for changes..." >> thoughts/notes.md
git add .
git commit -m "Refactor API endpoints"
# Thoughts are automatically synced via git hook
```

## Troubleshooting

### Thoughts not syncing automatically

Check that git hooks are properly installed:
```bash
ls -la .git/hooks/post-commit
thoughts status
```

### Cannot initialize thoughts

Ensure you're in a git repository:
```bash
git status
```

### Configuration issues

Reset configuration:
```bash
thoughts config --edit
```

## Development

```bash
# Install dependencies
npm install

# Build the CLI
npm run build

# Run tests
npm test

# Development mode with watch
npm run dev
```

### `thoughts`

Manage developer thoughts and notes separately from code repositories.

```bash
thoughts <subcommand>
```

**commands:**

- `init` - Initialize thoughts for the current repository
- `sync` - Manually sync thoughts and update searchable index
- `status` - Check the status of your thoughts setup
- `config` - View or edit thoughts configuration

**Examples:**

```bash
# Initialize thoughts for a new project
thoughts init

# Sync thoughts after making changes
thoughts sync -m "Updated architecture notes"

# Check status
thoughts status

# View configuration
thoughts config --json
```

The thoughts system keeps your notes separate from code while making them easily accessible to AI assistants. See the [Thoughts documentation](./THOUGHTS.md) for detailed information.


## Version History

- **v0.1.0** - Initial standalone release extracted from HumanLayer
  - Core thoughts functionality
  - Git integration
  - Searchable directory support

## License

Apache-2.0