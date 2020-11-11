DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS users_articles CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS articles_categories CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE users
(
	id SERIAL PRIMARY KEY,
	firstname VARCHAR (100) NOT NULL,
	lastname VARCHAR (100) NOT NULL,
	email VARCHAR (100) NOT NULL,
	password VARCHAR (100) NOT NULL,
	avatar TEXT NOT NULL
);

CREATE TABLE articles
(
	id SERIAL PRIMARY KEY,
	title VARCHAR NOT NULL,
	announce VARCHAR NOT NULL,
	publication_date DATE NOT NULL,
	text VARCHAR NOT NULL,
	picture TEXT
);

CREATE TABLE categories
(
	id SERIAL PRIMARY KEY,
	name VARCHAR NOT NULL
);

CREATE TABLE comments
(
	id SERIAL PRIMARY KEY,
	text TEXT NOT NULL,
	date DATE NOT NULL,
	user_id INTEGER,
	article_id INTEGER,
	FOREIGN KEY (user_id) REFERENCES users (id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (article_id) REFERENCES articles (id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE users_articles
(
	user_id INTEGER NOT NULL,
	article_id INTEGER NOT NULL,
	CONSTRAINT users_articles_pk PRIMARY KEY (user_id, article_id),
  	FOREIGN KEY (user_id) REFERENCES users (id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (article_id) REFERENCES articles (id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE articles_categories
(
	article_id INTEGER NOT NULL,
	category_id INTEGER NOT NULL,
	CONSTRAINT articles_categories_pk PRIMARY KEY (article_id, category_id),
  	FOREIGN KEY (article_id) REFERENCES articles (id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (category_id) REFERENCES categories (id)
		ON DELETE SET NULL
		ON UPDATE SET NULL
);
