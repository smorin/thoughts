# Thoughts CLI Makefile

.PHONY: help install dev build lint format format-check test test-watch check check-quiet clean

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	npm install

dev: ## Build and run the CLI
	npm run dev

build: ## Build the TypeScript
	npm run build

lint: ## Run ESLint
	npm run lint

format: ## Format code with Prettier
	npm run format

format-check: ## Check code formatting
	npm run format:check

test-watch: ## Run tests in watch mode
	npm run test:watch

check-quiet: ## Run all quality checks with quiet output
	@echo "Running format check..."
	@npm run format:check
	@echo "Running lint..."
	@npm run lint
	@echo "Running tests..."
	@npm run test
	@echo "Building..."
	@npm run build

test-quiet: ## Run tests with quiet output
	@echo "Running tests..."
	@npm run test

check: ## Run all quality checks (format + lint + test + build)
	@if [ -n "$$VERBOSE" ]; then \
		npm run check; \
	else \
		$(MAKE) check-quiet; \
	fi

test: ## Run tests
	@if [ -n "$$VERBOSE" ]; then \
		npm run test; \
	else \
		$(MAKE) test-quiet; \
	fi

clean: ## Clean build artifacts
	npm run clean

.DEFAULT_GOAL := help
