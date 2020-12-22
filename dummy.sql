DROP DATABASE IF EXISTS `latihan_node`;
CREATE DATABASE `latihan_node`;

CREATE TABLE `guru` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `nama` varchar(50) NOT NULL,
 `mapel` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
);
