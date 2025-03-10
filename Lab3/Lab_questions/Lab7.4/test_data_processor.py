from unittest.mock import patch

import pytest
from data_processor import get_and_process_data


@patch("data_processor.fetch_data_from_api", return_value = [1, 2, 3])
def test_get_and_process_data_with_data(mock_fetch):

    result = get_and_process_data("https://example.com/api/data")

    assert result == 6

@patch("data_processor.fetch_data_from_api", return_value = None)
def test_get_and_process_data_no_data(mock_fetch):

    result = get_and_process_data("https://example.com/api/data")
    
    assert result is None
