/**
 * @swagger
 * /books:
 *   post:
 *     tags:
 *       - Books
 *     summary: Insert data book
 *     description: This endpoint allows you to add a new book to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "NodeJS Fundamental"
 *               author:
 *                 type: string
 *                 example: "Dirgantara"
 *               publishedYear:
 *                 type: number
 *                 example: 2025
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["programming"]
 *               stock:
 *                 type: number
 *                 example: 100
 *     responses:
 *       201:
 *         description: Book successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "10ca1704-fb4a-4c02-bea4-adcf20ace30f"
 *                 title:
 *                   type: string
 *                   example: "NodeJS Fundamental"
 *                 author:
 *                   type: string
 *                   example: "Dirgantara"
 *                 publishedYear:
 *                   type: number
 *                   example: 2025
 *                 genres:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["programming"]
 *                 stock:
 *                   type: integer
 *                   example: 100
 *       400:
 *         description: Invalid input (e.g., book with the same title and author already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Book with the same title and author already exists."
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     tags:
 *       - Books
 *     summary: Retrieve a list of books
 *     description: Fetch a list of books with pagination and optional search.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: "website"
 *         description: Keyword to search books by title, author, or genre
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalBooks:
 *                   type: integer
 *                   example: 1
 *                 books:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "10ca1704-fb4a-4c02-bea4-adcf20ace30f"
 *                       title:
 *                         type: string
 *                         example: "NodeJS Fundamental"
 *                       author:
 *                         type: string
 *                         example: "Dirgantara"
 *                       publishedYear:
 *                         type: number
 *                         example: 2025
 *                       genres:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["programming"]
 *                       stock:
 *                         type: number
 *                         example: 100
 *
 * /books/{id}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Retrieve a book by its ID
 *     description: Fetch a book's details by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to retrieve.
 *     responses:
 *       200:
 *         description: A single book's details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "10ca1704-fb4a-4c02-bea4-adcf20ace30f"
 *                 title:
 *                   type: string
 *                   example: "NodeJS Fundamental"
 *                 author:
 *                   type: string
 *                   example: "Dirgantara"
 *                 publishedYear:
 *                   type: number
 *                   example: 2025
 *                 genres:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["programming"]
 *                 stock:
 *                   type: number
 *                   example: 100
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Book not found."
 *       500:
 *         description: Internal server error
 *
 *   put:
 *     tags:
 *       - Books
 *     summary: Update data book by ID
 *     description: This endpoint allows you to update the details of an existing book.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "NodeJS Fundamental"
 *               author:
 *                 type: string
 *                 example: "Dirgantara"
 *               publishedYear:
 *                 type: number
 *                 example: 2025
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["programming"]
 *               stock:
 *                 type: number
 *                 example: 100
 *     responses:
 *       200:
 *         description: Book successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "10ca1704-fb4a-4c02-bea4-adcf20ace30f"
 *                 title:
 *                   type: string
 *                   example: "NodeJS Fundamental"
 *                 author:
 *                   type: string
 *                   example: "Dirgantara"
 *                 publishedYear:
 *                   type: number
 *                   example: 2025
 *                 genres:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["programming"]
 *                 stock:
 *                   type: integer
 *                   example: 100
 *       400:
 *         description: Invalid input (e.g., book with the same title and author already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Book with the same title and author already exists."
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Book not found."
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     tags:
 *       - Books
 *     summary: Delete a book by its ID
 *     description: This endpoint allows you to delete a book by its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to delete.
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book deleted successfully"
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Book not found."
 *       500:
 *         description: Internal server error
 */
