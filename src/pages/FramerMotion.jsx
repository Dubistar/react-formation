import { useToggle } from "../hooks/useToggle.js";
import { motion } from "framer-motion";
import  Button  from "../components/forms/Button.jsx";
import { forwardRef } from "react";

const boxVariants = {
    visible: { x: 0, rotate: 0 },
    hidden: { x: 20, rotate: 45 },
};

const wrapperVariants = {
    visible: { opacity: 1, transition: [] },
    hidden: { opacity: 0, transition: { when: "afterChildren" } },
};

export default function FramerMotion() {
    const [open, toggle] = useToggle(true);
    return (
        <div className="container my-4 vstack gap-3">
            <motion.div
            variants={wrapperVariants}
            className="vstack gap-2"
            animate={open ? "visible" : "hidden"}>
                <MotionBox
                    variants={boxVariants}
                >1
                </MotionBox>
                <MotionBox
                    variants={boxVariants}
                >2
                </MotionBox>
                <MotionBox
                    variants={boxVariants}
                >3
                </MotionBox>
            </motion.div>
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
    </div>;     
});

const MotionBox = motion(Box);
