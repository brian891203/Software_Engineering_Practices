from unittest.mock import patch

import pytest
from data_processor import get_and_process_data


@patch("data_processor.fetch_data_from_api")
def test_get_and_process_data_with_data(mock_fetch):
    mock_fetch.return_value = [1, 2, 3]
    
    result = get_and_process_data("https://example.com/api/data")

    assert result == 6

@patch("data_processor.fetch_data_from_api")
def test_get_and_process_data_no_data(mock_fetch):
    mock_fetch.return_value = None
    
    result = get_and_process_data("https://example.com/api/data")
    
    assert result is None
