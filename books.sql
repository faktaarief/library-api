CREATE TABLE books (
    id CHAR(36) PRIMARY KEY, -- Tipe CHAR(36) untuk UUID karena panjangnya tetap dan lebih efisien daripada VARCHAR.
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publishedYear YEAR NOT NULL, -- Tipe YEAR untuk tahun karena lebih efisien daripada INT.
    genres JSON NOT NULL, -- Tipe JSON untuk menyimpan data array (genre) agar lebih fleksibel dan queryable.
    stock SMALLINT UNSIGNED NOT NULL, -- SMALLINT lebih efisien untuk jumlah stok (karena biasanya stok tidak terlalu besar).
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_title_author (title, author), -- Menggabungkan indeks title dan author untuk query yang sering mencarinya bersama.
    INDEX idx_publishedYear_stock (publishedYear, stock) -- Menggabungkan indeks untuk pencarian tahun terbit dan stok.
);