
import {useState} from "react";

const style = {color:'red'}
const todos = [
    "first",
    "second",
    "third"
]
function App() {

    const [count,setCount] = useState(0)
    const increment = () => {
        setCount(count + 1)
    }
    const decrement = () => {
        setCount(count - 1)
    }

    const [value, setValue] = useState('');
    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const [checked, setChecked] = useState(true)
    const toggleCheck = () => {
        setChecked(!checked)
    }

    return <>
        <textarea value={value} onChange={handleChange}></textarea>
        <p>{value}</p>
        <input type="checkbox" checked={checked} onChange={toggleCheck}/>
        <p> Compteur : {count}</p>
        <button onClick={increment} disabled={!checked}>Incrémenter</button>
        <button onClick={decrement}>Décrement</button>
    </>
}



export default App
