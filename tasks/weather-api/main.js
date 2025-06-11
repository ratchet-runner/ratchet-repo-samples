(function(input) {
    // Extract parameters from input
    const city = input.city || "Unknown";
    const units = input.units || "metric";
    
    // Weather API key - in a real implementation, this would be securely managed
    const API_KEY = "your-api-key-here";
    
    // Build the API URL
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${API_KEY}`;
    
    try {
        // Make the HTTP request using the fetch API
        // The fetch API will automatically throw typed errors for non-OK responses
        const response = fetch(url, { method: "GET" });
        
        // Parse the response body
        const data = response.body;
        
        // Validate response data
        if (!data || !data.name || !data.sys || !data.main || !data.weather || !data.weather[0]) {
            throw new DataError("Invalid response format from weather API");
        }
        
        // Format and return the weather data
        return {
            location: `${data.name}, ${data.sys.country}`,
            temperature: data.main.temp,
            units: units === "metric" ? "C" : "F",
            description: data.weather[0].description,
            humidity: data.main.humidity
        };
    } catch (error) {
        // Re-throw typed errors as-is, wrap others in appropriate error types
        if (error.name && error.name.endsWith('Error')) {
            throw error;
        } else {
            throw new NetworkError(`Failed to fetch weather data: ${error.message}`);
        }
    }
})
