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

function Button({ label, onClick }) {
  return (
    <button onClick={onClick} className="btn">
      {label}
    </button>
  );
}

function Main() {
  const [value, setValue] = React.useState(0);

  return (
    <div className="container">
      <div className="main">
        <div className="main__title">
          <h2
            className="main__show"
            style={{ color: value > 0 ? "green" : value < 0 ? "red" : "gray" }}
          >
            {value}
          </h2>
          <span className="main__alert">
            {value > 0 ? "Dương" : value < 0 ? "Âm" : "Bằng không"}
          </span>
        </div>
        <div className="buttons">
          <Button
            label="Giảm(-1)"
            onClick={() => setValue(handleDecrease(value))}
          />
          <Button label="Reset(0)" onClick={() => setValue(0)} />
          <Button
            label="Tăng(+1)"
            onClick={() => setValue(handleIncrease(value))}
          />
        </div>
      </div>
    </div>
  );
}

// Function Support:
const handleIncrease = (value) => value + 1;
const handleDecrease = (value) => value - 1;

const app = (
  <>
    <Header title="Counter App" />
    <Main />
  </>
);

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(app);
