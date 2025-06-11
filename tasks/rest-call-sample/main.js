// Task implementation
// This function receives input matching input.schema.json
// and must return output matching output.schema.json

function main(input) {

    let { id } = input;

    let result = fetch(`https://api.restful-api.dev/objects/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    // Simple return to debug
    return result.body;
}

// Export the main function (required)
main;
