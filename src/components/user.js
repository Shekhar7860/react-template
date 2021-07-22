import Layout from "./Layout";
import React, {useEffect} from 'react'
import Header from "./Header";
import Sidebar from "./Sidebar";
import Tables from '../pages/tables/Tables'
import useStyles from "./Header/styles";

const User = (props) => {
	var classes = useStyles();
	useEffect(() => {
    
	}, [])
	return (<div className='inputRoot'>
		<Header history={props.history} title={'Signity Solutions'}/>
          <Sidebar/>
          <div style={{flexGrow: 1,
    width: `calc(100vw - 300px)`,
    minHeight: "100vh", 
    marginTop : 40}}>
		<Tables/>
		</div></div>)
}

export default User;