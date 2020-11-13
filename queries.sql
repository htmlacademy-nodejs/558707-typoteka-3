-- Получить список всех категорий (идентификатор, наименование категории);
SELECT
    categories.id AS "id",
    categories.name AS "category name"
FROM categories


-- Получить список категорий для которых создана минимум одна публикация (идентификатор, наименование категории);
SELECT
    categories.id AS "id",
    categories.name AS "category name"
FROM categories
INNER JOIN articles_categories
    ON articles_categories.category_id = categories.id
GROUP BY
    categories.id,
    categories.name
HAVING
    count(articles_categories.article_id) >= 1;


-- Получить список категорий с количеством публикаций (идентификатор, наименование категории, количество публикаций в категории);
SELECT
    categories.id AS "id",
    categories.name AS "category name",
    count(articles_categories.article_id) AS "articles count"
FROM categories
INNER JOIN articles_categories
    ON articles_categories.category_id = categories.id
GROUP BY
    categories.id,
    categories.name;

-- Получить список публикаций (идентификатор публикации, заголовок публикации, анонс публикации, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие публикации;
SELECT
    articles.id AS "id",
    articles.title AS "article title",
    articles.announce AS "article announce",
    articles.publication_date AS "article date",
    concat(users.firstname, ' ', users.lastname) AS "user name",
    users.email AS "user email",
    count(comments.article_id) AS "comments count",
    string_agg(distinct categories.name, ', ') AS "categories name"
FROM articles
INNER JOIN users_articles
    ON users_articles.article_id = articles.id
INNER JOIN users
    ON users.id = users_articles.user_id
LEFT JOIN comments
    ON comments.article_id = articles.id
INNER JOIN articles_categories
    ON articles_categories.article_id = articles.id
INNER JOIN categories
    ON categories.id = articles_categories.category_id
GROUP BY
    articles.id,
    articles.title,
    articles.announce,
    articles.publication_date,
    concat(users.firstname, ' ', users.lastname),
    users.email
ORDER BY
    articles.publication_date DESC;

-- Получить полную информацию определённой публикации (идентификатор публикации, заголовок публикации, анонс, полный текст публикации, дата публикации, путь к изображению, имя и фамилия автора, контактный email, количество комментариев, наименование категорий);
SELECT
    articles.id AS "id",
    articles.title AS "article title",
    articles.announce AS "article announce",
    articles.text AS "article text",
    articles.publication_date AS "article date",
    articles.picture AS "article picture",
    concat(users.firstname, ' ', users.lastname) AS "user name",
    users.email AS "user email",
    count(comments.article_id) AS "comments count",
    string_agg(distinct categories.name, ', ') AS "categories name"
FROM articles
INNER JOIN users_articles
    ON users_articles.article_id = articles.id
INNER JOIN users
    ON users.id = users_articles.user_id
LEFT JOIN comments
    ON comments.article_id = articles.id
INNER JOIN articles_categories
    ON articles_categories.article_id = articles.id
INNER JOIN categories
    ON categories.id = articles_categories.category_id
WHERE articles.id = 1
GROUP BY
    articles.id,
    articles.title,
    articles.announce,
    articles.text,
    articles.publication_date,
    articles.picture,
    concat(users.firstname, ' ', users.lastname),
    users.email;


-- Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария);
SELECT
    comments.id AS "id",
    comments.article_id AS "article id",
    concat(users.firstname, ' ', users.lastname) AS "user name",
    comments.text AS "comment text"
FROM comments
INNER JOIN users
    ON users.id = comments.user_id
GROUP BY
    comments.id,
    comments.article_id,
    concat(users.firstname, ' ', users.lastname),
    comments.text
ORDER BY
    comments.date DESC
LIMIT 5;


-- Получить список комментариев для определённой публикации (идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария). Сначала новые комментарии;
SELECT
    comments.id AS "id",
    comments.article_id AS "article id",
    concat(users.firstname, ' ', users.lastname) AS "user name",
    comments.text AS "comment text"
FROM comments
INNER JOIN users
    ON users.id = comments.user_id
WHERE comments.article_id = 3
GROUP BY
    comments.id,
    comments.article_id,
    concat(users.firstname, ' ', users.lastname),
    comments.text
ORDER BY
    comments.date DESC;


-- Обновить заголовок определённой публикации на «Как я встретил Новый год»;
UPDATE articles
  set title = 'Как я встретил Новый год'
WHERE
  articles.id = 1;
