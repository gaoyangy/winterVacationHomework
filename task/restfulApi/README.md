### RESTful API是目前比较成熟的一套互联网应用程序的API设计理论 
#### RESTFul API的设计方法及原则：

###### 一. 使用HTTP方法：HTTP1.1的规范定义了8个动词，然而HTTP作为一个规范并没有被严格地遵守着，在大多数情况下POST是可以完成除任何种类的请求，所以现在很多的API设计都是只是用GET和POST来调用API，在这种情况下，一般的做法是使用GET用来获取资源，其他的行为都是用POST来完成，而为了区别不同的行为，往往在API的Uri中加入动词，更清晰API设计的可能会使用GET POST PUT DELETE四种方法分别代表“查询、添加、更新、删除”等四个动作

###### 二. Uri格式：
1. Uri的根(root, /)应当能够标识这是一个RESTful API，以与同目录下其他可能存在的资源进行区分。
2. 紧接着Uri的根，应当标识当前API的版本号。
3. 如果方法是POST或者PUT，尽量避免使用URL编码的参数，尽量保持Uri的干净。
4. 如果方法是DELETE，Uri应当完全标识了需要删除的对象或者对象的集合，避免在DELETE的请求中使用其他参数，因为某些服务器可能会丢弃伴随着DELETE发送的内容。

* Google的开放API来举例：
 1. POST https://www.googleapis.com/books/v1/mylibrary/annotations
 2. PUT https://www.googleapis.com/bigquery/v2/projects/p1/datasets/p2
 3. DELETE https://www.googleapis.com/bigquery/v2/projects/{project-parameter}/datasets/{datasets-parameter}


###### 三. 固定返回码HTTP状态码，在REST中都有特定的意义：200，201,202,204,400,401,403,500。比如401表示用户身份认证失败，403表示你验证身份通过了，但这个资源你不能操作。

###### 四. 固定返回结构: 大部分的API设计会使用JSON来传递数据，JSON-RPC是一个基于JSON的设计简洁的RPC规范
	* JSON-RPC的响应格式设计：
	{"jsonrpc": "2.0", "result": 19, "id": 1}

	{
	    "jsonrpc": "2.0", 
	    "error": 
	        {
	            "code": -32600, 
	            "message": "Invalid Request",
	            "data": {}
	        }, 
	    "id": null
	}


###### 五. 服务端所有的响应格式为:

	{   
	    "code": -32600, 
	    "message": "Invalid Request", 
	    "data":{ }
	}
	
它们的含义分别代表：code为0代表调用成功，其他会自定义的错误码；message表示在API调用失败的情况下详细的错误信息，这个信息可以由客户端直接呈现给用户，否则为空；data表示服务端返回的数据，具体格式由服务端自定义，API调用错误为空



