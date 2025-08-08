import { useToggle } from "../hooks/useToggle.js";
import { motion } from "framer-motion";
import  Button  from "../components/forms/Button.jsx";
import { forwardRef } from "react";

const boxVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, rotate: 45 },
    exit: { opacity: 0, x: 100 }
};

export default function FramerMotion() {
    const [open, toggle] = useToggle(true);
    return (
        <div className="container my-4 vstack gap-3">
            <div className="vstack gap-2">
                <MotionBox
                    variants={boxVariants}
                    initial="hidden"
                    animate={open ? "visible" : "exit"}
                    whileHover={{ scale: 1.1 }}
                    style={{
                    width: "200px",
                    height: "100px",
                    background: "lightblue",
                    display: open ? "block" : "none"
                }}
                >1
                </MotionBox>
            </div>
        <div>
            <Button onClick={toggle}>
                Afficher/masquer
            </Button>
        </div>
        </div>
    );
}

const Box = forwardRef(({ children }, ref) => {
    return <div className="box" ref={ref}>{children}
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam praesentium, quas voluptatibus veritatis non, mollitia repudiandae reiciendis debitis ea repellat consectetur necessitatibus deserunt optio in, dolorem modi cupiditate temporibus ullam.</p>
    </div>;     
});

const MotionBox = motion(Box);
