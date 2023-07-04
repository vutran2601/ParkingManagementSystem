import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Breadcrumbs,
  Box,
  Card,
  CardContent,
  CardMedia,
  Modal,
  TextField,
  Grid,
  Link
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Dropdown } from 'react-bootstrap';
import Logo from '../../assets/images/logo.png';
import { useForm } from 'react-hook-form';

function Rooms() {
  const { register, getValues, setValue } = useForm();
  const [listRooms, setListRooms] = useState([]);

  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {
    setValue("name","");
    setValue("desc","");
    setOpenAdd(false);
  }
  function handleSubmitAdd(event) {
    setOpenAdd(false);
    let name = getValues().name;
    let desc = getValues().desc;
    setValue("name","")
    setValue("desc","")
    event.preventDefault();
    fetch('http://localhost:5000/api/room', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, desc })
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error adding data:', error);
      });
    let newRoom = {
      "name": name,
      "desc": desc,
      "devices": []
    }
    listRooms.push(newRoom);
  }

  // Fetch list rooms
  useEffect(() => {
    fetchListRooms();
  }, []);

  async function fetchListRooms() {
    // const response = fetch("http://localhost:5000/rooms");
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

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = (e) => {
    setOpenEdit(true);
    let index = e.target.getAttribute("index");
    setValue("index", index);
    setValue("name", listRooms[index].name);
    setValue("desc", listRooms[index].desc);
  }
  const handleCloseEdit = () => setOpenEdit(false);
  const handleSubmitEdit = (event) => {
    setOpenEdit(false);
    let room = getValues().index;
    let name = getValues().name;
    let desc = getValues().desc;
    setValue("room", {});
    setValue("name", "");
    setValue("desc", "");
    event.preventDefault();
    fetch('http://localhost:5000/api/room', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ room, name, desc })
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error adding data:', error);
      });
    let editedRoom = {
      "name": name,
      "desc": desc,
      "devices": listRooms[room].devices
    };
    let newListRooms = listRooms;
    newListRooms[room] = editedRoom;
    setListRooms(newListRooms);
  }

  function handleDelete(event) {
    let room = event.target.getAttribute("index");
    event.preventDefault();
    fetch('http://localhost:5000/api/room', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ room })
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error adding data:', error);
      });
    let theRoom = listRooms[room];
    setListRooms(listRooms.filter(Room => Room !== theRoom));
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  function AddRoomBox() {
    return (
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" sx={{paddingBottom: '10px'}}>
            Thông tin phòng mới
          </Typography>
          <Typography variant="h6">
            Tên phòng
          </Typography>
          <TextField
            id="outlined-multiline-flexible"
            multiline
            maxRows={2}
            sx={{width: '100%', paddingBottom: '10px'}}
            {...register("name")}
          />
          <Typography variant="h6">
            Mô tả
          </Typography>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={10}
            sx={{width: '100%'}}
            {...register("desc")}
          />
          <Grid container spacing={2} sx={{marginTop: '10px'}}>
            <Grid item xs={4}></Grid>
            <Grid item xs={2}>
              <Button 
                variant='contained' 
                sx={{
                  background: '#A4B0B6',
                  '&:hover': {
                    background: '#A4B0B6'
                  }
                }}
                onClick={handleCloseAdd}
              >
                Hủy bỏ
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant='contained' onClick={handleSubmitAdd} sx={{backgroundColor: '#6C63FF'}}>
                Xác nhận
              </Button>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Box>
      </Modal>
    )
  }
  function EditRoomBox() {
    return (
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" sx={{paddingBottom: '10px'}}>
            Cập nhật thông tin phòng
          </Typography>
          <Typography variant="h6">
            Tên phòng
          </Typography>
          <TextField
            id="outlined-multiline-flexible"
            multiline
            maxRows={2}
            sx={{width: '100%', paddingBottom: '10px'}}
            {...register("name")}
          />
          <Typography variant="h6">
            Mô tả
          </Typography>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={10}
            sx={{width: '100%'}}
            {...register("desc")}
          />
          <Grid container spacing={2} sx={{marginTop: '10px'}}>
            <Grid item xs={4}></Grid>
            <Grid item xs={2}>
              <Button 
                variant='contained' 
                sx={{
                  background: '#A4B0B6',
                  '&:hover': {
                    background: '#A4B0B6'
                  }
                }}
                onClick={handleCloseEdit}
              >
                Hủy bỏ
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant='contained' sx={{backgroundColor: '#6C63FF'}} onClick={handleSubmitEdit}>
                Xác nhận
              </Button>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Box>
      </Modal>
    )
  }
  function ListRooms() {
    return(listRooms.map((room) => (
      <Card sx={{ display: 'flex', margin: 4, boxShadow: '1px 1px 1px 1px grey', position: 'relative' }}>
        <Link href={window.location.href + '/' + listRooms.indexOf(room) +'/devices'} sx={{ textDecoration: 'none', display: 'flex' }}>
          <CardMedia
            component="img"
            sx={{ width: 120 }}
            image={Logo}
            alt="Live from space album cover"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h6" sx={{ color: '#6C63EF' }}>
                {room.name}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" component="div">
                {room.desc}
              </Typography>
            </CardContent>
          </Box>
        </Link>
        <Dropdown style={{position: 'absolute', right: 0}}>
          <Dropdown.Toggle variant="primary" id="dropdown-basic" size="sm" style={{backgroundColor: '#6C63FF'}}/>
          <Dropdown.Menu>
            <Dropdown.Item
              index={listRooms.indexOf(room)} 
              onClick={handleOpenEdit}
            >
              Chỉnh sửa
            </Dropdown.Item>
            <Dropdown.Item
              index={listRooms.indexOf(room)}
              onClick={handleDelete}
            >
              Xóa
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card>
    )))
  }
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" style={{ margin: '20px' }}>
        <Typography color="text.primary">Danh sách phòng</Typography>
      </Breadcrumbs>
      <Button variant="contained" sx={{marginLeft: 2, backgroundColor: '#6C63FF'}} startIcon={<AddIcon />} onClick={handleOpenAdd}>
        Tạo phòng mới
      </Button>
      <AddRoomBox />
      <EditRoomBox />
      <ListRooms />
    </>
  );
}
export default Rooms;