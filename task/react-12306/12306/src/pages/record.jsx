import React from 'react'
import { connect } from 'react-redux'
import {Tabs, Tab} from 'material-ui/Tabs'
import {List, ListItem} from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon'
import Refresh from '../components/refresh'
import Tooltip from '../components/tooltip'
import Alert from '../components/dialog'

/*
*订单记录页面
*
*/

const carIcon = <FontIcon><i className="material-icons" style={{color: '#EC7063'}}>train</i></FontIcon>
class record extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'a',
      open: false,
      index: 0,
      list: [],
      state: 'loading',
      display: 'block',
      tooltip: false,
      tipmessage: ''
    }
  }
  componentDidMount() {
    this.fetchrecord()
  }
  fetchrecord = async() => {
    try {
      this.setState({
        state: 'loading',
        display: 'block'
      })
      let myInit = { method: 'POST',
             cache: 'default',
             body: JSON.stringify({id:this.props.login}),
             headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           } }
      let res = await fetch('http://localhost:5000/record', myInit)
      // 等待 parse json
      let data = await res.json()
      let list = data
      this.setState({
        state: 'hide',
        display: 'none'
      })
      if(list.length > 0) {
        console.log("success")
       }
       else {
         console.log("none")
       }
       this.setState({
         list: list
       })
    }
    catch(e) {
      console.log(e)
    }
  }
  fetchremove = async() => {
    try {
      let record = this.state.list.filter(list => list.state === 1)[this.state.index].id
      console.log(record)
      let myInit = { method: 'POST',
             cache: 'default',
             body: JSON.stringify({id:this.props.login,recordid:record}),
             headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           } }
      let res = await fetch('http://localhost:5000/removerecord', myInit)
      // 等待 parse json
      let data = await res.json()
      this.setState({
        list: data,
        tooltip: true,
        tipmessage: '退票成功'
      })
    }
    catch(e) {
      console.log(e)
    }
  }
  handleClose = () => {
    this.setState({
      open: false,
      tooltip: false,
      tipmessage: ''
    })
  }

  confirm = () => {
    this.fetchremove()
    this.handleClose()
  }
  handleChange = (value) => {
    this.setState({
      value: value,
      tooltip: false,
      tipmessage: ''
    })
  }

  handleClick(index) {
    this.setState({
      index: index,
      open: true,
      tooltip: false,
      tipmessage: ''
    })
  }
  handleRequestClose = () => {
    this.setState({
      tooltip: false
    })
  }
  render(props) {
    return (
      <div style={{marginBottom: '2.5rem'}}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          >
          <Tab label="全部订单" value="a">
            <List>
            <Refresh state={this.state.state} display={this.state.display}/>
            <List style={{marginBottom: '1rem'}}>
              {this.state.list.map((site, index) =>
                <ListItem primaryText={site.number}
                          key={index}
                          secondaryText={
                                <p>
                                  <span style={{color: '#333'}}>{site.title}</span>
                                  <span style={{color: 'red', marginLeft: '.4rem', fontSize: '80%'}}>
                                  {site.state > 0 ? "订单进行中" : "已退票"}
                                  </span><br />
                                  {site.time}

                                </p>
                              }
                          secondaryTextLines={2}
                          rightIcon={carIcon}
                />
              )}
            </List>
            </List>
          </Tab>
          <Tab label="未完成订单" value="b">
            <div>
              <Refresh state={this.state.state} display={this.state.display}/>
              <List style={{marginBottom: '1rem'}}>
                {this.state.list.filter(list => list.state === 1).map((site, index) =>
                  <ListItem primaryText={site.number}
                            key={index}
                            secondaryText={
                                  <p>
                                    <span style={{color: '#333'}}>{site.title}</span><br />
                                    {site.time}
                                  </p>
                                }
                            secondaryTextLines={2}
                            rightIcon={carIcon}
                            onClick={() => this.handleClick(index)}
                  />
                )}
              </List>
            </div>
          </Tab>
        </Tabs>
        <Tooltip open={this.state.tooltip} message={this.state.tipmessage} onRequestClose={this.onRequestClose} />
        <Alert handleClose={this.handleClose} confirm={this.confirm} open={this.state.open} text="确定退票?"/>
      </div>
    )
  }
}
function select(state) {
  return {
    login: state.login
  }
}
export default connect(select)(record)
