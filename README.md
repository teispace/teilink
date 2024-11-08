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
- [Screenshots](#screenshots)

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

**NOTE:** Redis and MySQL need to be installed first. Refer to the official [Redis documentation](https://redis.io/docs/getting-started/installation/) for installation instructions.


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


## Screenshots
<img width="450" alt="Screenshot 2024-11-04 at 10 53 49 PM" src="https://github.com/user-attachments/assets/ff36cf68-c032-4e92-a291-52c3bb84523a">
<img width="450" alt="Screenshot 2024-11-04 at 10 54 00 PM" src="https://github.com/user-attachments/assets/aeef879b-b3e6-4841-9dcc-265c957d2ffc">
<img width="450" alt="Screenshot 2024-11-04 at 10 54 09 PM" src="https://github.com/user-attachments/assets/e22ea134-fd2f-4000-9dea-12e8c5767254">




