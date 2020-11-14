CREATE TABLE `user` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(20) NOT NULL,
    `password` text,
    `name` varchar(20),
    `birth` date,
    PRIMARY KEY (`id`)
);

INSERT INTO user(email, password, name, birth) VALUES ('admin@example.com', '0000', 'admin', '2020-11-03');

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


/* ================================= */
/* ========== data sample ========== */
/* ================================= */

/* user 테이블의 데이터 예시 */
INSERT INTO user(email, password, name, birth) VALUES ('user02@example.com', '0000', 'user02', '2020-11-05');

/* product 테이블의 데이터 예시 */

INSERT INTO product (name, description, img_name, created, updated, price) VALUES ('test', '0000', 'wall.jpg', '2018-01-01 12:10:11', '2018-01-01 12:10:11', 10000);

INSERT INTO product (name, description, img_name, created, updated, price) VALUES ('shirt', '0000', 'shirt.jpg', '2018-01-01 12:10:11', '2018-01-01 12:10:11', 20000);

UPDATE product SET category = 'top' WHERE id = 1;

 INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '맨투맨1', 'description for 맨투맨 1', '맨투맨1.jpg', NOW(), NOW(), 10000, 'top');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '맨투맨2', 'description for 맨투맨 2', '맨투맨2.jpg', NOW(), NOW(), 40000, 'top');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '맨투맨3', 'description for 맨투맨 3', '맨투맨3.jpg', NOW(), NOW(), 90000, 'top');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '맨투맨4', 'description for 맨투맨 4', '맨투맨4.jpg', NOW(), NOW(), 160000, 'top');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '맨투맨5', 'description for 맨투맨 5', '맨투맨5.jpg', NOW(), NOW(), 250000, 'top');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '맨투맨6', 'description for 맨투맨 6', '맨투맨6.jpg', NOW(), NOW(), 360000, 'top');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '맨투맨7', 'description for 맨투맨 7', '맨투맨7.jpg', NOW(), NOW(), 490000, 'top');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '맨투맨8', 'description for 맨투맨 8', '맨투맨8.jpg', NOW(), NOW(), 640000, 'top');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '맨투맨9', 'description for 맨투맨 9', '맨투맨9.jpg', NOW(), NOW(), 810000, 'top');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '맨투맨10', 'description for 맨투맨 10', '맨투맨10.jpg', NOW(), NOW(), 0, 'top');

INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '맨투맨11', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '맨투맨11.jpg', NOW(), NOW(), 210000, 'top');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '맨투맨12', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '맨투맨12.jpg', NOW(), NOW(), 440000, 'top');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '맨투맨13', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '맨투맨13.jpg', NOW(), NOW(), 690000, 'top');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '맨투맨14', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '맨투맨14.jpg', NOW(), NOW(), 960000, 'top');


INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'sneakers2', 'description for sneakers 2', 'sneakers2.jpg', NOW(), NOW(), 40000, 'acc');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'sneakers3', 'description for sneakers 3', 'sneakers3.jpg', NOW(), NOW(), 90000, 'acc');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'sneakers4', 'description for sneakers 4', 'sneakers4.jpg', NOW(), NOW(), 160000, 'acc');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'sneakers5', 'description for sneakers 5', 'sneakers5.jpg', NOW(), NOW(), 250000, 'acc');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'sneakers6', 'description for sneakers 6', 'sneakers6.jpg', NOW(), NOW(), 360000, 'acc');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'sneakers7', 'description for sneakers 7', 'sneakers7.jpg', NOW(), NOW(), 490000, 'acc');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'sneakers8', 'description for sneakers 8', 'sneakers8.jpg', NOW(), NOW(), 640000, 'acc');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'sneakers9', 'description for sneakers 9', 'sneakers9.jpg', NOW(), NOW(), 810000, 'acc');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'sneakers10', 'description for sneakers 10', 'sneakers10.jpg', NOW(), NOW(), 0, 'acc');

INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'sneakers11', 'description for product:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 'sneakers11.jpg', NOW(), NOW(), 420000, 'acc');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'sneakers12', 'description for product:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 'sneakers12.jpg', NOW(), NOW(), 880000, 'acc');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'sneakers13', 'description for product:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 'sneakers13.jpg', NOW(), NOW(), 380000, 'acc');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'sneakers14', 'description for product:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 'sneakers14.jpg', NOW(), NOW(), 920000, 'acc');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'sneakers15', 'description for product:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 'sneakers15.jpg', NOW(), NOW(), 500000, 'acc');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'sneakers16', 'description for product:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 'sneakers16.jpg', NOW(), NOW(), 120000, 'acc');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'sneakers17', 'description for product:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 'sneakers17.jpg', NOW(), NOW(), 780000, 'acc');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'sneakers18', 'description for product:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 'sneakers18.jpg', NOW(), NOW(), 480000, 'acc');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'sneakers19', 'description for product:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 'sneakers19.jpg', NOW(), NOW(), 220000, 'acc');



INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'padding4', 'description for padding jacket:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 'padding4.jpg', NOW(), NOW(), 480000, 'outer');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'padding5', 'description for padding jacket:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 'padding5.jpg', NOW(), NOW(), 750000, 'outer');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'padding6', 'description for padding jacket:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 'padding6.jpg', NOW(), NOW(), 80000, 'outer');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'padding7', 'description for padding jacket:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 'padding7.jpg', NOW(), NOW(), 470000, 'outer');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'padding8', 'description for padding jacket:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 'padding8.jpg', NOW(), NOW(), 920000, 'outer');

INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'padding10', 'description for padding jacket:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 'padding10.jpg', NOW(), NOW(), 0, 'outer');

INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'padding12', 'description for padding jacket:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 'padding12.jpg', NOW(), NOW(), 320000, 'outer');

INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'padding14', 'description for padding jacket:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 'padding14.jpg', NOW(), NOW(), 880000, 'outer');

INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'padding17', 'description for padding jacket:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 'padding17.jpg', NOW(), NOW(), 670000, 'outer');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'padding18', 'description for padding jacket:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 'padding18.jpg', NOW(), NOW(), 720000, 'outer');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( 'padding19', 'description for padding jacket:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', 'padding19.jpg', NOW(), NOW(), 830000, 'outer');

INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '청바지1', 'description for padding jeans: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', '청바지1.jpg', NOW(), NOW(), 50000, 'pants');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '청바지2', 'description for padding jeans: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', '청바지2.jpg', NOW(), NOW(), 200000, 'pants');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '청바지3', 'description for padding jeans: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', '청바지3.jpg', NOW(), NOW(), 450000, 'pants');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '청바지4', 'description for padding jeans: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', '청바지4.jpg', NOW(), NOW(), 800000, 'pants');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '청바지5', 'description for padding jeans: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', '청바지5.jpg', NOW(), NOW(), 250000, 'pants');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '청바지6', 'description for padding jeans: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', '청바지6.jpg', NOW(), NOW(), 800000, 'pants');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '청바지7', 'description for padding jeans: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', '청바지7.jpg', NOW(), NOW(), 450000, 'pants');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '청바지8', 'description for padding jeans: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', '청바지8.jpg', NOW(), NOW(), 200000, 'pants');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '청바지9', 'description for padding jeans: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', '청바지9.jpg', NOW(), NOW(), 50000, 'pants');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '청바지10', 'description for padding jeans: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', '청바지10.jpg', NOW(), NOW(), 0, 'pants');

INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '청바지11', 'description for padding jeans: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', '청바지11.jpg', NOW(), NOW(), 50000, 'pants');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '청바지12', 'description for padding jeans: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', '청바지12.jpg', NOW(), NOW(), 200000, 'pants');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '청바지13', 'description for padding jeans: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', '청바지13.jpg', NOW(), NOW(), 450000, 'pants');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '청바지14', 'description for padding jeans: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', '청바지14.jpg', NOW(), NOW(), 800000, 'pants');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '청바지15', 'description for padding jeans: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', '청바지15.jpg', NOW(), NOW(), 250000, 'pants');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '청바지16', 'description for padding jeans: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', '청바지16.jpg', NOW(), NOW(), 800000, 'pants');
INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '청바지17', 'description for padding jeans: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', '청바지17.jpg', NOW(), NOW(), 450000, 'pants');

INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '청바지19', 'description for padding jeans: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ', '청바지19.jpg', NOW(), NOW(), 50000, 'pants');

