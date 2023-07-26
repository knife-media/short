-- Adminer 4.8.1 MySQL 8.0.33-0ubuntu0.22.04.2 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `ord`;
CREATE TABLE `ord` (
  `params` varchar(256) COLLATE utf8mb4_general_ci NOT NULL,
  `destination` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `clicks` int unsigned NOT NULL,
  `status` enum('dead','alive') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'alive',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `params` (`params`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `social`;
CREATE TABLE `social` (
  `keyword` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `clicks` int unsigned NOT NULL DEFAULT '1',
  `source` set('tg','fb','vk','ok') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  UNIQUE KEY `keyword_social` (`keyword`,`source`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `urls`;
CREATE TABLE `urls` (
  `id` int NOT NULL AUTO_INCREMENT,
  `keyword` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` varchar(41) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `clicks` int unsigned NOT NULL,
  `host` varchar(128) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `keyword_host` (`keyword`,`host`),
  KEY `timestamp` (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


-- 2023-07-26 13:07:00
