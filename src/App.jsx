
import { createBrowserRouter, Link, Outlet } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ExternalStore from "./pages/ExternalStore.jsx";
import FramerMotion from "./pages/FramerMotion.jsx";
import Toast from "./pages/ToastPage.jsx";
import Modal from "./pages/ModalPage.jsx";


const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      },
       {
        path: "externalStore",
        element: <ExternalStore />,
      },
      {
        path: "framer-motion",
        element: <FramerMotion />,
      },
      {
        path: "Toast",
        element: <Toast />,
      },
      {
        path: "Modal",
        element: <Modal />,
      }
    ]
  },  
  // Add other routes here
]); 

function Root() {
  return (
    <>
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/externalStore">External Store</Link></li>
          <li><Link to="/framer-motion">Framer Motion</Link></li>
          <li><Link to="/Toast">Toast</Link></li>
          <li><Link to="/Modal">Modal</Link></li>
        </ul>     
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
    </>
  );
}

export { router };

