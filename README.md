# URL Shortener Application

This is a URL shortener application that allows users to create short links for long URLs and retrieve the original URLs using the short links. The application uses a MySQL database for persistent storage and Redis for caching the URLs for faster access.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Code Structure](#code-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create a short URL from a long URL.
- Retrieve the original URL by using the short URL.
- Cache URLs in Redis for faster retrieval.
- Handle URL validation before creating short URLs.

## Technologies Used

- Node.js
- Express.js
- MySQL
- Redis
- TypeScript

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/teispace/tei_url_shortner.git
   ```

2. Navigate to the project directory:

   ```bash
   cd url-shortener
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and set the following environment variables:

   ```plaintext
   APP_URL=http://localhost:8080
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   DB_PORT=your_db_port
   ```

   Or you can use the provided `.env.example` file as a template:

   ```bash
    cp .env.example .env
   ```

   Update the `.env` file with your database credentials.

5. Start the MySQL server and Redis server.

6. Run the application:

   ```bash
   npm start
   ```

## Usage

- To create a short URL, send a POST request to `/create-url` with a JSON body containing the `url` parameter:

  ```json
  {
    "url": "https://example.com"
  }
  ```

- To retrieve the original URL, make a GET request to `/{shortUrl}` where `{shortUrl}` is the short URL code.

## Code Structure

- `src/models/url.model.ts`: Contains the `UrlModel` class for interacting with the MySQL database, handling the creation and retrieval of URLs.
- `src/controllers/url.controller.ts`: Contains the `UrlController` class that manages the HTTP requests and responses, validating input, and coordinating between the model and view.
- `src/config/db.config.ts`: Handles the database connection and configuration, including methods for querying and creating the URL table.
- `src/config/redis.config.ts`: Configures the Redis client for caching short URLs to improve performance.
- `src/utils/urlUtils.ts`: Contains utility functions for URL validation and generating short URLs.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any improvements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
