import * as React from "react";
import {useState,
        useEffect,
        useRef
} from "react";
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
        Tooltip,
        ResponsiveContainer
} from 'recharts';

const data1 = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},
               {name: 'Page B', uv: 300, pv: 2400, amt: 2400},
               {name: 'Page C', uv: 500, pv: 2400, amt: 2400}];

const data2 = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},
               {name: 'Page B', uv: 300, pv: 2400, amt: 2400},
               {name: 'Page C', uv: 500, pv: 2400, amt: 2400}];

export default function Page() {
    return (
        <Grid container>
            <Grid xs={12}>
                <Typography variant='h5' sx={{ fontWeight: 'bold', ml: 6, my: 3 }}>Hi, Welcome back!</Typography>
            </Grid>
            <Grid xs={7}>
                <Grid sx={{ ml: 6, mr: 3, p: 3, backgroundColor: '#D1E9FC', borderRadius: 5 }}>
                    <Typography sx={{ fontWeight: 'bold', textAlign: 'center', color: '#061B64' }}>Total vehicles</Typography>
                    <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <ResponsiveContainer width='100%' height={300}>
                            <LineChart data={data1}>
                                <CartesianGrid stroke="#ccc" strokeDasharray="3"/>
                                <Line type="monotone" dataKey="uv" stroke="#061B64"/>
                                <XAxis dataKey="name"/>
                                <YAxis width={30}/>
                                <Tooltip/>
                            </LineChart>
                        </ResponsiveContainer>
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={5}>
                <Grid sx={{ mr: 6, ml: 3, p: 3, backgroundColor: '#FFE7D9', borderRadius: 5 }}>
                    <Typography sx={{ fontWeight: 'bold', textAlign: 'center', color: '#7A0C2E' }}>Services</Typography>
                    <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <ResponsiveContainer width='100%' height={300}>
                            <BarChart data={data2}>
                                <Bar dataKey="uv" fill="#7A0C2E" barSize={30}/>
                                <XAxis dataKey="name"/>
                                <YAxis width={30}/>
                            </BarChart>
                        </ResponsiveContainer>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
	);
}
