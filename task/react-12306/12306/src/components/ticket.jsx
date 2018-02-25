import React, {Component} from 'react'
import { connect } from 'react-redux'
import FontIcon from 'material-ui/FontIcon'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import Checkbox from 'material-ui/Checkbox'
import { setStartSite, setEndSite } from '../actions'
import history from '../components/history'

/*
*车票查询表单
*
*/

const reverseIcon = <FontIcon><i className="material-icons" style={{color: '#2E86C1'}}>autorenew</i></FontIcon>
const noIcon = <FontIcon></FontIcon>


class ticket extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: -1,
      date: new Date()
      }
  }

  handleChange = (event, index, value) => this.setState({value})
  reverse = () => {
    let temp = this.props.startsite;
    this.props.dispatch(setStartSite(this.props.endsite))
    this.props.dispatch(setEndSite(temp))
  }

  render() {
    const start = <span style={{fontSize: '120%', color: '#333'}}>{this.props.startsite}</span>
    const end = <span style={{fontSize: '120%', color: '#333'}}>{this.props.endsite}</span>
    return (
      <MuiThemeProvider>
      <div>
      <Paper zDepth={1}>

        <BottomNavigation selectedIndex={this.state.selectedIndex} style={{marginTop: '.1rem'}}>
          <BottomNavigationItem
            label={start}
            icon={noIcon}
            onClick={this.props.onleftclick}
          />
          <BottomNavigationItem
            icon={reverseIcon}
            onClick={this.reverse}
          />
          <BottomNavigationItem
            label={end}
            icon={noIcon}
            onClick={this.props.onrightclick}
          />
        </BottomNavigation>
      </Paper>
      <DatePicker hintText="出发日期" style={{margin: '0 5%'}} defaultDate={this.state.date} floatingLabelText="出发日期"/>
      <TimePicker hintText="出发时间" autoOk={true} style={{margin: '0 5%'}} defaultTime={this.state.date} floatingLabelText="出发时间"/>
      <Checkbox
        label="学生票"
        style={{margin: '5%', width: '90%'}}
      />
      <RaisedButton label="查 询" primary={true} style={{width: '90%', margin: '0 5%'}}
        onClick={() => history.push('/train')}/>
      </div>
      </MuiThemeProvider>
    )
  }
}
function select(state) {
  return {
    startsite: state.startsite,
    endsite: state.endsite
  }
}
export default connect(select)(ticket)
