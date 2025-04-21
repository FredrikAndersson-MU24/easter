import { useState, useEffect } from "react";
import "./App.css";
import { Button, Grid, Stack, Popover, List, ListItem } from "@mui/material";
import * as React from "react";

function App() {
    const [count, setCount] = useState(0);
    const [grid, setGrid] = useState<{ [key: number]: number }>({});
    const [selected, setSelected] = useState<number[]>([]);
    const [maxLevel, setMaxLevel] = useState<number>(0);
    const [low, setLow] = useState<number>(1);
    const [prevLow, setPrevLow] = useState<number>(0);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClickLvl = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseLvl = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const emojiMap: { [key: number]: string } = {
        0: "",
        1: "🐔",
        2: "🐇",
        4: "🐓",
        8: "🥚",
        16: "🐣",
        32: "🐤",
        64: "🐥",
        128: "🐰",
        256: "🍬",
        512: "🍭",
        1024: "🍫",
        2048: "🦄",
    };

    // Initialize the grid with 6-7 random squares filled with 1s and 2s
    const initializeGrid = () => {
        const initialGrid: { [key: number]: number } = {};
        const numbers: number[] = [
            1,
            1,
            1,
            2,
            2,
            2,
            Math.random() < 0.5 ? 1 : 2,
        ]; // Ensure at least 6-7 squares are used
        while (numbers.length > 0) {
            const randomIndex = Math.floor(Math.random() * 16) + 1;
            if (!initialGrid[randomIndex]) {
                initialGrid[randomIndex] = numbers.shift() as number;
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
        setCount(0);
        initializeGrid();
        setSelected([]);
        setMaxLevel(0);
        setLow(1);
    };

    const addRandomNumber = (newGrid: { [key: number]: number }) => {
        const emptySquares: number[] = [];
        for (let i = 1; i <= 16; i++) {
            if (!newGrid[i]) {
                emptySquares.push(i);
            }
        }
        determineLowestNumber(newGrid);
        if (emptySquares.length > 0) {
            const randomIndex =
                emptySquares[Math.floor(Math.random() * emptySquares.length)];
            newGrid[randomIndex] = Math.random() < 0.5 ? low : low * 2; // Add a random number (1 or 2)
        }
    };

    const mergeNumbers = () => {
        if (selected.length === 2) {
            const [first, second] = selected;
            if (grid[first] === grid[second]) {
                if (grid[first] + grid[second] > maxLevel) {
                    setMaxLevel(grid[first] + grid[second]);
                }
                setGrid((prevGrid) => {
                    const newGrid = {
                        ...prevGrid,
                        [first]: 0,
                        [second]: prevGrid[first] * 2,
                    };
                    if (determineLowestNumber(newGrid)) {
                        setLowestLevel();
                        console.log("from if statement");
                    }
                    console.log("low: " + low);
                    addRandomNumber(newGrid); // Add a new random number to the grid
                    setCount(count + 1);
                    return newGrid;
                });
            }
            setSelected([]);
        }
    };

    const setLowestLevel = () => {
        switch (maxLevel) {
            case 16:
                setLow(2);
                break;
            case 32:
                setLow(2);
                break;
            case 64:
                setLow(2);
                break;
            case 128:
                setLow(4);
                setPrevLow(2);
                break;
            case 256:
                setLow(8);
                setPrevLow(4);
                break;
            case 512:
                setLow(16);
                setPrevLow(8);
                break;
            case 1024:
                setLow(32);
                setPrevLow(16);
                break;
            case 2048:
                setLow(64);
                setPrevLow(32);
                break;
        }
    };

    const determineLowestNumber = (grid: { [key: number]: number }) => {
        let instances: number = 0;
        console.log(low);
        for (let i = 1; i <= 16; i++) {
            if (grid[i] === low) {
                instances++;
            }
        }
        console.log(instances % 2);
        if (instances % 2) {
            return true;
        } else return false;
    };

    useEffect(() => {
        if (selected.length === 2) {
            mergeNumbers();
        }
    }, [selected]);

    return (
        <>
            <Grid>
                <Stack>
                    <Grid size={4} container>
                        <Grid size={6}>
                            <Stack>
                                <h3>Merges</h3>
                                <h2>{count}</h2>
                            </Stack>
                        </Grid>
                        <Grid size={6} height={"2em"}>
                            <Stack>
                                <h3
                                    aria-describedby={id}
                                    onClick={handleClickLvl}
                                >
                                    Lvl<span className="info"> &#9432;</span>
                                </h3>
                                <h2>{maxLevel}</h2>
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleCloseLvl}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "left",
                                    }}
                                >
                                    <List
                                        style={{
                                            backgroundColor: "purple",
                                            color: "yellow",
                                            fontSize: "0.8rem",
                                        }}
                                    >
                                        <ListItem>1:🐔</ListItem>
                                        <ListItem>2: 🐇</ListItem>
                                        <ListItem>4: 🐓</ListItem>
                                        <ListItem>8: 🥚</ListItem>
                                        <ListItem>16: 🐣</ListItem>
                                        <ListItem>32: 🐤</ListItem>
                                        <ListItem>64: 🐥</ListItem>
                                        <ListItem>128: 🐰</ListItem>
                                        <ListItem>256: 🍬</ListItem>
                                        <ListItem>512: 🍭</ListItem>
                                        <ListItem>1024: 🍫</ListItem>
                                        <ListItem>2048: 🦄</ListItem>
                                    </List>
                                </Popover>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid container spacing={"1em"} maxWidth={"400px"}>
                        {Array.from({ length: 16 }, (_, i) => (
                            <Grid
                                key={i + 1}
                                size={3}
                                onClick={() => handleClick(i + 1)}
                                style={{
                                    backgroundColor: selected.includes(i + 1)
                                        ? "goldenrod"
                                        : "yellow",
                                }}
                                className="square"
                            >
                                <p> {emojiMap[grid[i + 1]] || ""} </p>
                            </Grid>
                        ))}
                    </Grid>
                    <Button
                        onClick={resetGrid}
                        style={{
                            width: "50%",
                            backgroundColor: "yellow",
                            color: "black",
                            fontWeight: "bold",
                            borderRadius: "1em",
                            alignSelf: "center",
                            marginTop: "1em",
                        }}
                        variant="contained"
                    >
                        RESET
                    </Button>
                </Stack>
            </Grid>
        </>
    );
}

export default App;
