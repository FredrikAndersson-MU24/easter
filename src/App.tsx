import { useState, useEffect } from "react";
import "./App.css";
import { Grid } from "@mui/material";

function App() {
    const [count, setCount] = useState(0);
    const [grid, setGrid] = useState<{ [key: number]: number }>({});
    const [selected, setSelected] = useState<number[]>([]);

    const emojiMap = {
        0: "",
        1: "🐔",
        2: "2️⃣",
        4: "4️⃣",
        8: "8️⃣",
        16: "🔟",
        32: "3️⃣2️⃣",
        64: "6️⃣4️⃣",
        128: "1️⃣2️⃣8️⃣",
        256: "2️⃣5️⃣6️⃣",
        512: "5️⃣1️⃣2️⃣",
        1024: "1️⃣0️⃣2️⃣4️⃣",
        2048: "2️⃣0️⃣4️⃣8️⃣",
    };

    // Initialize the grid with 6-7 random squares filled with 1s and 2s
    const initializeGrid = () => {
        const initialGrid = {};
        const numbers = [1, 1, 1, 2, 2, 2, Math.random() < 0.5 ? 1 : 2]; // Ensure at least 6-7 squares are used
        while (numbers.length > 0) {
            const randomIndex = Math.floor(Math.random() * 16) + 1;
            if (!initialGrid[randomIndex]) {
                initialGrid[randomIndex] = numbers.shift();
            }
        }
        setGrid(initialGrid);
    };

    useEffect(() => {
        initializeGrid();
    }, []);

    const handleClick = (key: number) => {
        setSelected((prevSelected) => {
            if (prevSelected.length < 2 && !prevSelected.includes(key)) {
                return [...prevSelected, key];
            }
            return prevSelected;
        });
    };

    const resetGrid = () => {
        setCount(count + 1);
        initializeGrid();
        setSelected([]);
    };

    const addRandomNumber = (newGrid) => {
        const emptySquares = [];
        for (let i = 1; i <= 16; i++) {
            if (!newGrid[i]) {
                emptySquares.push(i);
            }
        }
        if (emptySquares.length > 0) {
            const randomIndex =
                emptySquares[Math.floor(Math.random() * emptySquares.length)];
            newGrid[randomIndex] = Math.random() < 0.5 ? 1 : 2; // Add a random number (1 or 2)
        }
    };

    const mergeNumbers = () => {
        if (selected.length === 2) {
            const [first, second] = selected;
            if (grid[first] === grid[second]) {
                setGrid((prevGrid) => {
                    const newGrid = {
                        ...prevGrid,
                        [first]: 0,
                        [second]: prevGrid[first] * 2,
                    };
                    addRandomNumber(newGrid); // Add a new random number to the grid
                    return newGrid;
                });
            }
            setSelected([]);
        }
    };

    useEffect(() => {
        if (selected.length === 2) {
            mergeNumbers();
        }
    }, [selected]);

    return (
        <>
            <h1>{count}</h1>
            <button onClick={resetGrid}>clear</button>
            <Grid container spacing={2} maxWidth={"800px"}>
                {Array.from({ length: 16 }, (_, i) => (
                    <Grid
                        key={i + 1}
                        item
                        xs={3}
                        className="square"
                        onClick={() => handleClick(i + 1)}
                        style={{
                            backgroundColor: selected.includes(i + 1)
                                ? "lightblue"
                                : "white",
                        }}
                    >
                        <p> {emojiMap[grid[i + 1]] || ""} </p>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default App;
