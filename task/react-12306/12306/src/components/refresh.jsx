import React from 'react'
import RefreshIndicator from 'material-ui/RefreshIndicator'
/*
*购买火车票时弹出的对话框
*
*/
export default class refresh extends React.Component {

  render() {

    return (
      <div style={{margin: '2rem auto', height: '2.5rem', position: 'relative', width:'2.5rem', display: this.props.display}}>
      <RefreshIndicator
        size={40}
        style={{margin: '0 auto'}}
        top={0}
        left={0}
        status={this.props.state}
      />
      </div>
    )
  }
}
