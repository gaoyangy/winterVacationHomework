import React from 'react';
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import NavBar from '../components/Navbar'
import Alert from '../components/logindialog'
import history from '../components/history'
import { loginin } from '../actions'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

/*
*登陆页面
*
*/

const style = {
  margin: '5%',
  width: '40%'
}
class login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: '',
      password: '',
      alerttext: '',
      open: false,
      loginlabel: '登陆',
      signinlabel: '注册',
      rememberchecked: false,
      autologinchecked: false,
    }
  }
  updateCheck() {
    this.setState((oldState) => {
      return {
        rememberchecked: !oldState.rememberchecked
      }
    })
  }
  updateautoCheck() {
    this.setState((oldState) => {
      return {
        autologinchecked: !oldState.autologinchecked
      }
    })
  }
  componentWillMount() {
    if(cookies.get('autologinchecked') === 'true') {
      if(cookies.get('flag') === '1') {
        this.fetchlogin(cookies.get('12306user'), cookies.get('12306password'))
      }
    }
  }
  componentDidMount() {
      if(cookies.get('rememberchecked') === 'true') {
          this.setState({
            user: cookies.get('12306user'),
            password: cookies.get('12306password'),
            rememberchecked: true
          })
          if(cookies.get('autologinchecked') === 'true') {
              this.setState({
                autologinchecked: true
              })
            }
            else {
              this.setState({
                autologinchecked: false
              })
            }
          }
      else {
        this.setState({
          rememberchecked: false
        })
      }
  }
    /*登陆时调用函数*/
  fetchlogin = async(user, pwd) => {
    try {
      this.setState({
        loginlabel: '登陆中...'
      })
      let myInit = { method: 'POST',
             cache: 'default',
             body: JSON.stringify({username:user, password:pwd}),
             headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           } }
      let res = await fetch('http://localhost:5000/post', myInit)

      // 等待 parse json
      let data = await res.json()
      let loginmessage = data.message
      if(loginmessage === 1) {
        console.log("success")
        if(this.state.rememberchecked) {
          cookies.set('12306user', this.state.user)
          cookies.set('12306password', this.state.password)
          cookies.set('rememberchecked', true)
        }
        else {
          cookies.set('12306user', '')
          cookies.set('12306password', '')
          cookies.set('rememberchecked', false)
        }
        if(this.state.autologinchecked) {
          cookies.set('autologinchecked', true)
          cookies.set('flag', 1)
        }
        else {
          cookies.set('autologinchecked', false)
        }
        this.props.dispatch(loginin(this.state.user))
        history.push('/record')
       }
       else {
         console.log("error")
         this.setState({
           alerttext: '账号或密码错误',
           open: true,
           user: '',
           password: ''
         })
       }
    }
    catch(e) {
      console.log(e)
    }
  }
  /*注册时调用函数*/
  fetchsignin = async(user, pwd) => {
    try {
      this.setState({
        signinlabel: '注册中...'
      })
      let myInit = { method: 'POST',
             cache: 'default',
             body: JSON.stringify({id:user, password:pwd}),
             headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           } }
      let res = await fetch('http://localhost:5000/signin', myInit)

      // 等待 parse json
      let data = await res.json()
      let signinmessage = data.message
      if(signinmessage === 1) {
        console.log("success")
        if(this.state.rememberchecked) {
          cookies.set('12306user', this.state.user)
          cookies.set('12306password', this.state.password)
          cookies.set('rememberchecked', true)
        }
        else {
          cookies.set('12306user', '')
          cookies.set('12306password', '')
          cookies.set('rememberchecked', false)
        }
        if(this.state.autologinchecked) {
          cookies.set('autologinchecked', true)
          cookies.set('flag', 1)
        }
        else {
          cookies.set('autologinchecked', false)
        }
        this.props.dispatch(loginin(this.state.user))
        history.push('/record')
       }
       else {
         console.log("error")
         this.setState({
           alerttext: '注册失败!该用户已注册',
           open: true,
           user: '',
           password: ''
         })
       }
    }
    catch(e) {
      console.log(e)
    }
  }
  /*账号输入框变化时触发*/
  handleChange = (event) => {
      this.setState({
        user: event.target.value,
      })
  }
  /*密码输入框变化时触发*/
  handlepasswordChange = (event) => {
      this.setState({
        password: event.target.value,
      })
  }
  /*对输入框内容进行验证*/
  test = (func) => {
    let pattern = /^[1]{1}[0-9]{10}$/
    if(pattern.test(this.state.user)) {
      if(this.state.password === '') {
        this.setState({
          alerttext: '请输入密码',
          open: true
        })
      }
      else {
        func(this.state.user, this.state.password)
      }
    }
    else {
      this.setState({
        alerttext: '请输入正确的手机号码',
        open: true,
        user: '',
        password: ''
      })
    }
  }
  /*登陆时触发事件*/
  loginin = (e) => {
    this.test(this.fetchlogin)
  }
  /*注册时触发事件*/
  signin = (e) => {
    this.test(this.fetchsignin)
  }
  /*弹出框关闭*/
  handleClose = () => {
    this.setState({
      open: false,
      loginlabel: '登陆',
      signinlabel: '注册'
    })
  }
  render(props) {
    return (
      <div>
        <NavBar title="用户登录" />
        <MuiThemeProvider>
        <div>
        <TextField
          hintText="手机号"
          floatingLabelText="请输入账号"
          fullWidth={true}
          value={this.state.user}
          onChange={this.handleChange}
        />
        <TextField
          hintText="密码"
          type="password"
          floatingLabelText="请输入密码"
          fullWidth={true}
          value={this.state.password}
          onChange={this.handlepasswordChange}
        />
        <Checkbox
          label="记住密码"
          checked={this.state.rememberchecked}
          onCheck={this.updateCheck.bind(this)}
          style={{float: 'left', width: '40%', marginLeft: '5%', marginTop: '1rem'}}
        />
        <Checkbox
          label="自动登录"
          checked={this.state.autologinchecked}
          onCheck={this.updateautoCheck.bind(this)}
          style={{float: 'left', width: '40%', marginTop: '1rem'}}
        />
        <RaisedButton label={this.state.signinlabel} primary={true} style={style} onClick={this.signin}/>
        <RaisedButton label={this.state.loginlabel} primary={true} style={style} onClick={this.loginin}/>
        <Alert handleClose={this.handleClose} open={this.state.open} text={this.state.alerttext}/>
        </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
export default connect()(login)
