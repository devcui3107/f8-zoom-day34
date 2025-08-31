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

// Biến tạm lưu ID
let uniqId = 0;

// Function Main
function Main() {
  const strJSON = JSON.parse(localStorage.getItem("tasks"));

  const [inputValue, setInputValue] = React.useState("");
  const [todoList, setTodoList] = React.useState(strJSON ? strJSON : []);

  // Function Support:
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim()) {
      setTodoList([
        ...todoList,
        {
          id: ++uniqId,
          label: inputValue,
          completed: false,
        },
      ]);

      setInputValue("");
    }
  };

  // Lưu mảng Tasks vào localStorage
  const temp = JSON.stringify(todoList);
  localStorage.setItem("tasks", temp);

  const handleCheckbox = (todoId) => {
    setTodoList(
      todoList.map((item) =>
        item.id === todoId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const totalTaskAll = () => {
    return todoList.length;
  };

  const totalTaskCompleted = () => {
    let count = 0;
    todoList.forEach((item) => {
      if (item.completed) {
        count++;
      }
    });
    return count;
  };

  const totalTaskDoing = () => {
    const numTask = Number(totalTaskAll()) - Number(totalTaskCompleted());
    return numTask;
  };

  const handleDeleteTask = (taskId, taskName) => {
    const isConfirm = confirm(`Bạn có chắc muốn xoá task "${taskName}" không?`);
    if (!isConfirm) return;

    setTodoList(
      todoList.filter((item) => {
        return item.id !== taskId;
      })
    );
  };

  return (
    <div className="container">
      <div className="main">
        <div className="todo">
          <form action="" className="todo__form" onSubmit={handleSubmit}>
            <input
              value={inputValue}
              type="text"
              className="todo__input"
              onChange={handleInputChange}
              placeholder="Nhập task mới..."
            />
            <button type="submit" className="todo__submit">
              Thêm
            </button>
          </form>
          {todoList.length !== 0 ? (
            <div className="todo__content">
              <ul className="todo__list">
                {todoList.map((todo) => (
                  <li
                    key={todo.id}
                    className={
                      todo.completed ? "todo__item done" : "todo__item"
                    }
                  >
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="todo__checkbox"
                      onChange={() => handleCheckbox(todo.id)}
                      checked={todo.completed ? true : false}
                    />
                    <label className="todo__label">{todo.label}</label>
                    <button
                      className="todo__delete"
                      onClick={() => handleDeleteTask(todo.id, todo.label)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 3v1H4v2h16V4h-5V3H9zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM6 7h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7z" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="todo__statistics">
                <div className="todo__statistic">
                  Tổng:
                  <span className="todo__statistic--num">{totalTaskAll()}</span>
                  {totalTaskAll() > 1 ? "tasks" : "task"}
                </div>
                <div className="todo__statistic">
                  Hoàn thành:
                  <span className="todo__statistic--num">
                    {totalTaskCompleted()}
                  </span>
                  {totalTaskCompleted() > 1 ? "tasks" : "task"}
                </div>
                <div className="todo__statistic">
                  Còn lại:
                  <span className="todo__statistic--num">
                    {totalTaskDoing()}
                  </span>
                  {totalTaskDoing() > 1 ? "tasks" : "task"}
                </div>
              </div>
            </div>
          ) : (
            <div className="todo__empty">
              Chưa có task nào. Hãy thêm task đầu tiên!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const app = (
  <>
    <Header title="Todo List App" />
    <Main />
  </>
);

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(app);
