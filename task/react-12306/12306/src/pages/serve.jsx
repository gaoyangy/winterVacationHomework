import React from 'react'
import NavBar from '../components/Navbar'
import {GridList, GridTile} from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Call from 'material-ui/svg-icons/communication/call'

const tilesData = [
  {
    img: 'http://www.northguan-nsa.gov.tw/Att_FCK/images/ec/%E8%90%AC%E9%87%91-%E7%BE%8E%E9%A3%9F_02.jpg',
    title: '订餐服务',
    author: '12306',
    alt: '美食'
  },
  {
    img: 'http://www.people.com.cn/mediafile/pic/20160731/1/2877271460570150437.jpg',
    title: '约车服务',
    author: '12306',
    alt: '汽车'
  }
]

/**
 * 商旅服务页面
 */
const serve = () => (
  <div>
    <NavBar title="商旅服务" />
    <div style={{margin: '1%', width: '98%'}}>
      <GridList
        cellHeight={200}
      >
        {tilesData.map((tile) => (
          <GridTile
            key={tile.title}
            title={tile.title}
            cols={2}
            subtitle={<span>by <b>{tile.author}</b></span>}
            actionIcon={<IconButton><Call color="white" /></IconButton>}
          >
            <img src={tile.img} alt={tile.alt}/>
          </GridTile>
        ))}
      </GridList>
    </div>
  </div>
)

export default serve;
