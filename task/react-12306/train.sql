
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- 表的结构 `train`
--

CREATE TABLE `train` (
  `id` bigint(255) NOT NULL,
  `start` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `end` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `number` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `title` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `time` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `type` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ticket` int(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `train`
--

INSERT INTO `train` (`id`, `start`, `end`, `number`, `title`, `time`, `type`, `ticket`) VALUES
(1, '上海', '北京', 'G101', '上海虹桥--北京南', '06:39--12.18--05小时39分', 'G', 98),
(2, '天津', '北京', 'G102', '天津南--北京西', '09:50--10:30--40分钟', 'G', 100),
(3, '上海', '北京', 'T110', '上海--北京', '18:02--09:30--15小时28分钟', 'T', 99),
(4, '上海', '北京', 'D312', '上海--北京南', '19:10--07:07--11小时57分钟', 'D', 99),
(5, '北京', '上海', 'G131', '北京南--上海虹桥', '12:40--18:35--05小时55分钟', 'G', 100),
(6, '北京', '天津', 'K1301', '北京--天津', '10:15--12:05--01小时50分钟', 'K', 100),
(7, '北京', '重庆', 'K819', '北京西--重庆北', '07:12--1+09:17--26小时05分钟', 'K', 100),
(8, '成都', '北京', 'T8', '成都--北京西', '09:00--1+12:31--27小时31分钟', 'T', 100),
(9, '天津', '长春', 'G1265', '天津西--长春', '10:30--15:57--05小时27分钟', 'G', 100);

--
ALTER TABLE `train`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
ALTER TABLE `train`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

