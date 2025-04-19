import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Grid } from "@mui/material";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Grid container spacing={2} maxWidth={"800px"}>
                <Grid size={3} bgcolor={"darkgray"}>
                    <p> 1 </p>
                </Grid>
                <Grid size={3} bgcolor={"darkgray"}>
                    <p> 2 </p>
                </Grid>
                <Grid size={3} bgcolor={"darkgray"}>
                    <p> 3 </p>
                </Grid>
                <Grid size={3} bgcolor={"darkgray"}>
                    <p> 4 </p>
                </Grid>
                <Grid size={3} bgcolor={"darkgray"}>
                    <p> 5 </p>
                </Grid>
                <Grid size={3} bgcolor={"darkgray"}>
                    <p> 6 </p>
                </Grid>
                <Grid size={3} bgcolor={"darkgray"}>
                    <p> 7 </p>
                </Grid>
                <Grid size={3} bgcolor={"darkgray"}>
                    <p> 8 </p>
                </Grid>
                <Grid size={3} bgcolor={"darkgray"}>
                    <p> 9 </p>
                </Grid>
                <Grid size={3} bgcolor={"darkgray"}>
                    <p> 10</p>
                </Grid>
                <Grid size={3} bgcolor={"darkgray"}>
                    <p> 11</p>
                </Grid>
                <Grid size={3} bgcolor={"darkgray"}>
                    <p> 12</p>
                </Grid>
                <Grid
                    size={3}
                    bgcolor={"darkgray"}
                    width={"5em"}
                    height={"5em"}
                >
                    <p> 13</p>
                </Grid>
                <Grid
                    size={3}
                    bgcolor={"darkgray"}
                    width={"5em"}
                    height={"5em"}
                >
                    <p> 14</p>
                </Grid>
                <Grid size={3} bgcolor={"darkgray"}>
                    <p> 15</p>
                </Grid>
                <Grid size={3} bgcolor={"darkgray"}>
                    <p> 16 </p>
                </Grid>
            </Grid>
        </>
    );
}

export default App;
