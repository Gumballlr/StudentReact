
import React,{useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper } from '@mui/material';
import Button from '@mui/material/Button';

export default function Students() {

    const style = {padding:'50px 50px', width: 1000, margin:"20 px auto"}
     //            name , address
    const[name,setName] = useState('')
    const[address,setAddress]=useState('')
    const[students,setStudents]=useState([])

   
    //        Them
    const handleClick=(e)=>{
        e.preventDefault()
        const student ={name, address}
        console.log(student)

        fetch("http://localhost:8080/student/add",{

        method:"POST",
        headers:{"Content-Type":"application/json"},   
        body:JSON.stringify(student) 
    }  ).then(()=>{
            console.log("Thêm thành công")
        })
    }
    
      ////           danh sach
    useEffect(()=>{
        fetch("http://localhost:8080/student/getAll")
        .then(res=>res.json())
        .then((result)=>{
          setStudents(result);
        }
        )
        },[])
  
  return (

    <Container>
    <Paper elevation={3} style={style}>
            <h2>Thêm người dùng</h2>
    <Box 
    
    

      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Họ tên" variant="outlined" fullWidth
      value ={name}
      onChange={(e) =>setName(e.target.value) }
    />
      <TextField id="outlined-basic" label="Địa chỉ" variant="outlined" fullWidth
      value ={address}
      onChange={(e)=>setAddress(e.target.value) } 
      
      />
  <Button variant="contained" onClick={handleClick} >Thêm</Button>
  {/* <Button variant="contained" onClick={handleClick} >Reset</Button> */}
    </Box>
     
   
   </Paper>    
  
  

<Paper elevation={3} style={style}>
<h2>Danh sách</h2>

  {students.map(student=>(
    <Paper elevation={6} style={{margin:"20px",padding:"25px", textAlign:"center"}} key={student.id} >
     Id:       {student.id}<br/>
     Name:     {student.name}<br/>
     Address:  {student.address}

    </Paper>
  ))}
</Paper>

   </Container>
  );
}
