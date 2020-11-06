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

ALTER TABLE user ADD COLUMN created datetime;
ALTER TABLE user ADD COLUMN isAdmin boolean;

UPDATE user SET created = NOW();
UPDATE user SET isAdmin = false;
UPDATE user SET isAdmin = true WHERE id=1;


CREATE TABLE `product`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(20) NOT NULL,
    `description` text,
    `img_name` varchar(60) NOT NULL,
    `created` datetime NOT NULL,
    `updated` datetime NOT NULL,
    `price` int(11) NOT NULL,
    PRIMARY KEY(`id`)
);

ALTER TABLE product ADD COLUMN category varchar(30);

INSERT INTO product (name, description, img_name, created, updated, price) VALUES ('test', '0000', 'wall.jpg', '2018-01-01 12:10:11', '2018-01-01 12:10:11', 10000);

INSERT INTO product (name, description, img_name, created, updated, price) VALUES ('shirt', '0000', 'shirt.jpg', '2018-01-01 12:10:11', '2018-01-01 12:10:11', 20000);

UPDATE product SET category = 'top' WHERE id = 1;

ALTER TABLE product MODIFY price int(11);