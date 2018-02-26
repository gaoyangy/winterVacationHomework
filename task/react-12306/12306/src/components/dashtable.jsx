import React, {Component} from 'react'
import FontIcon from 'material-ui/FontIcon'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'

const timeIcon = <FontIcon><i className="material-icons" style={{color: '#2E86C1'}}>av_timer</i></FontIcon>
const headsetIcon = <FontIcon><i className="material-icons" style={{color: '#28B463'}}>headset_mic</i></FontIcon>
const phoneIcon = <FontIcon><i className="material-icons" style={{color: '#F39C12'}}>settings_phone</i></FontIcon>
const carIcon = <FontIcon><i className="material-icons" style={{color: '#EC7063'}}>local_taxi</i></FontIcon>

/**
 * 车票查询页面顶部菜单
 */
class dashtable extends Component {
  state = {
    selectedIndex: -1
  }


  render() {
    return (
      <MuiThemeProvider>
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="正晚点"
            icon={timeIcon}
          />
          <BottomNavigationItem
            label="温馨服务"
            icon={headsetIcon}
          />
          <BottomNavigationItem
            label="订餐服务"
            icon={phoneIcon}
          />
          <BottomNavigationItem
            label="约车"
            icon={carIcon}
          />
        </BottomNavigation>
      </Paper>
      </MuiThemeProvider>
    )
  }
}

export default dashtable
