from app.etl import fetch_weather_data


def test_fetch_weather_data():
    data = fetch_weather_data(max_retries=1)
    assert data is not None
    assert "temperature" in data
    assert "humidity" in data
    assert "timestamp" in data