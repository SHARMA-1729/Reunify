lost-and-found/
  client/      # React frontend
  server/      # Node.js backend
  ...
data_anyst/    # Data analysis scripts and notebooks
reports/       # Reports and figures
git clone <repo-url>
cd lost-and-found
cd client
npm install
cd ../server
npm install

# Lost and Found

<p align="center">
  <img src="https://t4.ftcdn.net/jpg/08/05/78/71/360_F_805787195_QNhGb7hAhscgzN7OjREvnffRLUGpyTDG.jpg" alt="Reunify Logo" width="600" height="200">
</p>

A web application to help people report and find lost or found children. The project consists of a client (React) and a server (Node.js/Express) with face recognition capabilities.

## Features
- User authentication (login/register)
- Report lost or found children
- Upload and manage images
- Face recognition for matching lost and found children
- Email notifications

## Project Structure
```
lost-and-found/
  client/      # React frontend
  server/      # Node.js backend
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Setup
#### 1. Clone the repository
```sh
git clone <repo-url>
cd lost-and-found
```

#### 2. Install dependencies
##### Client
```sh
cd client
npm install
```
##### Server
```sh
cd ../server
npm install
```

#### 3. Start the application
- Start the server:
  ```sh
  cd server
  npm start
  ```
- Start the client:
  ```sh
  cd ../client
  npm start
  ```

## Folder Details
- `client/`: React app source code
- `server/`: Express server, models, routes, and face recognition models

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)
