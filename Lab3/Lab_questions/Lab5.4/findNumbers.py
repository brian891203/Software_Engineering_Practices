# Lab 5.4
# findNumbers.py

def find_numbers(numbers):
    if not isinstance(numbers, list):
        raise TypeError('Input must be a list')
    
    result = []
    for num in numbers:
        if not isinstance(num, (int, float)):
            raise TypeError('All elements in the list must be numbers')
        
        if num > 0:
            result.append("positive")
        elif num < 0:
            result.append("negative")
        else:
            result.append("zero")
    return result