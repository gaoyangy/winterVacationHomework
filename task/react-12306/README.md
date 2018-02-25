
#### 实现功能
* 用户登录
* 用户注册
* 记住密码
* 自动登陆
* 选择出发车站和目的车站
* 查询指定车站车次车票
* 购买车票
* 退票
* 余票更新
* 历史订单记录
* 退出登录


#### 运行项目
* 上述工作完成后打开12306server文件夹运行
>* npm install
>* node app.js
> //这样你的服务器已经在localhost:5000打开了
* 接下来打开12306文件夹运行
>* npm install
>* npm start //这样12306就在localhost:3000打开了

#### 项目目录
##### 12306server
>* -node_modules
>* -router //路由文件夹，存放处理不同请求的文件
>>* --insertrecord.js //购买火车票后，将数据存入数据库
>>* --login.js //用户登陆时调用
>>* --record.js //查询用户所有火车票传回前端
>>* --removerecord.js //用户删除火车票时处理
>>* --signin.js //新用户注册时调用
>>* --train.js //指定出发地和目的地的全部车次
>* -app.js //项目入口文件
>* -package.json

##### 12306
>* -node_modules
>* -public
>* -src
>>* --actions //redux action
>>>* ---index.js //存放redux action 例如登陆后保存用户名，退出登陆后删除记录
>>* --components //页面复用组件
>>>* ---dashtable.jsx //对应page/order界面最上部功能栏
>>>* ---dialog.jsx //购买车票和删除车票弹出的确认框
>>>* ---history.js //路由跳转插件可以使用history.push('***')跳转页面
>>>* ---logindialog.jsx //登陆验证弹出框，例如输入为空或错误，注册失败
>>>* ---Navbar.jsx //顶部标题栏
>>>* ---refresh.jsx //获取后台传回数据时加载中标志
>>>* ---sitelist.jsx //车站列表，我只是静态添加了几个，可以在文件中修改
>>>* ---ticket.jsx //对应page/order页面车票查询组件
>>>* ---tooltip.jsx //购票成功或失败，删除车票成功或失败底部信息提示
>>* --pages //app页面
>>>* ---bottomBar.jsx //底部导航
>>>* ---endsite.jsx //目的车站页面
>>>* ---login.jsx //登陆页面
>>>* ---my12306.jsx //12306页面，登陆信息
>>>* ---order.jsx //车票预定页面，可查询车票
>>>* ---pay.jsx //购票支付页面
>>>* ---record.jsx //购票记录页面，可删除车票
>>>* ---server.jsx //商旅服务页面
>>>* ---site.jsx //出发车站页面
>>>* ---train.jsx //车票页面，车次根据车型筛选有效
>>>* ---user.jsx //用户信息页面，退出登录有效
>>* --reducers //redux reducer 对action 处理的函数
>>* --index.css
>>* --index.js //项目入口
>>* --registerServiceWorker.js
>>* --router.js //路由配置
>* -.gitignore
>* -package.json
>* -README.md
>* -yarn.lock


