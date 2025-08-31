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
  const [inputName, setInputName] = React.useState("");
  const [inputEmail, setInputEmail] = React.useState("");
  const [inputComment, setInputComment] = React.useState("");
  const [listComment, setListComment] = React.useState([]);

  const fakeTime = [
    "2 giờ trước",
    "1 giờ trước",
    "5 giờ trước",
    "1 ngày trước",
    "2 ngày trước",
  ];

  // Function Support
  const formatText = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setListComment([
      ...listComment,
      {
        email: inputEmail,
        comment: inputComment,
        username: inputName,
        time: new Date(),
      },
    ]);

    setInputName("");
    setInputEmail("");
    setInputComment("");
  };

  const handleInputName = (e) => {
    e.preventDefault();
    setInputName(e.target.value);
  };
  const handleInputEmail = (e) => {
    e.preventDefault();
    setInputEmail(e.target.value);
  };
  const handleInputComment = (e) => {
    e.preventDefault();
    setInputComment(e.target.value);
  };

  React.useEffect(() => {
    const baseUrl = "https://jsonplaceholder.typicode.com/comments?postId=1";
    const dataApi = fetch(baseUrl).then((response) => response.json());
    dataApi.then((result) => {
      setData(result);
    });
  }, []);

  return (
    <div className="container">
      <div className="main">
        <div className="comment">
          <form className="comment__form" onSubmit={handleSubmit}>
            <h2 className="comment__title">Viết bình luận</h2>

            <div className="comment__inputs">
              <input
                value={inputName}
                type="text"
                placeholder="Tên"
                className="comment__input"
                onInput={handleInputName}
              />
              <input
                value={inputEmail}
                type="email"
                placeholder="Email"
                className="comment__input"
                onInput={handleInputEmail}
              />
            </div>

            <textarea
              value={inputComment}
              placeholder="Viết bình luận..."
              className="comment__textarea"
              onInput={handleInputComment}
            ></textarea>

            <button type="submit" className="comment__submit">
              Gửi
            </button>
          </form>

          <div className="comment__list">
            {/* My Comment */}
            {listComment.map((item) => (
              <div key={item.username} className="comment__item">
                <img
                  src={`https://ui-avatars.com/api/?name=${formatText(
                    item.username
                  )}&background=random`}
                  alt="avatar"
                  className="comment__avatar"
                />
                <div className="comment__body">
                  <div className="comment__time">vài giây trước</div>
                  <div className="comment__author">{item.username}</div>
                  <div className="comment__email">Email: {item.email}</div>
                  <div className="comment__content">{item.comment}</div>
                </div>
              </div>
            ))}

            {/* API Comment */}
            {data.map((item) => (
              <div key={item.id} className="comment__item">
                <img
                  src={`https://ui-avatars.com/api/?name=${formatText(
                    item.name
                  )}&background=random`}
                  alt="avatar"
                  className="comment__avatar"
                />
                <div className="comment__body">
                  <div className="comment__time">{fakeTime[item.id - 1]}</div>
                  <div className="comment__author">{formatText(item.name)}</div>
                  <div className="comment__email">Email: {item.email}</div>
                  <div className="comment__content">{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const app = (
  <>
    <Header title="Comment System" />
    <Main />
  </>
);

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(app);
