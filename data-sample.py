# INSERT INTO product (name, description, img_name, created, updated, price) 
# VALUES ('test', '0000', 'wall.jpg', '2018-01-01 12:10:11', 
# '2018-01-01 12:10:11', 10000);
 
for i in range(20):
	print("INSERT INTO product (name, description, img_name, created, updated, price, category)", end="")
	print(" VALUES (", end="")
	print("'test5-", end="")
	print(i, end="")
	print("', 'description', 'test5.jpg', NOW(), Now(), 1000, 'top');")