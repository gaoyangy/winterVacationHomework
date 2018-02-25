import React from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {List, ListItem} from 'material-ui/List'
import ContentInbox from 'material-ui/svg-icons/content/inbox'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import ContentSend from 'material-ui/svg-icons/content/send'
import ContentDrafts from 'material-ui/svg-icons/content/drafts'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
// import ActionInfo from 'material-ui/svg-icons/action/info'
import NavBar from '../components/Navbar'
import Tooltip from '../components/tooltip'
import history from '../components/history'

class pay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tooltip: false,
      tipmessage: ''
      }
  }
  fetchinsert = async(i, n, t, m, y) => {
    try {
      let myInit = { method: 'POST',
             cache: 'default',
             body: JSON.stringify({id:i, number:n, title:t, time:m, type:y}),
             headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           } }
      let res = await fetch('http://localhost:5000/insertrecord', myInit)

      // 等待 parse json
      let data = await res.json()
      console.log(data.message)
      if(data.message === 1) {
        this.setState({
          tooltip: true,
          tipmessage: '购买成功'
        })
      }
      else{
        this.setState({
          tooltip: true,
          tipmessage: '购买失败'
        })
      }
    }
    catch(e) {
      console.log(e)
    }

  }
  handleClick() {
    if(this.props.login === '未登录') {
      history.push('/login')
    }
    else {
      let m = this.props.trainpay
      this.fetchinsert(this.props.login, m.number, m.title, m.time, m.type)
    }
  }
  handleRequestClose = () => {
    this.setState({
      tooltip: false
    })
  }
  render(props) {
    return (
      <div>
        <NavBar title="购买车票" />
        <MuiThemeProvider>
        <div>
        <List>
          <ListItem primaryText={this.props.trainpay.number} leftIcon={<ContentInbox />} />
          <ListItem primaryText={this.props.trainpay.title} leftIcon={<ActionGrade />} />
          <ListItem primaryText={this.props.trainpay.time} leftIcon={<ContentSend />} />
          <ListItem primaryText={<span>余票：{this.props.trainpay.ticket}</span>} leftIcon={<ContentDrafts />} />
        </List>
        <Divider />
        <RaisedButton label="购 买" primary={true} style={{width: '90%', margin: '10% 5%'}}
          onClick={() => this.handleClick()}/>
        <Tooltip open={this.state.tooltip} message={this.state.tipmessage} onRequestClose={this.onRequestClose} />
        </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

function select(state) {
  return {
    trainpay: state.trainpay,
    login: state.login
  }
}
export default connect(select)(pay)
