

export default function Button({ onClick, children }) {
    return (
        //button avec propriété boostrap
        <button onClick={onClick} className="btn btn-primary">
            {children}
        </button>
    );
}
