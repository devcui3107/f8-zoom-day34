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
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const baseUrl = "https://jsonplaceholder.typicode.com/users/1";
    const dataApi = fetch(baseUrl).then((response) => response.json());
    dataApi.then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container">
      <div className="main">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="profile">
            <div className="profile__image">
              <img
                src="https://anhdephd.vn/wp-content/uploads/2022/04/anh-gai-nhat-ban.jpg"
                alt=""
                className="profile__img"
              />
            </div>
            <div className="profile__info">
              <h2 className="profile__title">{data.name}</h2>
              <dl className="profile__details">
                <dt className="profile__label">Username</dt>
                <dd className="profile__value">{data.username}</dd>

                <dt className="profile__label">Email</dt>
                <dd className="profile__value">{data.email}</dd>

                <dt className="profile__label">Phone</dt>
                <dd className="profile__value">{data.phone}</dd>

                <dt className="profile__label">Website</dt>
                <dd className="profile__value">{data.website}</dd>

                <dt className="profile__label">Address</dt>
                <dd className="profile__value">
                  {data?.address?.street}, {data?.address?.city}
                </dd>
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const app = (
  <>
    <Header title="Profile Card" />
    <Main />
  </>
);

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(app);
