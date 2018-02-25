const https = require('https')
const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const ca = fs.readFileSync('./cert/srca.cer.pem')
const nodemailer = require('nodemailer')
const schedule = require('node-schedule')
const scanf = require('scanf')
const program = require('commander')
const UA = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36"
const inquirer = require('inquirer')
let $
var config = {}
var prompt = inquirer.createPromptModule()
let _stations = JSON.parse(fs.readFileSync('station.json', 'utf-8'))
let isRewrite = hasArgv(process.argv, '-r')
let isUpdateStation = hasArgv(process.argv, '-t')
function hasArgv(argv, filter) {
  argv = argv.slice(2)
  return argv.some((item, i) => {
    return filter === item
  })
}
let startStations = {
  lists: [],
  origin: {}
}
let endStations = {
  lists: [],
  origin: {}
}
function searchTrain(answers, input) {
  input = input || ''
  console.log(input)
  return
  if (Object.prototype.toString.call(_stations.stationInfo[input]) === '[object Array]') {

  }
  else {
  }
}
let questions = [
  {
		type: 'input',
		name: 'time',
		message: '��������-time(��:2017-01-27)��',
		validate(input) {
			let re = /[\d]{4}-[\d]{1,2}-[\d]{1,2}/ig
			if (input.match(re)) {
				return true
			}
			else {
				console.log(' (��������ڷǷ�����������)')
				return false
			}
		}
	},
	{
		type: 'input',
		name: 'from_station',
		message: '����ʼ��վƴ��-from_station(��:shanghai)��',
		validate(input) {
			if (_stations.stationInfo[input]) {
				let temp = _stations.stationInfo[input]
				if (Object.prototype.toString.call(temp) === '[object Array]') {
					temp.forEach((item, i) => {
						startStations.lists.push(item.name)
						startStations.origin[item.name] = item
					})
				}
				else {
					startStations.lists.push(temp.name)
					startStations.origin[temp.name] = temp
				}
				return true
			}
			else {
				console.log(' (û�������վŶ������������)')
				return false
			}
		}
	},
	{
		type: 'list',
		name: 'from_station_',
		message: '��ѡ��һ����վ��',
		choices: startStations.lists,
		default: 0
	},
	{
		type: 'input',
		name: 'end_station',
		message: '�����յ�վƴ��-end_station(��:hefei)��',
		validate(input) {
			if (_stations.stationInfo[input]) {
				let temp = _stations.stationInfo[input]
				if (Object.prototype.toString.call(temp) === '[object Array]') {
					temp.forEach((item, i) => {
						endStations.lists.push(item.name)
						endStations.origin[item.name] = item
					})
				}
				else {
					endStations.lists.push(temp.name)
					endStations.origin[temp.name] = temp
				}
				return true
			}
			else {
				console.log(' (û�������վŶ������������)')
				return false
			}
		}
	},
	{
		type: 'list',
		name: 'end_station_',
		message: '��ѡ��һ����վ��',
		choices: endStations.lists,
		default: 0
	},
	{
		type: 'input',
		name: 'train_num',
		message: '���복��-train_num(��:K1209�����������|�ֿ�)��',
		validate(input) {
			return true
		}
	},
	{
		type: 'input',
		name: 'your_mail',
		message: '��������-your_mail(��:123456789@163.com)��',
		validate(input) {
			return true
		}
	},
	{
		type: 'password',
		name: 'mail_pass',
		message: '�����������������Ȩ��-mail_pass��',
		validate(input) {
			return true
		}
	},
	{
		type: 'confirm',
		name: 'ticket_type',
		message: '�Ƿ���ѧ��Ʊ?(y/n)��',
		validate(input) {
			return true
		}
	},
	{
		type: 'input',
		name: 'receive_mail',
		message: '�����ռ�������(��������������һ����ֱ�ӻس�)��',
		validate(input) {
			return true
		}
	}
]
function getLeftTicketUrl(callback) {
	request.get("https://kyfw.12306.cn/otn/leftTicket/init", (e, r, b) => {
		const defaultUrl = 'leftTicket/queryZ'
		if (e) {
			callback && callback({leftTicketUrl: defaultUrl})
			console.log(e)
			return
		}
		$ = cheerio.load(r.body, {decodeEntities: false})
		let pageHtml = $.html()
		let re = pageHtml.match(/var CLeftTicketUrl = '\w+\/\w+/ig)
		let leftTicketUrl
		
		if (re && re.length) {
			leftTicketUrl = re[0].replace(/var CLeftTicketUrl = \'/, '')
			
			if (!leftTicketUrl) {
				leftTicketUrl = defaultUrl
			}
		}
		else {
			leftTicketUrl = defaultUrl			
		}
		callback && callback({leftTicketUrl: leftTicketUrl})
	})
}
if (isUpdateStation) {
	stationJson()
	return
}
fs.readFile('config.json', 'utf-8', function (err, data) {
	if (err || !data || isRewrite) {
		prompt(questions).then(answer => {
			answer.from_station = startStations.origin[answer.from_station_]|| _stations.stationInfo[answer.from_station]	
			answer.end_station = endStations.origin[answer.end_station_] || _stations.stationInfo[answer.end_station];	
			answer.train_num = answer.train_num.split('|');
			answer.ticket_type = answer.ticket_type ? '0x00' : 'ADULT';
			answer.receive_mail = answer.receive_mail || answer.your_mail;
			config = answer;
			fs.writeFile('config.json', JSON.stringify(config));
			var rule = new schedule.RecurrenceRule();
			rule.second = [0];
			getLeftTicketUrl((data) => {
				config.leftTicketUrl = data.leftTicketUrl;
				queryTickets(config);
				schedule.scheduleJob(rule, function () {
					queryTickets(config);
				});
			});
		});
	}
	else {
		config = JSON.parse(data);
		var rule = new schedule.RecurrenceRule();
		rule.second = [0];
		getLeftTicketUrl((data) => {
			config.leftTicketUrl = data.leftTicketUrl;
			queryTickets(config);
			schedule.scheduleJob(rule, function () {
				queryTickets(config);
			});
		});
	}
	
});

var yz_temp = [], yw_temp = [];//������Ʊ״̬
/*
* ��ѯ��Ʊ
*/
function queryTickets(config) {
	/*��������ͷ����*/
	let leftTicketUrl = config.leftTicketUrl;
	console.log('��ǰ����ĵ�ַ��', leftTicketUrl);
	var options = {
		hostname: 'kyfw.12306.cn',//12306
		port: 443,
		method: 'GET',
		path: '/otn/'+leftTicketUrl+'?leftTicketDTO.train_date=' + config.time + '&leftTicketDTO.from_station=' + config.from_station.code + '&leftTicketDTO.to_station=' + config.end_station.code + '&purpose_codes=' + config.ticket_type,
		ca: [ca],//֤��
		rejectUnauthorized: false,
		headers: {
			"Accept": "*/*",
			'Connection': 'keep-alive',
			'Host': 'kyfw.12306.cn',
			'User-Agent': UA,
			"Connection": "keep-alive",
			"Referer": "https://kyfw.12306.cn/otn/leftTicket/init",
			"If-Modified-Since": "0",
			"X-Requested-With": "XMLHttpRequest",
			"Cookie": "JSESSIONID=B25D95DFEC49E5C65176B381555C38DA; _jc_save_wfdc_flag=dc; route=6f50b51faa11b987e576cdb301e545c4; BIGipServerotn=2766406154.38945.0000; acw_tc=AQAAADUPbiLlcgsAuLz+Z7yML4078ek+; BIGipServerpool_passport=334299658.50215.0000; RAIL_EXPIRATION=1516454884979; RAIL_DEVICEID=qZf4Jpki03x17e3hoZ1td3gIxLrh3ktcodtRqpODJdH0J-WB98EoFETG8NNJC-YXQIDd4wA6DD4CP5YhHvU6WrxKIiEDgvcTnhaj9ZvFkoAulVhEWzTXFP0O1VXy5nf24YuP23pxRskcdaaviMsDkCSMZgGwWQWC; _jc_save_toDate=2018-01-18; _jc_save_fromStation=%u5317%u4EAC%2CBJP; _jc_save_toStation=%u5408%u80A5%2CHFH; _jc_save_fromDate=2018-02-01",
		}
	}
	function b4(ct, cv) {
		var cs = []
		for (var cr = 0; cr < ct.length; cr++) {
			var cw = []
			var cq = ct[cr].split("|")
			cw.secretHBStr = cq[36]
			cw.secretStr = cq[0]
			cw.buttonTextInfo = cq[1]
			var cu = []
			cu.train_no = cq[2]
			cu.station_train_code = cq[3]
			cu.start_station_telecode = cq[4]
			cu.end_station_telecode = cq[5]
			cu.from_station_telecode = cq[6]
			cu.to_station_telecode = cq[7]
			cu.start_time = cq[8]
			cu.arrive_time = cq[9]
			cu.lishi = cq[10]
			cu.canWebBuy = cq[11]
			cu.yp_info = cq[12]
			cu.start_train_date = cq[13]
			cu.train_seat_feature = cq[14]
			cu.location_code = cq[15]
			cu.from_station_no = cq[16]
			cu.to_station_no = cq[17]
			cu.is_support_card = cq[18]
			cu.controlled_train_flag = cq[19]
			cu.gg_num = cq[20] ? cq[20] : "--"
			// �߼�����
			cu.gr_num = cq[21] ? cq[21] : "--"
			// ����
			cu.qt_num = cq[22] ? cq[22] : "--"
			// ����
			cu.rw_num = cq[23] ? cq[23] : "--"
			// ����
			cu.rz_num = cq[24] ? cq[24] : "--"
			cu.tz_num = cq[25] ? cq[25] : "--"
			// ����
			cu.wz_num = cq[26] ? cq[26] : "--"
			cu.yb_num = cq[27] ? cq[27] : "--"
			// Ӳ��
			cu.yw_num = cq[28] ? cq[28] : "--"
			// Ӳ��
			cu.yz_num = cq[29] ? cq[29] : "--"
			// ������
			cu.ze_num = cq[30] ? cq[30] : "--"
			// һ����
			cu.zy_num = cq[31] ? cq[31] : "--"
			// ������
			cu.swz_num = cq[32] ? cq[32] : "--"
			// ����
			cu.srrb_num = cq[33] ? cq[33] : "--"
			cu.yp_ex = cq[34]
			cu.seat_types = cq[35]
			cu.exchange_train_flag = cq[36]
			cu.from_station_name = cv[cq[6]]
			cu.to_station_name = cv[cq[7]]
			cw.queryLeftNewDTO = cu
			cs.push(cw)
		}
		return cs
	}
	/*����ʼ*/
	var req = https.get(options, function (res) {
		var data = ''
		/*����������Ϣ*/
		var transporter = nodemailer.createTransport({
			host: "smtp.163.com",//����ķ�������ַ�������Ҫ�������������䣨��QQ���Ļ�����Ҫȥ�����Ƕ�Ӧ�ķ�������
			secureConnection: true,
			port: 465,//�˿ڣ���Щ����163�����ģ��Լ������ϲ�163����ķ�������Ϣ
			auth: {
				user: config.your_mail,//�����˺�
				pass: config.mail_pass,//��������
			}
		})
		res.on('data', function (buff) {
			data += buff//��ѯ�����JSON��ʽ��
		})
		res.on('end', function () {
			var jsonData
			var trainData
			//�������淵�ص�json����
			var trainMap
			try {
				var _data = JSON.parse(data).data
				trainData = _data && _data.result
				trainMap = _data && _data.map
			} catch (e) {
				console.log('JSON���ݳ���,�������������Ƿ���ȷ', e)
				console.log('��������ݣ�', data)
				return
			}
			jsonData = b4(trainData, trainMap)
			if (!jsonData || jsonData.length == 0) {
				console.log('û�в�ѯ����Ʊ��Ϣ')
				return
			}
			/*��ȡ�����복�������ӳ���*/
			var jsonMap = {}
			for (var i = 0; i < jsonData.length; i++) {
				var cur = jsonData[i]
				jsonMap[cur.queryLeftNewDTO.station_train_code] = cur.queryLeftNewDTO

			}
			/*���˲���Ҫ�ĳ���*/
			var train_arr = config.train_num
			for (var j = 0; j < train_arr.length; j++) {
				var cur_train = jsonMap[train_arr[j]]//��ǰ����
				if (!cur_train) {
					console.log('����û��' + train_arr[j] + '���˳���')
					continue
				}
				var yz = cur_train.yz_num//Ӳ����Ŀ
				var yw = cur_train.yw_num//Ӳ����Ŀ
				let trains = {
					'�߼�����':cur_train.gr_num,
					// ����
					'����': cur_train.qt_num,
					// ����
					'����': cur_train.rw_num,
					// ����
					'����': cur_train.rz_num,
					// ����
					'����': cur_train.wz_num,
					// Ӳ��
					'Ӳ��': cur_train.yw_num,
					// Ӳ��
					'Ӳ��': cur_train.yz_num,
					// ������
					'������': cur_train.ze_num,
					// һ����
					'һ����': cur_train.zy_num,
					// ������
					'������': cur_train.swz_num,
					// ����
					'����': cur_train.srrb_num
				}
				console.log('====', trains)
				var trainNum = cur_train.station_train_code//����
				console.log('\n ' + trainNum + ' ���ε�Ӳ����Ʊ��:', yz, ', Ӳ����Ʊ��:', yw, '����ǰʱ�䣺' + getTime())
				if (yz != '��' && yz != '--' || yw != '��' && yw != '--') {
					if (yw_temp[j] == yw && yz_temp[j] == yz) {//����Ʊ״̬�����ı��ʱ��Ͳ������ʼ�
						console.log(' ' + trainNum + '����״̬û�ı䣬���ظ����ʼ�')
						continue
					}
					var mailOptions = {
						from: config.your_mail, // ���������ַ
						to: config.receive_mail || config.your_mail, // �ռ������ַ�����Ժͷ�������һ��
						subject: trainNum + '��Ʊ����Ӳ����' + yz + '��Ӳ�ԣ�' + yw, // �ʼ�����
						text: trainNum + '��Ʊ��\n' + cur_train.from_station_name + '=============>' + cur_train.to_station_name + '\n�������ڣ�' + config.time + ',\n����ʱ�䣺' + cur_train.start_time + ',\n����ʱ�䣺' + cur_train.arrive_time + ',\n��ʱ��' + cur_train.lishi, // �ʼ�����
					}

					// ���ʼ�����
					(function (j, yz, yw) {
						transporter.sendMail(mailOptions, function (error, info) {
							if (error) {
								return console.log(error)
							}
							console.log(' �ʼ��ѷ���: ====================> ' + mailOptions.to)
							yw_temp[j] = yw//���浱ǰ�г�����Ʊ����
							yz_temp[j] = yz
						})
					})(j, yz, yw)
				} else {
					console.log(trainNum + 'Ӳ��/Ӳ����Ʊ')
				}
			}
			// fs.writeFile('./train.json',data);
		})
	})

	req.on('error', function (err) {
		console.error(err.code)
	})
}

/*
* ��ȡȫ����վ��Ϣ������JSON�ļ�
*/
function stationJson() {
	let _opt = {
		hostname: 'kyfw.12306.cn',
		path: '/otn/resources/js/framework/station_name.js?station_version=1.9044',
		ca: [ca],
		rejectUnauthorized: false		
	}
	let _data = ''
	let _req = https.get(_opt, function (res) {
		res.on('data', function (buff) {
			_data += buff
		})
		res.on('end', function () {
			console.log(_data + '\n���ǰ�����Ϣ���ǳ�վ��Ϣ���Ǿ�˵��û��ץȡ�ɹ���������Ҫ����һ��station_version')			
			try {
				let re = /\|[\u4e00-\u9fa5]+\|[A-Z]{3}\|\w+\|\w+\|\w+@\w+/g
				// console.log('data',_data.match(re))
				let stationMap = {}
				let stationArray = []
				let temp = _data.match(re);
				[].forEach.call(temp, function (item, i) {
					// console.log(item,i)
					let t = item.split("|")
					let info = {
						name: t[1],
						code: t[2],
						pinyin: t[3],
						suoxie: t[4],
						other: t[5]
					}
					stationArray.push(t[3])
					if (!stationMap[t[3]]) {
						stationMap[t[3]] = info						
					}
					else {
						if (Object.prototype.toString.call(stationMap[t[3]]) === '[object Array]') {
							stationMap[t[3]] = [...stationMap[t[3]], info]
						}
						else {
							stationMap[t[3]] = [stationMap[t[3]], info]						
						}
					}
				})
				// console.log(stationMap["hefei"])
				fs.writeFile('station.json', JSON.stringify({ stationName: stationArray, stationInfo: stationMap }))
				console.log('�ɹ����³�վ��Ϣ��')
			} catch (e) {
				console.log('���³�վ��Ϣʧ�ܣ�', e)
				return null
			}
		})
	})
	_req.on('error', function (err) {
		console.error(err.code)
	})
}
function getTime() {
	let T = new Date()
	return T.getFullYear() + '-' + (parseInt(T.getMonth()) + 1) + '-' + T.getDate() + ' ' + T.getHours() + ":" + T.getMinutes() + ":" + T.getSeconds();
}


