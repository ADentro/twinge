USE join_us;

CREATE TABLE users
	(
		id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
		username VARCHAR(50),
		authentication_provider VARCHAR(50),
		oauth_id VARCHAR(100),
		email VARCHAR(100),
		phone_number VARCHAR(10),
		dob DATE
	);

CREATE TABLE streams
    (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_id INT
        FOREIGN KEY REFERENCES users.id
    );

CREATE TABLE stream
    (
        id INT NOT NULL AUTO_INCREMENT
    );
