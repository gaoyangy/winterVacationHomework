import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'

/**
 * app标题栏
 */
export default class navbar extends React.Component {
  render(props) {
    return (
      <MuiThemeProvider>
      <AppBar
        title={<span style={{fontSize: '70%'}}>{this.props.title}</span>}
        iconElementLeft={<IconButton><i className="material-icons">train</i></IconButton>}
      />
      </MuiThemeProvider>
    )
  }
}
