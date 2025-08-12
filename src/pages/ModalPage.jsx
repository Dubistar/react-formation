import { useState } from 'react';
import { useConfirm } from '../components/modal/ConfirmContext.jsx';

export default function ModalPage() {
    const [count, setCount] = useState(0);
    const { confirm } = useConfirm();

    const increment = async () => {
        if(await confirm({title:"Voulez vous Incrémenter ?"}))
      setCount((n) => n + 1);
    };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <p>Compteur: {count}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button className='btn btn-primary'  onClick={increment}>Increment Count</button>
      </div>
    </div>
  );
}