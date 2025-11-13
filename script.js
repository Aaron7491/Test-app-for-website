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
        const response = await fetch('http://localhost:5000/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mass: parseFloat(mass) })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            resultDiv.style.display = 'block';
            resultDiv.style.backgroundColor = '#e8f5e9';
            resultDiv.style.color = '#2e7d32';
            resultDiv.textContent = `Force: ${data.force.toFixed(2)} N`;
        } else {
            resultDiv.style.display = 'block';
            resultDiv.style.backgroundColor = '#ffebee';
            resultDiv.style.color = '#c62828';
            resultDiv.textContent = data.error || 'Error calculating force';
        }
    } catch (error) {
        resultDiv.style.display = 'block';
        resultDiv.style.backgroundColor = '#ffebee';
        resultDiv.style.color = '#c62828';
        resultDiv.textContent = 'Error connecting to server. Make sure the Python backend is running.';
    }
}

// Allow Enter key to trigger calculation
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('mass').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            calculateForce();
        }
    });
});
