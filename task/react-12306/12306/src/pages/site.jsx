import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../components/Navbar'
import SiteList from '../components/sitelist'
import { setStartSite } from '../actions'

/*
*始发站页面
*
*/
class site extends React.Component {
  render(props) {
      const { dispatch } = this.props
    return (
      <div>
        <NavBar title="出发车站选择" />
        <SiteList onsiteclick={site => {
          dispatch(setStartSite(site))
          }}/>
      </div>
    )
  }
}
export default connect()(site)
