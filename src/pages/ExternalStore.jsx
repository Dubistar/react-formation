import { useOnline } from '../hooks/useOnline';
import { Counter } from '../components/Counter.jsx';

export default function ExternalStore() {
    const isOnline = useOnline();
    
    return (
        <div>
        <h1>External Store</h1>
        <p>Status: {isOnline ? "Online" : "Offline"}</p>
        <Counter />
        <Counter />
        </div>
    );
}


