CREATE TABLE books (
    id CHAR(36) PRIMARY KEY, -- Type CHAR(36) for UUIDs because they are fixed length and more efficient than VARCHAR.
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publishedYear YEAR NOT NULL, -- Type YEAR for year because it is more efficient than INT.
    genres JSON NOT NULL, -- JSON type for storing array data (genre) to make it more flexible and queryable.
    stock SMALLINT UNSIGNED NOT NULL, -- SMALLINT is more efficient for stock quantities (because stock is usually not too large).
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FULLTEXT(title, author) -- Full-text index for title and author searches.
);