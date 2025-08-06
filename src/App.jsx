
import {use, useState, useEffect, useReducer, useContext} from "react";
import { Checkbox } from "./components/forms/Checkbox";
import { ProductRow } from "./components/products/ProductRow";
import { ProductCategoryRow } from "./components/products/ProductCategoryRow";
import { useToggle } from "./hooks/useToggle";
import { useIncrement } from "./hooks/useIncrement";
import { useFetch } from "./hooks/useFetch";
import { useTodos } from "./hooks/useTodo";
import { ThemeContext } from "./hooks/useTheme";

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
]



function App() {
  const [searchText, setSearchText] = useState("");
  const [onlyStocked, setOnlyStocked] = useState(false);
  const [duration, setDuration] = useState(5);
  const [count, setCount] = useState(duration);
  const [checked, toggleCheck] = useToggle();
  const [value, increment, decrement] = useIncrement(0);
  const [data, loading, error] = useFetch("https://jsonplaceholder.typicode.com/posts?_limit=20&delay=100000");
  const {visibleTodos, toggleTodo, removeTodo, clearCompleted} = useTodos();

 


  const handleCountChange = (newCount) => {
    setDuration(newCount);
    setCount(newCount);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(y => {
        if (y > 0) {
          return y - 1;
        }
        clearInterval(timer);
        return 0;
      });

    }, 1000); // Update every second
    return () => clearInterval(timer); // Cleanup on unmount
  }, [duration]);

  // Filter products based on search text and stocked status
  const filteredProducts = PRODUCTS.filter(product => {
    if(onlyStocked && !product.stocked) {
      return false;
    }
    if(searchText && !product.name.includes(searchText)) {
      console.log(searchText);
      return false;
    }
    return true
  });

  return <div className="container my-5">
      <SearchBar
      searchText={searchText}
      setSearchText={setSearchText}
      onlyStocked={onlyStocked}
      setOnlyStocked={setOnlyStocked}
    />
      <ProductTable products={filteredProducts} />
    <Title />

    {/* <div style={{ height: "300vh" }}></div> */}
    <input
      value={duration}
      onChange={e => handleCountChange(e.target.value)}
      placeholder="Timer..." 
  />
  <p>
    Décompte : {
      count > 0 ? count : "Terminé"
    }
  </p>
  <input type="checkbox" checked={checked} onChange={toggleCheck} />
  { checked ? <p>Checkbox is checked</p> : <p>Checkbox is not checked</p>}
    <div>
      compteur : {value}
    </div>
    <button onClick={increment}>Incrémenter</button>
    <button onClick={decrement}>Décrémenter</button>

    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <div>
        <h2>Fetched Data</h2>
        <ul>
          {data.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>}
    </div>
    <div>
      <h2>Reducer Example</h2>
      
      <ul>
        {visibleTodos.map(todo => (
          <li 
          key={todo.name}
          >
          <input type="checkbox" checked={todo.checked} onChange={() => toggleTodo(todo)} />
          {todo.name}
          <button onClick={() => removeTodo(todo)}>supprimer</button>
          </li>
        ))}
      </ul>
      <button onClick={clearCompleted}>Clear Completed</button>
    </div>
  </div>;

}

function SearchBar({ searchText, setSearchText, onlyStocked, setOnlyStocked }) {
  return (
    <div className="mb-3">
      <input
          placeholder="Search..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
      />
      <Checkbox
          id="stocked"
          label="Only show products in stock"
          checked={onlyStocked}
          onChange={setOnlyStocked}
      />
    </div>
      
  )
}
function ProductTable({products}) {
  const rows = [];
  let lastCategory = null;
  const theme = useContext(ThemeContext);


  for(let product of products) {
    if(product.category !== lastCategory) {
      rows.push(<ProductCategoryRow key={product.category} name={product.category} />);
      lastCategory = product.category;
    }
    rows.push(<ProductRow key={product.name} product={product} />);
  }
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
      </tr>
    </thead>
    <tbody>
      {rows}
    </tbody>
  </table>
  <button>{theme.theme}</button>
  </div>
  );
}

function Title() {

  const [title, setTitle] = useState("");
  const [y, setY] = useState(0);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setY(window.scrollY);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        setY(window.scrollY);
      });
    };
  }, []);

  return (
    <>
     <div className="vstack gap-2">
      <h1>scroll : {y}</h1>
    </div>
    <input
      value={title}
      type="text"
      className="form-control"
      onChange={e => setTitle(e.target.value)}
      placeholder="Title..." />
    </>
   
  );
  
}




export default App;
