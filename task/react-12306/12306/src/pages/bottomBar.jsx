import React, {Component} from 'react'
import {
  Router,
  Route,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import FontIcon from 'material-ui/FontIcon'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import history from '../components/history'
import Order from './order'
import Serve from './serve'
import Record from './record'
import My from './my12306'
const noIcon = <FontIcon></FontIcon>

/**
 *底部导航栏
 */
class bottomBar extends Component {
  state = {
    selectedIndex: 0,
  }

  select = (index) => this.setState({selectedIndex: index})

  render() {
    return (
    <Router history={history}>
    <MuiThemeProvider>
    <div style={{zIndex: '1000'}}>
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex} style={{position: 'fixed', bottom: '0'}}>
          <BottomNavigationItem
            label="车票预定"
            icon={noIcon}
            onClick={() => {
              this.select(0)
              history.push('/')
            }}
          />
          <BottomNavigationItem
            label="商旅服务"
            icon={noIcon}
            onClick={() => {
              this.select(1)
              history.push('/serve')
            }}
          />
          <BottomNavigationItem
            label="订单查询"
            icon={noIcon}
            onClick={() => {
              if(this.props.login === '未登录') {
                history.push('/login')
              }else{
                this.select(2)
                history.push('/record')
              }
            }}
          />
          <BottomNavigationItem
            label="12306"
            icon={noIcon}
            onClick={() => {
              this.select(3)
              history.push('/my12306')
            }}
          />
        </BottomNavigation>
      </Paper>
      <div>
      <Switch>
      <Route exact path="/" component={Order}/>
      <Route exact path="/serve" component={Serve}/>
      <Route exact path="/record" component={Record}/>
      <Route exact path="/my12306" component={My}/>
      </Switch>
      </div>
      </div>
      </MuiThemeProvider>
      </Router>
    )
  }
}
function select(state) {
  return {
    login: state.login
  }
}
export default connect(select)(bottomBar)
