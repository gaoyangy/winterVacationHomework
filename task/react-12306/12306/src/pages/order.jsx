import React from 'react';
import NavBar from '../components/Navbar'
import DashTable from '../components/dashtable'
import Ticket from '../components/ticket'
import history from '../components/history'

/*
*
*车票预定页面
*/

export default class order extends React.Component {
  render(props) {
    return (
      <div>
        <NavBar title="车票预定" />
        <DashTable />
        <Ticket onleftclick={() => (history.replace('/site'))}
          onrightclick={() => (history.replace('/endsite'))}/>
      </div>
    );
  }
}
