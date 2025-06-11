# Streaming Progress Example Task

This task demonstrates how to implement real-time progress reporting in Ratchet tasks. It simulates a long-running operation with multiple steps, each reporting progress updates.

## Features

- **Progress Reporting**: Reports progress at each step using `reportProgress()` function
- **Step-by-step Processing**: Breaks work into discrete steps with individual progress updates
- **Error Simulation**: Can simulate errors to test error handling during streaming
- **Configurable Duration**: Adjustable number of steps and delay between steps

## Usage

### Basic Execution

```json
{
  "steps": 5,
  "delay": 1000
}
```

This will execute 5 steps with 1 second delay between each step.

### With Progress Streaming (via MCP)

When using the MCP server, you can enable progress streaming:

```json
{
  "task_id": "streaming-example",
  "input": {
    "steps": 10,
    "delay": 500
  },
  "stream_progress": true,
  "progress_filter": {
    "min_progress_delta": 0.1,
    "include_data": true
  }
}
```

This will send real-time progress notifications as the task executes.

## Progress Updates

The task reports progress at several points:

1. **Initialization** (0%): Task startup
2. **Step Processing** (incremental): Each processing step
3. **Step Completion** (incremental): When each step finishes
4. **Finalization** (95%): Final processing
5. **Completion** (100%): Task completion

Each progress update includes:
- **progress**: Percentage complete (0.0 to 1.0)
- **step**: Current step name
- **message**: Human-readable status message
- **data**: Step-specific data and metrics

## Error Handling

Set `simulate_error: true` to test error handling:

```json
{
  "steps": 6,
  "delay": 200,
  "simulate_error": true
}
```

This will cause the task to fail halfway through execution, allowing you to test error reporting and cleanup.

## Implementation Notes

### Progress Reporting Function

The task uses a `reportProgress()` function that should be provided by the Ratchet runtime:

```javascript
function reportProgress(progress, step, message, data) {
    if (typeof global !== 'undefined' && global.reportProgress) {
        global.reportProgress({
            progress: Math.max(0, Math.min(1, progress)),
            step: step,
            message: message,
            data: data,
            timestamp: new Date().toISOString()
        });
    }
}
```

If the runtime doesn't support progress reporting, it falls back to console logging.

### Best Practices

1. **Regular Updates**: Report progress at regular intervals
2. **Meaningful Steps**: Use descriptive step names and messages
3. **Progress Bounds**: Keep progress between 0.0 and 1.0
4. **Error Reporting**: Report progress even when errors occur
5. **Data Inclusion**: Include relevant step data for debugging

## Testing

The task includes test cases for:
- Basic streaming functionality
- Error handling during execution
- Different step counts and delays

Run tests using the Ratchet CLI:

```bash
ratchet test streaming-example
```