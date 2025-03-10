# test_data_processor.py
from unittest.mock import patch

import pytest
from data_processor import process_and_store_data


@patch("data_processor.Database")
def test_process_and_store_data(mock_db):

    mock_db_instance = mock_db.return_value

    mock_db_instance.get_all_data.return_value = [1, 2, 3]

    # Call the function to be tested with a value (e.g., 3)
    result = process_and_store_data(3)

    # Check if the result is 6 (because 1 + 2 + 3 = 6)
    assert result == 6

    # Verify that insert_data(3) was called once
    mock_db_instance.insert_data.assert_called_once_with(3)