SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `urls`;
CREATE TABLE `urls` (
  `keyword` varchar(200) NOT NULL,
  `url` text NOT NULL,
  `title` text,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` varchar(41) NOT NULL,
  `clicks` int(10) unsigned NOT NULL,
  PRIMARY KEY (`keyword`),
  KEY `timestamp` (`timestamp`),
  KEY `ip` (`ip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `urls` (`keyword`, `url`, `title`, `timestamp`, `ip`, `clicks`) VALUES
('knife', 'https://knife.media', 'Page Title', '2000-01-01 00:00:00', '127.0.0.1', 0);
