import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Button,
  Breadcrumbs,
  Link,
  Box,
  Paper,
  Grid,
  Switch,
  Slider,
  Autocomplete,
  TextField,
} from "@mui/material";
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import LightIcon from "../../assets/images/lightIcon.png";
import FanIcon from "../../assets/images/fanIcon.png";
import SensorIcon from "../../assets/images/sensorIcon.png";

const MARGIN_LEFT = "20px";
const today = new Date().toLocaleDateString();
var timewithsec = new Date().toLocaleTimeString();
const time = timewithsec.substring(0, timewithsec.length - 6);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

function Dashboard() {
  const [lightValue, setLightValue] = useState(false);
  const [fanVolume, setFanVolume] = useState([]);
  const [TEMP, setTemp] = useState([]);
  const [HUMI, setHumi] = useState([]);
  const [nameRoom, setNameRoom] = useState(null);
  const room = useRef(null);
  useEffect(function effectFunction() {
    fetch(`http://localhost:5000/api/light/` + "?room=" + room.current)
      .then((response) => {
        if (!response.ok) {
          throw new Error('404 not found');
        }
        return response.json()
      })
      .then(({ message: light }) => {
        setLightValue(light == 1 ? true : false);
      });
    fetch(`http://localhost:5000/api/fan/` + "?room=" + room.current)
      .then((response) => {
        if (!response.ok) {
          throw new Error('404 not found');
        }
        return response.json()
      })
      .then(({ message: fan }) => {
        setFanVolume(parseInt(fan));
      });
    fetch(`http://localhost:5000/api/temp/` + "?room=" + room.current)
      .then((response) => {
        if (!response.ok) {
          throw new Error('404 not found');
        }
        return response.json()
      })
      .then(({ message: temp }) => {
        setTemp(temp);
      });
    fetch(`http://localhost:5000/api/humi/` + "?room=" + room.current)
      .then((response) => {
        if (!response.ok) {
          throw new Error('404 not found');
        }
        return response.json()
      })
      .then(({ message: humi }) => {
        setHumi(humi);
      });
  }, [room.current]);

  const [listRooms, setListRooms] = useState([]);

  // Fetch list rooms
  useEffect(() => {
    fetchListRooms();
  }, []);

  async function fetchListRooms() {
    const response = await fetch("http://localhost:5000/api/rooms", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

  async function onChangeLight(e) {
    e.preventDefault();
    setLightValue(!lightValue);
    let data = lightValue === true ? "0" : "1";
    console.log(data);
    let newData = {
      topic: "haiche198/feeds/yolo-led",
      data: data,
    };
    await fetch("http://localhost:5000/api/light/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  }

  const timerRef = useRef();

  async function expensiveCallback(value) {
    setFanVolume(value); // <-- finally update state, or anything else really
    console.log("expensiveCallback", value);
    let newData = {
      topic: "haiche198/feeds/yolo-fan",
      data: String(value),
    };
    await fetch("http://localhost:5000/api/fan/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    }).catch((error) => {
      window.alert(error);
      return;
    });
  }

  async function handleFanChange(e) {
    const { value } = e.target;

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      expensiveCallback(value); // <-- re-enclose latest value
    }, 250); // <-- tune this value to what feels best for you
  }

  useEffect(() => {
    let timer;
    timer = setInterval(() => {
      const sec = new Date().getSeconds();
      if (sec % 6) return;
      if (room.current != null) {
        fetchTemp();
        fetchHumi();
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  async function fetchTemp() {
    const response = await fetch(
      `http://localhost:5000/api/temp/` + "?room=" + room.current
    );

    if (!response.ok) {
      throw new Error('404 not found');
    }

    const record = await response.json();
    setTemp(record.message);
  }

  async function fetchHumi() {
    const response = await fetch(
      `http://localhost:5000/api/humi/` + "?room=" + room.current
    );

    if (!response.ok) {
      throw new Error('404 not found');
    }

    const record = await response.json();
    setHumi(record.message);
  }

  const [device, setDevice] = useState(null);
  const [record, setRecord] = useState([])
  const [nameField, setNameField] = useState("");

  const getData = (device) => {
    if (room.current == null || device == null) setRecord([]);
    getSensorRecords(device);
  }

  function getDataInDay(record) {
    let fullday = record.time.split(',')[0];
    fullday = fullday.split("/");
    let month = fullday[0], day = fullday[1], year = fullday[2];
    const d = new Date();
    if (day == d.getDate() && month == d.getMonth() + 1 && year == d.getFullYear()) return true;
    return false;
  }

  function parseTime(record) {
    let fulltime = record.time.split(',')[1].substring(1);
    let a = fulltime.split(' ');
    let time = a[0], isAM = (a[1] == 'am' || a[1] == 'AM') ? true : false;
    time = time.split(":");
    let hour = time[0], minute = time[1], second = time[2];
    if (isAM) {
      record.time = hour + ":" + + minute + ":" + record;
    }
    else {
      if (parseInt(hour) == 12) {
        record.time = hour + ":" + minute + ":" + second;
      }
      else {
        record.time = (parseInt(hour) + 12) + ":" + minute + ":" + second;
      }
    }
    return record;
  }
 
  async function getSensorRecords(device) {
    let url = 'http://localhost:5000/api/data?room=' + room.current + '&device=' + device;
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

    let data = await response.json();
    console.log(data);
    console.log(data[0].time);
    // data = data.filter(getDataInDay);
    // data = data.map(parseTime);
    // console.log(data);
    setRecord(data.reverse());
  }

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" style={{ margin: MARGIN_LEFT }}>
        <Link underline="hover" color="inherit" href="/">
          Dashboard
        </Link>
        <Autocomplete
          disablePortal
          id="listrooms"
          value={nameRoom}
          onChange={(event, nameRoom) => {
            for (let theRoom of listRooms) {
              if (theRoom.name === nameRoom) {
                room.current = listRooms.indexOf(theRoom);
              }
            }
            if (nameRoom == null) room.current = null;
            setNameRoom(nameRoom);
          }}
          options={listRooms.map((room) => room.name)}
          sx={{ width: 160 }}
          renderInput={(params) => <TextField {...params} label="Chọn phòng" />}
        />
      </Breadcrumbs>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Item sx={{ minHeight: "350px" }}>
              <Box sx={{ position: "relative" }}>
                <Box sx={{display: 'flex'}}>
                  <Box>
                    <p>Biểu đồ dữ liệu</p>
                    <h5>{room.current == null ? room.current : listRooms[room.current].name}</h5>
                  </Box>
                  {room.current != null ? 
                  <>
                    {(listRooms[room.current].devices).filter(device => device.type == 'temp').length > 0 ? 
                    <Button 
                      variant="contained" 
                      sx={{marginLeft: 3, height: '50%'}}
                      onClick={() => {
                        const tempSensor = listRooms[room.current].devices.filter(device => device.type == 'temp')[0];
                        setDevice(listRooms[room.current].devices.indexOf(tempSensor))
                        getData(listRooms[room.current].devices.indexOf(tempSensor))
                        setNameField("Nhiệt độ");
                      }}
                    >
                      Nhiệt độ
                    </Button>
                    : <></> }
                    {(listRooms[room.current].devices).filter(device => device.type == 'humi').length > 0 ?
                    <Button 
                      variant="contained" 
                      sx={{marginLeft: 3, height: '50%'}}
                      onClick={() => {
                        const tempSensor = listRooms[room.current].devices.filter(device => device.type == 'humi')[0];
                        setDevice(listRooms[room.current].devices.indexOf(tempSensor))
                        getData(listRooms[room.current].devices.indexOf(tempSensor))
                        setNameField("Độ ẩm");
                      }}
                    >
                      Độ ẩm
                    </Button>
                    : <></> }
                  </>
                  : <></> }
                </Box>
                <Link href="/history">
                  <Button
                    variant="outlined"
                    sx={{ position: "absolute", top: "0", right: "0" }}
                  >
                    Chi tiết
                  </Button>
                </Link>
              </Box>
              {room.current != null ? 
              <Box
                sx={{
                  width: "100%",
                  height: "200px",
                }}
              >
                <p>{today}</p>
                {device != null ? 
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={record}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis dataKey="time"/>
                    <YAxis yAxisId="left" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="message"
                      stroke="#8884d8"
                      name={nameField}
                    />
                  </LineChart>
                </ResponsiveContainer> : <></> }
              </Box> : <></>}
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item sx={{ minHeight: "350px" }}>
              <h5>
                {time} {today}
              </h5>
              <Box
                sx={{
                  backgroundColor: "#C8CBD9",
                  borderRadius: "10px",
                  padding: "10px",
                  margin: "auto",
                  marginTop: "40px",
                  width: "70%",
                }}
              >
                <p>Nhiệt độ</p>
                <Box
                  sx={{
                    fontSize: "35px",
                    fontWeight: "medium",
                    textAlign: "center",
                  }}
                >
                  {TEMP}°C
                </Box>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#E6E8EC",
                  borderRadius: "10px",
                  padding: "10px",
                  margin: "auto",
                  marginTop: "10px",
                  width: "70%",
                }}
              >
                <p>Độ ẩm</p>
                <Box
                  sx={{
                    fontSize: "35px",
                    fontWeight: "medium",
                    textAlign: "center",
                  }}
                >
                  {HUMI}%
                </Box>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ marginLeft: MARGIN_LEFT, display: "flex" }}>
              <h6>Thiết bị và Cảm biến</h6>
            </Box>
          </Grid>

          <Grid item xs={4}>
            <Item>
              <p>Đèn</p>
              {room.current != null ? (
                listRooms[room.current].devices
                  .filter((device) => device.type == "light")
                  .map((light) => (
                    <Box key={light.name}>
                      <Box
                        sx={{
                          marginTop: "10px",
                          display: "flex",
                          position: "relative",
                          borderBottom: "1px solid #DBE5EB",
                        }}
                      >
                        <img
                          src={LightIcon}
                          alt=""
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "180%",
                            marginRight: "10px",
                            boxShadow: "0px 5px 25px -5px rgba(0,0,0,0.75)",
                          }}
                        />
                        <p style={{ marginTop: "4px" }}>{light.name}</p>
                        <Switch
                          checked={lightValue}
                          sx={{ position: "absolute", right: "0" }}
                          onChange={(e) => {
                            onChangeLight(e);
                          }}
                        />
                      </Box>
                    </Box>
                  ))
              ) : (
                <></>
              )}
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <p>Máy lạnh và quạt</p>
              {room.current != null ? (
                listRooms[room.current].devices
                  .filter((device) => device.type == "fan")
                  .map((fan) => (
                    <Box key={fan.name}>
                      <Box
                        sx={{
                          marginTop: "10px",
                          display: "flex",
                          position: "relative",
                          borderBottom: "1px solid #DBE5EB",
                        }}
                      >
                        <img
                          src={FanIcon}
                          alt=""
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "180%",
                            marginRight: "10px",
                            boxShadow: "0px 5px 25px -5px rgba(0,0,0,0.75)",
                          }}
                        />
                        <p style={{ marginTop: "4px" }}>{fan.name}</p>
                        {/* <Switch sx={{ position: "absolute", right: "0" }} /> */}
                        <Slider
                          aria-label="Temperature"
                          value={fanVolume}
                          valueLabelDisplay="auto"
                          step={25}
                          marks
                          min={0}
                          max={100}
                          sx={{
                            position: "absolute",
                            right: "0",
                            width: "60%",
                          }}
                          onChange={handleFanChange}
                        />
                      </Box>
                    </Box>
                  ))
              ) : (
                <></>
              )}
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <p>Cảm biến</p>
              {room.current != null ? (
                listRooms[room.current].devices
                  .filter(
                    (device) => device.type == "temp" || device.type == "humi"
                  )
                  .map((sensor) => (
                    <Box key={sensor.name}>
                      <Box
                        sx={{
                          marginTop: "10px",
                          display: "flex",
                          position: "relative",
                          borderBottom: "1px solid #DBE5EB",
                        }}
                      >
                        <img
                          src={SensorIcon}
                          alt=""
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "180%",
                            marginRight: "10px",
                            boxShadow: "0px 5px 25px -5px rgba(0,0,0,0.75)",
                          }}
                        />
                        <p style={{ marginTop: "4px" }}>{sensor.name}</p>
                      </Box>
                    </Box>
                  ))
              ) : (
                <></>
              )}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
export default Dashboard;
