# Ratchet Sample Task Repository

This repository contains sample JavaScript tasks demonstrating various Ratchet capabilities and patterns. It serves as both a learning resource and a template for organizing task repositories.

## Repository Structure

```
.
├── .ratchet/
│   ├── registry.yaml    # Repository metadata and configuration
│   └── index.json       # Fast task discovery index
├── tasks/               # Individual task implementations
│   ├── addition/        # Basic math calculator example
│   ├── dummy-task/      # Minimal test task for validation
│   ├── ms-oauth-token/  # Microsoft OAuth authentication
│   ├── rest-call-sample/# HTTP REST API integration
│   ├── streaming-example/# Real-time progress reporting
│   └── weather-api/     # External API integration
├── collections/         # Task collections and workflows
├── templates/           # Task templates and boilerplate
└── README.md           # This file
```

## Task Categories

### Examples
- **addition**: Simple calculator demonstrating basic task structure
- **dummy-task**: Minimal echo task for testing pipelines
- **streaming-example**: Long-running task with progress updates

### API Integration
- **rest-call-sample**: HTTP REST API calls with error handling
- **weather-api**: External weather service integration

### Authentication
- **ms-oauth-token**: Microsoft Azure AD OAuth token retrieval

## Task Complexity Levels

- **Beginner**: Basic tasks suitable for learning (addition, dummy-task)
- **Intermediate**: More complex integrations and patterns (all others)

## Usage

### With Git+HTTP Registry

Configure this repository as a Git task source in your Ratchet configuration:

```yaml
registries:
  - name: "samples"
    source:
      type: "git"
      url: "https://github.com/your-org/ratchet-sample-tasks.git"
      ref: "main"
```

### Direct Task Discovery

Each task includes:
- `metadata.json`: Task definition and configuration
- `main.js`: Task implementation
- `input.schema.json`: Input validation schema
- `output.schema.json`: Output format definition
- `tests/`: Test cases and examples

## Development

### Adding New Tasks

1. Create a new directory under `tasks/`
2. Include all required files (metadata.json, main.js, schemas)
3. Add comprehensive test cases
4. Update the repository index: `ratchet registry update`

### Testing Tasks

Each task includes test cases in the `tests/` directory:

```bash
# Test a specific task
ratchet task test tasks/addition/tests/test-001.json

# Test all tasks
ratchet task test-all
```

## License

All tasks in this repository are licensed under the MIT License unless otherwise specified in individual task metadata.

## Contributing

When contributing new tasks:
1. Follow the established directory structure
2. Include comprehensive metadata and documentation
3. Provide multiple test cases including edge cases
4. Ensure cross-platform compatibility
5. Update this README if adding new categories