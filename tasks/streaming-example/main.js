/**
 * Example task that demonstrates streaming progress updates
 * This task simulates a long-running operation with progress reporting
 */

(function(input, context) {
    const { steps = 5, delay = 1000, simulate_error = false } = input;
    
    // Helper function to report progress (would be provided by the runtime)
    function reportProgress(progress, step, message, data) {
        if (typeof global !== 'undefined' && global.reportProgress) {
            global.reportProgress({
                progress: Math.max(0, Math.min(1, progress)),
                step: step,
                message: message,
                data: data,
                timestamp: new Date().toISOString()
            });
        } else {
            // Fallback: log to console if progress reporting not available
            console.log(`Progress: ${(progress * 100).toFixed(1)}% - ${step}: ${message}`);
        }
    }
    
    // Start the task
    reportProgress(0.0, "initialization", "Starting streaming example task", {
        input_steps: steps,
        input_delay: delay
    });
    
    const results = [];
    
    // Simulate processing steps
    for (let i = 0; i < steps; i++) {
        const stepProgress = (i + 1) / steps;
        const stepName = `step_${i + 1}`;
        const stepMessage = `Processing step ${i + 1} of ${steps}`;
        
        // Report progress at the start of each step
        reportProgress(stepProgress * 0.8, stepName, stepMessage, {
            current_step: i + 1,
            total_steps: steps,
            items_processed: i
        });
        
        // Simulate some work (in real implementation, this would be actual processing)
        if (typeof setTimeout !== 'undefined') {
            // In Node.js environment, use actual delay
            const start = Date.now();
            while (Date.now() - start < delay) {
                // Busy wait to simulate work
            }
        }
        
        // Simulate error if requested
        if (simulate_error && i === Math.floor(steps / 2)) {
            reportProgress(stepProgress * 0.5, "error", `Simulated error at step ${i + 1}`, {
                error_type: "simulation",
                error_step: i + 1
            });
            throw new Error(`Simulated error at step ${i + 1}`);
        }
        
        // Generate some result for this step
        const stepResult = {
            step: i + 1,
            timestamp: new Date().toISOString(),
            data: `Result from step ${i + 1}`,
            value: Math.random() * 100
        };
        
        results.push(stepResult);
        
        // Report completion of this step
        reportProgress(stepProgress, `${stepName}_complete`, `Completed step ${i + 1}`, stepResult);
    }
    
    // Final processing
    reportProgress(0.95, "finalizing", "Finalizing results and cleanup", {
        total_results: results.length,
        processing_complete: true
    });
    
    // Prepare final output
    const output = {
        success: true,
        steps_completed: steps,
        total_processing_time: steps * delay,
        results: results,
        summary: {
            total_steps: steps,
            successful_steps: results.length,
            average_value: results.reduce((sum, r) => sum + r.value, 0) / results.length,
            first_result: results[0],
            last_result: results[results.length - 1]
        },
        metadata: {
            task_completed_at: new Date().toISOString(),
            execution_context: context
        }
    };
    
    // Report completion
    reportProgress(1.0, "completed", "Task completed successfully", {
        output_size: JSON.stringify(output).length,
        final_result: output.summary
    });
    
    return output;
});