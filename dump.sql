DROP TABLE IF EXISTS `urls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `urls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `keyword` varchar(200) CHARACTER SET utf8mb4 NOT NULL,
  `url` text CHARACTER SET utf8mb4 NOT NULL,
  `title` text CHARACTER SET utf8mb4,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ip` varchar(41) CHARACTER SET utf8mb4 NOT NULL,
  `clicks` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `keyword` (`keyword`),
  KEY `timestamp` (`timestamp`),
  KEY `ip` (`ip`)
) ENGINE=InnoDB AUTO_INCREMENT=3857 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;