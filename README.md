# Agora Token Server

A simple Express.js server that generates Agora RTC tokens for real-time communication applications.

## Description

This server provides a REST API endpoint to generate authentication tokens for Agora.io's Real-Time Communication services. It can be used as a backend service for web or mobile applications that integrate Agora's audio/video calling features.

## Features

- Token generation for Agora RTC channels
- Support for both publisher and subscriber roles
- Configurable token expiration time
- CORS support for cross-origin requests

## Prerequisites

- Node.js (v12 or higher)
- npm or yarn
- Agora.io account with an App ID and App Certificate

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/farukcakal/agora-token-server.git
   cd agora-token-server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your Agora credentials:
   ```
   APP_ID=your_app_id_here
   APP_CERTIFICATE=your_app_certificate_here
   PORT=8080
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

2. Generate a token by making a GET request to:
   ```
   http://localhost:8080/rtc-token?channelName=test&uid=1234&role=publisher
   ```

   Parameters:
   - `channelName` (required): The name of the channel to join
   - `uid` (optional): User ID, defaults to 0 if not provided
   - `role` (optional): Either 'publisher' or 'subscriber', defaults to subscriber if not specified

3. The server will respond with a JSON object containing the token:
   ```json
   {
     "token": "006dfe4189aeex4f25b26cfe9f6892a5c12f2IdAB7dC+yNiW..."
   }
   ```

## Security Notes

- Never commit your `.env` file or expose your App ID and App Certificate
- Add `.env` to your `.gitignore` file
- For production, consider additional security measures:
  - Rate limiting
  - User authentication before token generation
  - HTTPS encryption

## License

[MIT](LICENSE)
