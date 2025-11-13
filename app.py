from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/calculate', methods=['POST'])
def calculate_force():
    data = request.get_json()
    mass = data.get('mass')
    
    if mass is None:
        return jsonify({'error': 'Mass is required'}), 400
    
    try:
        mass = float(mass)
        if mass < 0:
            return jsonify({'error': 'Mass must be positive'}), 400
        
        # Formula: Force = mass * gravity
        force = mass * 9.81
        
        return jsonify({'force': force})
    except ValueError:
        return jsonify({'error': 'Invalid mass value'}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
