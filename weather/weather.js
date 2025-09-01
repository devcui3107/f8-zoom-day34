// Xử lý Render Header
function Header({ title }) {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__inner">
            <a href="../index.html" className="back-home">
              Quay lại trang chủ
            </a>
            <div className="header__title">{title}</div>
          </div>
        </div>
      </header>
    </>
  );
}

// Function Main
function Main() {
  const [selectedCity, setSelectedCity] = React.useState("hcm");
  const [currentCity, setCurrentCity] = React.useState({
    city: "TP.HCM",
    temp: 32,
    weather: "Có mây",
    humidity: 78,
  });

  const weatherData = {
    hanoi: { city: "Hà Nội", temp: 28, weather: "Nắng", humidity: 65 },
    hcm: { city: "TP.HCM", temp: 32, weather: "Có mây", humidity: 78 },
    danang: { city: "Đà Nẵng", temp: 30, weather: "Mưa nhẹ", humidity: 82 },
  };

  // Function Support
  const getCurrentCity = (e) => {
    setSelectedCity(e.target.value);

    const objCurrentCity = weatherData[e.target.value];
    setCurrentCity(objCurrentCity);
  };

  const handleSubmit = (e, currentCity) => {
    e.preventDefault();

    // Xử lý random lại nhiệt độ và độ ẩm (±5 độ/%).
    const updatedCity = {
      ...currentCity,
      temp: currentCity.temp + (Math.floor(Math.random() * 11) - 5),
      humidity: currentCity.humidity + (Math.floor(Math.random() * 11) - 5),
    };

    setCurrentCity(updatedCity);
  };

  const handleIconWeather = (str) => {
    const icons = {
      Nắng: "☀️",
      "Có mây": "🌤️",
      "Mưa nhẹ": "🌧️",
    };

    return icons[str] || 0;
  };

  return (
    <div className="container">
      <div className="main">
        <div className="weather">
          {currentCity && (
            <>
              <h1 className="weather__title">Thông tin thời tiết</h1>

              <div className="weather__card">
                <div className="weather__icon">
                  {handleIconWeather(currentCity.weather)}
                </div>
                <div className="weather__info">
                  <div className="weather__city">{currentCity.city}</div>
                  <div className="weather__temp">{currentCity.temp}°C</div>
                  <div className="weather__status">{currentCity.weather}</div>
                  <div className="weather__humidity">
                    Độ ẩm: {currentCity.humidity}%
                  </div>
                </div>
              </div>

              <div className="weather__controls">
                <label htmlFor="city" className="weather__label">
                  Chọn thành phố:
                </label>
                <form
                  className="weather__form"
                  onSubmit={(e) => handleSubmit(e, currentCity)}
                >
                  <select
                    value={selectedCity}
                    id="city"
                    className="weather__select"
                    onChange={(e) => getCurrentCity(e, currentCity)}
                  >
                    <option value="hanoi">Hà Nội</option>
                    <option value="hcm">TP.HCM</option>
                    <option value="danang">Đà Nẵng</option>
                  </select>
                  <button className="weather__refresh">Làm mới</button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const app = (
  <>
    <Header title="Weather App" />
    <Main />
  </>
);

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(app);
