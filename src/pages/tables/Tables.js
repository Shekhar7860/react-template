import React, {useEffect, useState} from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";
import CustomToolbar from "./CustomToolbar";
// data
import mock from "../dashboard/mock";
 import { TextField, Button} from '@material-ui/core'



const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Tables() {
  const [user, setUser] = useState({
    name: '',
    company: '',
    city: '',
    state : ''
  });
  const [editing, setEditing] = useState(false)
  const [selectedIndex, setIndex] = useState(-1)
   const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  };

 const options = {
      filter: true,
      selectableRows: 'multiple',
      filterType: 'dropdown',
      responsive: 'vertical',
      rowsPerPage: 10
    };
  const [users, setUsers] = useState([
  ["Joe James", "Example Inc.", "Yonkers", "NY"],
  ["John Walsh", "Example Inc.", "Hartford", "CT"],
  ["Bob Herm", "Example Inc.", "Tampa", "FL"],
  ["James Houston", "Example Inc.", "Dallas", "TX"],
  ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
  ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
  ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
  ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
  ["Meral Elias", "Example Inc.", "Hartford", "CT"],
  ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
  ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
  ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
  ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
  ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
  ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
  ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
  ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
])
   const addUser = () => {
    let array = []
    if(user.name && user.company && user.city && user.state){
      const newUser = [...users]
      if(editing == false)
      {
      array[0] = user.name
      array[1] = user.company
      array[2] = user.city 
      array[3] = user.state
      newUser.push(array)
      setUsers(newUser)
    }
    else {
      array[0] = user.name
      array[1] = user.company
      array[2] = user.city 
      array[3] = user.state
      newUser[selectedIndex] = array
    }
     setUsers(newUser)
    }
  }
const editData = (value, data) => {
if(data.rowData.length != 0){
  setIndex(data.rowIndex)
  setEditing(true)
  setUser({
    name : data.rowData[0],
    company : data.rowData[1],
    city : data.rowData[2],
    state : data.rowData[3]
  })
}

}

const deleteData = (value, data) => {
   var array = [...users]; // make a separate copy of the array
  if (data.rowIndex !== -1) {
    array.splice(data.rowIndex, 1);
    setUsers(array)
  }
}
  const classes = useStyles();
  return (
    <>

      <PageTitle title="Users" />
      <div className='row-data'>
      <TextField className='margin-down' type="text" name="name" placeholder="Name" onChange={handleChange} value={user.name}/>
      <span className='emptyWidth'></span>
      <TextField className='margin-down' type="text" name="company" placeholder="Company" onChange={handleChange} value={user.company}/>
      </div>
      <div className='row-data'>
      <TextField className='margin-down' type="text" name="city" placeholder="City" onChange={handleChange} value={user.city}/>
      <span className={'emptyWidth'}></span>
      <TextField className='margin-down' type="text" name="state" placeholder="State" onChange={handleChange} value={user.state}/>
      </div>
      <Button style={{marginTop : 20}} type="submit" onClick={addUser}>{editing == false ? 'Add' : 'Update'} User</Button>
      <Grid container spacing={4} style={{marginTop : 10}}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Employee List"
            data={users}
            columns={["Name", "Company", "City", "State",  {
    label: "Actions",
    options: {
        customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <>
                <EditIcon onClick={() => editData(value, tableMeta)}/>
                <DeleteIcon onClick={() => deleteData(value, tableMeta)}/>
                </>
            )
        }
    }
}]}
            options={options}
          />
        </Grid>
        <Grid item xs={12}>
          <Widget title="Material-UI Table" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            <Table data={mock.table} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
