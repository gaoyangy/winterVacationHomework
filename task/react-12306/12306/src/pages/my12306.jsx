import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../components/Navbar'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Badge from 'material-ui/Badge'
import Right from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import history from '../components/history'

/*
*12306页面
*
*/

class my12306 extends React.Component {
  user = () => {
    if(this.props.login === '未登录') {
      history.push('/login')
    }
    else {
      history.push('/user')
    }
  }
  render(props) {
    return (
      <div>
        <NavBar title="我的12306" />
        <List>
          <ListItem primaryText={this.props.login} rightIcon={<Right />} onClick={this.user}/>
          <ListItem primaryText="手机检验" rightIcon={<Right />} />
          <ListItem primaryText="我的保险" rightIcon={<Right />} />
          <ListItem primaryText="我的订餐" rightIcon={<Right />} />
        </List>
        <Divider />
        <List>
          <ListItem primaryText="出行向导" rightIcon={<Right />} />
        </List>
        <Divider />
        <List>
          <ListItem primaryText="基础数据更新" rightIcon={
            <Badge
              badgeContent={1}
              secondary={true}
              ></Badge>} />

          <ListItem primaryText="系统通知" rightIcon={<Right />} />
          <ListItem primaryText="关于" rightIcon={<Right />} />
        </List>
      </div>
    )
  }
}
function select(state) {
  return {
    login: state.login
  }
}
export default connect(select)(my12306)
