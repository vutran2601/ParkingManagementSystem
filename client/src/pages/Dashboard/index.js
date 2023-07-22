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

const data1 = [{name: 'Page A', uv: 2000, pv: 2400, amt: 2400},
               {name: 'Page B', uv: 1000, pv: 2400, amt: 2400},
               {name: 'Page C', uv: 3000, pv: 2400, amt: 2400}];

const data2 = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400},
               {name: 'Page B', uv: 300, pv: 2400, amt: 2400},
               {name: 'Page C', uv: 500, pv: 2400, amt: 2400}];

export default function Dashboard() {
    return (
        <Grid container>
            <Grid xs={12}>
                <Typography variant='h5' sx={{ fontWeight: 'bold', ml: 6, my: 3 }}>Hi, Welcome back!</Typography>
            </Grid>
            <Grid xs={7}>
                <Grid sx={{ ml: 6, mr: 3, p: 3, backgroundColor: 'white', borderRadius: 2 }}>
                    <Typography sx={{ fontWeight: 'bold', textAlign: 'center', color: '#1890ff' }}>Total vehicles</Typography>
                    <Grid
                        sx={{
                            mt: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            '& .recharts-wrapper .recharts-cartesian-grid-horizontal line:last-child': {
                                strokeOpacity: 0,
                            }
                        }}>                       
                        <ResponsiveContainer width='100%' height={300} >
                            <LineChart data={data1}>
                                <CartesianGrid
                                    horizontal={true}
                                    vertical={false}
                                    stroke="#ccc"
                                    strokeDasharray="3"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="uv"
                                    stroke="#1890ff"
                                    strokeWidth={3}
                                    dot={false}
                                />
                                <XAxis
                                    dataKey="name" 
                                    axisLine={false}
                                    padding={{ left: 30, right: 30 }}
                                    tickLine={false}
                                    tick={{
                                        fontSize: 12,
                                    }}
                                />
                                <YAxis
                                    axisLine={false}
                                    padding={{ top: 10 }}
                                    tickLine={false}
                                    tick={{
                                        fontSize: 12,
                                    }}
                                />
                                <Tooltip
                                    cursor={{
                                        strokeDasharray: '3',
                                        stroke: "#9c9c9c"
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={5}>
                <Grid sx={{ mr: 6, ml: 3, p: 3, backgroundColor: 'white', borderRadius: 2 }}>
                    <Typography sx={{ fontWeight: 'bold', textAlign: 'center', color: '#7A0C2E' }}>Services</Typography>
                    <Grid
                        sx={{
                            mt: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            '& .recharts-wrapper .recharts-cartesian-grid-horizontal line:last-child': {
                                strokeOpacity: 0,
                            },
                        }}>
                        <ResponsiveContainer width='100%' height={300}>
                            <BarChart data={data2}>
                                <CartesianGrid
                                    horizontal={true}
                                    vertical={false}
                                    stroke="#ccc"
                                    strokeDasharray="3"
                                />
                                <Bar dataKey="uv" fill="#7A0C2E" barSize={30}/>
                                <XAxis
                                    dataKey="name" 
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fontSize: 12,
                                    }}
                                />
                                <YAxis
                                    axisLine={false}
                                    padding={{ top: 10 }}
                                    tickLine={false}
                                    tick={{
                                        fontSize: 12,
                                    }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
	);
}
