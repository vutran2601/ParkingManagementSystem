import * as React from "react";
import {useState,
        useEffect,
        useRef} from "react";
import { styled } from "@mui/material/styles";
import {
    Typography,
    Grid,
} from "@mui/material";
import {LineChart,
        Line,
        CartesianGrid,
        XAxis,
        YAxis,
        BarChart,
        Bar,
        Tooltip} from 'recharts';

const data1 = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},
               {name: 'Page B', uv: 300, pv: 2400, amt: 2400},
               {name: 'Page C', uv: 500, pv: 2400, amt: 2400}];

const data2 = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},
               {name: 'Page B', uv: 300, pv: 2400, amt: 2400},
               {name: 'Page C', uv: 500, pv: 2400, amt: 2400}];

export default function Dashboard() {
    return (
        <Grid container>
            <Grid xs={6}>
                <Grid sx={{ m: 4 }}>
                    <Typography sx={{ fontWeight: 'bold' }}>Parking statistic</Typography>
                    <Grid sx={{ mt: 2 }}>
                        <LineChart width={600} height={300} data={data1}>
                            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="name" />
                            <YAxis/>
                            <Tooltip/>
                        </LineChart>
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={6}>
                <Grid sx={{ m: 4 }}>
                    <Typography sx={{ fontWeight: 'bold' }}>Service statistic</Typography>
                    <Grid sx={{ mt: 2 }}>
                        <BarChart width={600} height={300} data={data2}>
                            <Bar dataKey="uv" fill="red" barSize={50} />
                            <XAxis dataKey="name" />
                            <YAxis/>
                        </BarChart>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
	);
}
