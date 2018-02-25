import React from 'react'
import Snackbar from 'material-ui/Snackbar'


/*
*
*底部消息提示
*/

export default class tooltip extends React.Component {
  render() {
    return (
      <div>
        <Snackbar
          open={this.props.open}
          message={this.props.message}
          autoHideDuration={2000}
          onRequestClose={this.props.onRequestClose}
        />
      </div>
    )
  }
}
