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
  const [data, setData] = React.useState([]);
  const [productModal, setProductModal] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // Function Support
  const formatText = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const openModal = (prod) => {
    setProductModal(prod);
  };

  const closeModel = () => {
    setProductModal(null);
  };

  React.useEffect(() => {
    const baseUrl = "https://jsonplaceholder.typicode.com/posts?_limit=12";
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
          <div className="products">
            {data.map((prod) => (
              <div key={prod.id} className="product">
                <dl className="product__row">
                  <dt className="product__label">ID</dt>
                  <dd className="product__value">{prod.id}</dd>
                </dl>

                <h2 className="product__title">{prod.title}</h2>
                <p className="product__desc">{formatText(prod.body)}</p>
                <button
                  onClick={() => openModal(prod)}
                  className="product__btn"
                >
                  Xem chi tiết
                </button>
              </div>
            ))}
          </div>
        )}

        {productModal && (
          <div className="modal">
            <div className="modal__overlay"></div>
            <div className="modal__content">
              <div className="modal__info">
                <h2 className="modal__title">
                  {formatText(productModal.title)}
                </h2>
                <p className="modal__desc">{formatText(productModal.body)}</p>
              </div>
              <div className="modal__ctrl">
                <button onClick={closeModel} className="modal__close">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const app = (
  <>
    <Header title="Product List" />
    <Main />
  </>
);

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(app);
