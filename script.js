let pyodide;

// Initialize Pyodide when the page loads
async function initPyodide() {
    pyodide = await loadPyodide();
}

async function calculateForce() {
    const mass = document.getElementById('mass').value;
    const resultDiv = document.getElementById('result');
    
    if (!mass || isNaN(mass) || parseFloat(mass) < 0) {
        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#ffebee';
        resultDiv.style.color = '#c62828';
        resultDiv.textContent = 'Please enter a valid positive number';
        return;
    }
    
    try {
        // Check if Pyodide is loaded
        if (!pyodide) {
            resultDiv.style.display = 'block';
            resultDiv.style.backgroundColor = '#fff3cd';
            resultDiv.style.color = '#856404';
            resultDiv.textContent = 'Loading Python environment...';
            await initPyodide();
        }
        
        // Python code to calculate force
        const pythonCode = `
def calculate_force(mass):
    # Formula: Force = mass * gravity
    gravity = 9.81
    force = mass * gravity
    return force

result = calculate_force(${parseFloat(mass)})
result
`;
        
        // Run Python code and get result
        const force = await pyodide.runPythonAsync(pythonCode);
        
        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#e8f5e9';
        resultDiv.style.color = '#2e7d32';
        resultDiv.textContent = `Force: ${force.toFixed(2)} N`;
        
    } catch (error) {
        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#ffebee';
        resultDiv.style.color = '#c62828';
        resultDiv.textContent = 'Error calculating force: ' + error.message;
    }
}

// Allow Enter key to trigger calculation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Pyodide on page load
    initPyodide();
    
    document.getElementById('mass').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            calculateForce();
        }
    });
});
