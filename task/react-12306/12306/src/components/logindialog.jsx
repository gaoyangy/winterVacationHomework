import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
/*
*登陆时输入错误弹出对话框
*
*/
export default class logindialog extends React.Component {

  render() {
    const actions = [
      <FlatButton
        label="确定"
        primary={true}
        onClick={this.props.handleClose}
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
