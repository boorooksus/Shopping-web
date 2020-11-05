CREATE TABLE `user` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(20) NOT NULL,
    `password` text,
    `name` varchar(20),
    `birth` date,
    PRIMARY KEY (`id`)
);

INSERT INTO user(email, password, name, birth) VALUES ('admin@example.com', '0000', 'admin', '2020-11-03');

INSERT INTO user(email, password, name, birth) VALUES ('user02@example.com', '0000', 'user02', '2020-11-05');

CREATE TABLE `product`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(20) NOT NULL,
    `description` text,
    `img_name` varchar(60) NOT NULL,
    `created` datetime NOT NULL,
    `update` datetime NOT NULL,
    PRIMARY KEY(`id`)
);

ALTER TABLE product ADD COLUMN price int NOT NULL;

INSERT INTO product (name, description, img_name, created, update, price) VALUES ('test', '0000', 'wall.jpg', '2018-01-30 12:31:03', '2018-01-30 12:31:03', 10000);

INSERT INTO product(name, description, img_name, created, update) VALUES ('test', '0000', 'wall.jpg', NOW(), NOW());

