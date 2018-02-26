import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import FontIcon from 'material-ui/FontIcon'
import history from '../components/history'
/*
*
*车站列表
*/
const timeIcon = <FontIcon><i className="material-icons" style={{color: '#2E86C1'}}>av_timer</i></FontIcon>
const list = ['北京', '上海', '天津', '重庆', '成都', '长春']
export default class sitelist extends React.Component {
  handleClick(index) {
    this.props.onsiteclick(list[index])
    history.push('/')
  }
  render() {
    return(
      <MuiThemeProvider>
       <div>
          <List>
            <Subheader>热点车站</Subheader>
            {list.map((site, index) =>
              <ListItem primaryText={site} key={index} leftIcon={timeIcon} onClick={() => this.handleClick(index)} />
            )}
          </List>
          <Divider />
        </div>
      </MuiThemeProvider>
    )
  }
}
