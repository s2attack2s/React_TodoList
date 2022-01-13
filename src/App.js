import "./App.css";
import { Route, Routes } from "react-router-dom";
import Menu from "./components/layout/menu/menu";
import TodoList from "./components/list/view/list";
import ListContextApi from "./components/listContextApi/view/listContextApi";
import ListRedux from "./components/listRedux/view/ListRedux";
function App() {
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route exact path="/" element={<TodoList />} />

        <Route
          exact
          path="/todo-list-context-api"
          element={<ListContextApi />}
        />
        <Route exact path="/todo-list-redux" element={<ListRedux />} />
      </Routes>
    </div>
  );
}

export default App;
