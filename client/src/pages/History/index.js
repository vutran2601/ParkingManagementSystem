import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Breadcrumbs,
  Grid,
  TextField,
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DownloadIcon from '@mui/icons-material/Download';

function History() {
  const [listRooms, setListRooms] = useState([]);

  // Fetch list rooms
  useEffect(() => {
    fetchListRooms();
  }, []);

  async function fetchListRooms() {
    const response = await fetch('http://localhost:5000/api/rooms', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      const message = `An error occured: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const record = await response.json();
    setListRooms(record);
  }

  const [room, setRoom] = useState(null)
  const [nameRoom, setNameRoom] = useState(null)

  function ListRooms() {
    return (
      <Autocomplete
        disablePortal
        id="rooms"
        value={nameRoom}
        onChange={(event, nameRoom) => {
          let theRoom = null;
          for (let room of listRooms) {
            if (room.name === nameRoom) {
              theRoom = room
              setRoom(room);
            }
          }
          setNameRoom(nameRoom);
          if (nameRoom != null) setListSensors(theRoom.devices);
          else {
            setRoom(null);
            setSensor(null);
            setListSensors([]);
          }
        }}
        options={listRooms.map((room) => room.name)}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="Chọn phòng" />}
      />
    );
  }

  const [sensor, setSensor] = useState(null)
  const [listSensors, setListSensors] = useState([]);
  const [nameSensor, setNameSensor] = useState(null);

  function ListSensors() {
    return (
      <Autocomplete
        disablePortal
        id="sensors"
        value={nameSensor}
        onChange={(event, nameSensor) => {
          setNameSensor(nameSensor);
          for (let sensor of listSensors) {
            if (nameSensor === sensor.name) {
              setSensor(sensor);
            }
          }
          if (nameSensor == null) setSensor(null);
        }}
        options={listSensors.map(sensor => sensor.name)}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="Chọn cảm biến" />}
      />
    );
  }
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  function ChooseSensor() {
    return (
      <>
        <Grid container className="px-3 py-1">
          <Grid item>
            <ListRooms />
          </Grid>
          <Grid sx={{marginLeft: '21px'}}>
            <ListSensors />
          </Grid>
          <Grid >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
                sx={{ width: 200, marginLeft: 5}}
                value={startDate}
                onChange={(startDate) => setStartDate(startDate)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid sx={{marginLeft: '21px'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker 
                sx={{ width: 200}}
                value={endDate}
                onChange={(endDate) => setEndDate(endDate)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid>
            <Button variant="contained" size="large" sx={{height: 55, marginLeft: '20px', backgroundColor: '#6C63FF'}} onClick={updateRecords}>
              Cập nhật
            </Button>
          </Grid>
          <Grid>
            <Button variant="contained" size="large" sx={{height: 55, marginLeft: '20px', backgroundColor: '#6C63FF'}} onClick={createCSV}>
              <DownloadIcon />
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }

  const [records, setRecord] = useState([]);

  function createCSV() {
    let csv_data = [];
    let csv_row = ['Time', 'Message'];
    csv_data.push(csv_row.join(','));
    for (let data of records) {
      csv_row = [data.time.split(',').join(''), data.message];
      csv_data.push(csv_row.join(','));
    }
    csv_data = csv_data.join("\n");

    var CSVFile = new Blob([csv_data], { type: "text/csv" });

    // Create to temporary link to initiate
    // download process
    var temp_link = document.createElement("a");

    // Download csv file
    temp_link.download = "tigerleopard.csv";
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    // Automatically click the link to trigger download
    temp_link.click();
    document.body.removeChild(temp_link);
  }
  
  const updateRecords = () => {
    if (room != null && sensor != null) {
      getSensorRecords(listRooms.indexOf(room), listSensors.indexOf(sensor));
    }
    else {
      setRecord([]);
    }
  }

  function checkStartDate(data) {
    let fullday = data.time.split(',')[0].split('/');
    let month = fullday[0], day = fullday[1], year = fullday[2];
    if (year < startDate.year()) return false;
    else if (year == startDate.year()) {
      if (month < startDate.month() + 1) return false;
      else if (month == startDate.month() + 1) {
        if (day < startDate.date()) return false;
        return true;
      }
      return true;
    }
    return true;
  }

  function checkEndDate(data) {
    let fullday = data.time.split(',')[0].split('/');
    let day = fullday[0], month = fullday[1], year = fullday[2];
    if (year > endDate.year()) return false;
    else if (year == endDate.year()) {
      if (month > endDate.month() + 1) return false;
      else if (month == endDate.month() + 1) {
        if (day > endDate.date()) return false;
        return true;
      }
      return true;
    }
    return true;
  }

  async function getSensorRecords(room, device) {
    let url = 'http://localhost:5000/api/data?room=' + room + '&device=' + device;
    console.log(url);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      const message = `An error occured: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const record = await response.json();
    let records = record;
    if (startDate != null) records = records.filter(checkStartDate);
    if (endDate != null) records = records.filter(checkEndDate);
    setRecord(records.reverse());
  }

  function Graph() {
    return (
      <Box sx={{width: "95%", height: "400px", marginTop: 5}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={700}
            height={800}
            data={records}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey='time'/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="message" stroke="#5A6ACF" name="Dữ liệu" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    )
  }

  function RecordTable() {
    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ width:'100%' }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Thời gian</StyledTableCell>
                <StyledTableCell>Thông số</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => (
                <StyledTableRow key={record.id}>
                  <StyledTableCell component="th" scope="row">
                    {record.time}
                  </StyledTableCell>
                  <StyledTableCell>{record.message}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  }

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" style={{ margin: '20px' }}>
        <Typography color="text.primary">Lịch sử cảm biến</Typography>
      </Breadcrumbs>
      <ChooseSensor />
      <Graph />
      <RecordTable />
    </>
  );
}
export default History;