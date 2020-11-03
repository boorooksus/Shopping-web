CREATE TABLE `user` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(20) NOT NULL,
    `password` text,
    `name` varchar(20),
    `birth` date,
    PRIMARY KEY (`id`)
);

CREATE TABLE `product`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(20) NOT NULL,
    `description` text,
    `img_name` varchar(60) NOT NULL,
    `created` datetime NOT NULL,
    `update` datetime NOT NULL,
    PRIMARY KEY(`id`)
);