# Lost and Found

A web application to help people report and find lost or found children. The project consists of a client (React) and a server (Node.js/Express) with face recognition capabilities.

## Features
- User authentication (login/register)
- Report lost or found children
- Upload and manage images
- Face recognition for matching lost and found children
- Email notifications
- Data analysis and dashboards (Power BI)

## Project Structure
```
lost-and-found/
  client/      # React frontend
  server/      # Node.js backend
  ...
data_anyst/    # Data analysis scripts and notebooks
reports/       # Reports and figures
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Python 3 (for data analysis)

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

#### 4. Data Analysis (Optional)
- Explore the `data_anyst/analysis/Product_Analysis/` folder for Jupyter notebooks and Power BI dashboards.

## Folder Details
- `client/`: React app source code
- `server/`: Express server, models, routes, and face recognition models
- `data_anyst/`: Data generation and analysis scripts
- `reports/`: Figures and reports

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)
