import React from 'react'
import { connect } from 'react-redux'
import NavBar from '../components/Navbar'
import SiteList from '../components/sitelist'
import { setEndSite } from '../actions'

/*
*终点站页面
*
*/

class endsite extends React.Component {
  render(props) {
      const { dispatch } = this.props;
    return (
      <div>
        <NavBar title="目的地车站选择" />
        <SiteList onsiteclick={site => {
          dispatch(setEndSite(site))
          }}/>
      </div>
    )
  }
}
export default connect()(endsite)
