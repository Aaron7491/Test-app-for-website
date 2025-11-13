def calculate_force(mass):
    """
    Calculate force using Newton's second law
    Force = mass * gravity
    
    Args:
        mass: Mass in kilograms
        
    Returns:
        Force in Newtons
    """
    gravity = 9.81
    force = mass * gravity
    return force
