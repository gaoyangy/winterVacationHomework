import React, {Component} from 'react'
import { connect } from 'react-redux'
import FontIcon from 'material-ui/FontIcon'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'
import NavBar from '../components/Navbar'
// import Alert from '../components/dialog'
import Refresh from '../components/refresh'
// import Tooltip from '../components/tooltip'
import history from '../components/history'
import {List, ListItem} from 'material-ui/List'
import {trainpay} from '../actions'

/*
*车次信息页面
*
*/

const noIcon = <FontIcon></FontIcon>
const carIcon = <FontIcon><i className="material-icons" style={{color: '#EC7063'}}>train</i></FontIcon>

class train extends Component {
  state = {
    selectedIndex: 0,
    filter: 'all',
    list: [],
    state: 'loading',
    display: 'block',
  }
  componentDidMount() {
    this.fetchGank()
  }
  fetchGank = async() => {
    try {
      this.setState({
        state: 'loading',
        display: 'block'
      })
      let myInit = { method: 'POST',
             cache: 'default',
             body: JSON.stringify({start:this.props.startsite, end:this.props.endsite}),
             headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           } }
      let res = await fetch('http://localhost:5000/train', myInit)

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
  select = (index) => this.setState({
    selectedIndex: index,
  })

  change = (list, filter) => {
    switch (filter) {
      case 'all':
        return list
      case 'D':
        return list.filter(list => list.type==='G'||list.type==='D')
      case 'P':
        return list.filter(list => list.type==='T'||list.type==='K')
      default:
        return list
    }
  }
  handleClick(index) {
    let temp = this.change(this.state.list, this.state.filter)
    let m = temp[index]
    this.props.dispatch(trainpay(m))
    history.push('/pay')
  }
  render() {

    return (
    <MuiThemeProvider>
    <div>
      <NavBar title={this.props.startsite+'-'+this.props.endsite} />
      <Paper zDepth={1} style={{background: '#fff'}}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="全部列车"
            icon={noIcon}
            onClick={() => {
              this.select(0)
              this.setState({
                filter: 'all'
              })
            }}
          />
          <BottomNavigationItem
            label="高铁动车"
            icon={noIcon}
            onClick={() => {
              this.select(1)
              this.setState({
                filter: 'D'
              })
            }}
          />
          <BottomNavigationItem
            label="普通列车"
            icon={noIcon}
            onClick={() => {
              this.select(2)
              this.setState({
                filter: 'P'
              })
            }}
          />
        </BottomNavigation>
      </Paper>
      <Refresh state={this.state.state} display={this.state.display}/>
      <List style={{marginBottom: '1rem'}}>
        {this.change(this.state.list, this.state.filter).map((site, index) =>
          <ListItem primaryText={site.number}
                    key={index}
                    secondaryText={
                          <p>
                            <span style={{color: '#333'}}>{site.title}</span>
                            <span style={{color: 'red', marginLeft: '.4rem', fontSize: '80%'}}>余票：{site.ticket}</span><br />
                            {site.time}<br />
                            <span style={{color: 'blue'}}>{site.ticket}</span>
                          </p>
                        }
                        secondaryTextLines={2}
                        rightIcon={carIcon}
                        onClick={() => this.handleClick(index)}
                        />
        )}
      </List>
      </div>
      </MuiThemeProvider>
    )
  }
}

function select(state) {
  return {
    startsite: state.startsite,
    endsite: state.endsite,
    login: state.login,
    trainpay: state.trainpay
  }
}
export default connect(select)(train)
