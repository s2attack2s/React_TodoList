
import './App.css';
import { Route, Routes, Switch } from 'react-router-dom';
import Menu from './components/layout/menu/menu';
import TodoList from './components/list/view/list';
import About from './components/about/about';
function App() {
 
  return (
  
    <div className="App">
      <Menu />
    <Routes>
        <Route exact path="/" element={<TodoList />} />
        
  
        <Route exact path="/about" element={<About />} />
     
      </Routes>
    </div>
  );
}

export default App;
