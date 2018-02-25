import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../components/Navbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import Right from 'material-ui/svg-icons/hardware/keyboard-arrow-right'
import history from '../components/history'
import { loginout } from '../actions'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

/*
*用户信息页面
*
*/

class user extends React.Component {
  render(props) {
    const user = [
      {
        text: '常用联系人',
        url: ''
      },
      {
        text: '送票地址',
        url: ''
      },
      {
        text: '个人资料',
        url: ''
      },
      {
        text: '密码修改',
        url: ''
      },
      {
        text: '邮箱修改',
        url: ''
      },
    ]
    return (
      <div>
        <NavBar title={this.props.login} />
        <MuiThemeProvider>
          <div>
            <List>
              {user.map(data =>
                <ListItem key={data.text} primaryText={data.text} rightIcon={<Right />} />
              )}
            </List>
            <RaisedButton label="退出当前用户" primary={true} style={{width: '90%', margin: '0 5%'}}
              onClick={() => {
                this.props.dispatch(loginout('666'))
                cookies.set('flag', 0)
                history.push('/login')
              }}/>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
function select(state) {
  return {
    login: state.login
  }
}
export default connect(select)(user)
