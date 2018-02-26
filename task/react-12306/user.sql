
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` bigint(11) NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `password`) VALUES
(12001, '1111'),
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

