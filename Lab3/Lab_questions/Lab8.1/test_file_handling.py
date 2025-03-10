# test_file_handling.py

import os

import pytest
from file_handler import FileHandler


# Define a fixture to set up and tear down a temporary file
@pytest.fixture
def temp_file(tmpdir):
    # please open a tempory file with its name "filename" 
    temp = tmpdir.join("filename")
    
    # This is where the test function runs
    temp.write("")
    yield str(temp)
    
    # please close the tempory file and remove it from the file systems
    temp.remove()

# Test function that uses the temp_file fixture
def test_file_handling(temp_file):
    # Arrange: Write content to the temporary file
    handler = FileHandler()
    handler.write_file(temp_file, "Hello, pytest!")

    # Act: Read content from the file
    content = handler.read_file(temp_file)

    # Assert the result
    assert content == "Hello, pytest!"

if __name__ == "__main__":
    pytest.main()