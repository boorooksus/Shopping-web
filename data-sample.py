# 상품 데이터 예시 만들기 위한 파이썬 코드

# INSERT INTO product (name, description, img_name, created, updated, price) 
# VALUES ('test', '0000', 'wall.jpg', '2018-01-01 12:10:11', 
# '2018-01-01 12:10:11', 10000);
 
def query(name, price, category):
	for i in range(1, 20):
		print("INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '%s%d', 'description for %s %d', '%s%d.jpg', NOW(), NOW(), %d, '%s');"%(name, i, name, i, name, i, (price * i * i) % 1000000, category))

		if i == 10:
			print()

def query2(name, description, price, category):
	for i in range(1, 20):
		print("INSERT INTO product (name, description, img_name, created, updated, price, category) VALUES ( '%s%d', '%s', '%s%d.jpg', NOW(), NOW(), %d, '%s');"%(name, i, description, name, i, (price * i * i) % 1000000, category))

		if i == 10:
			print()

#query("맨투맨", 10000, 'top')

query2("청바지","description for padding jeans: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " , 50000, 'pants')