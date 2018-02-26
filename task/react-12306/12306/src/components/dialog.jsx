import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
/*
*购买火车票时弹出的对话框
*
*/
export default class dialog extends React.Component {

  render() {
    const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onClick={this.props.handleClose}
      />,
      <FlatButton
        label="确定"
        primary={true}
        onClick={this.props.confirm}
      />
    ]

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
        >
          {this.props.text}
        </Dialog>
      </div>
    )
  }
}
