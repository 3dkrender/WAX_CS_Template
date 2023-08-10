![3DK Logo](https://3dkrender.com/wp-content/uploads/2021/05/3DK_LOGO_400x120.png)
# React Client Template (for WAX blockchain dApps)

## Description
Create a frontend client for WAX blockchain dApp using React and redux.

Created by 3DK Render

## Installation

Clone the repo and install dependencies
  
  ```bash
  git clone https://github.com/3dkrender/WAX-RCT.git
  cd WAX-RCT
  npm install
  ```

This template works together with the [WAX-NodeServerTemplate](https://github.com/3dkrender/WAX-NST) template. You must have the server running in order to use this template.

- Client and server must be running at the same time.
- Client and server must be running in different ports.
- Client and server can be running in different machines (recommended for production).

## Environment Variables

Create a env folder in the root directory and create a .env file inside it. Add the following variables:

```bash
VITE_CHAIN= # WAX chain name
VITE_UALRPC= # WAX chain RPC endpoint
VITE_CHAINID= # WAX chain ID
VITE_SERVER= # Your site URL
VITE_EXPLORER= # WAX explorer URL (if you want to show transaction links)
```

*See some samples in the env folder*

## React UI

This template uses the [React NextUI V2](https://https://nextui.org/) library for the UI. Feel free to use any other UI library.

## Usage

## Client Connection

The client uses the ual-reactjs-renderer library to connect to the WAX blockchain. This library handles the blockchain connection and provides user account data.

The user account data, as well as authentication status, are stored in the Redux store. The `useSelector` hook from react-redux is used to access this data.

## Landing Page and Login

The application loads a landing page with a login button. Clicking the login button opens a popup window with the WAX login form. Once the user is authenticated, the window closes, and the application loads the main page.

## Main Page and Logout

The main page displays some sample info from the blockchain and a logout button. Clicking the logout button logs out the user and displays the landing page.

## Routing

The client uses the react-router-dom library for handling routes. Routes load different pages of the application, where each page is a React component.

## Components

Some components require data from the server to function. The `useEffect` hook from React is used to fetch this data. This hook runs whenever the component mounts or updates.

## Axios

The client utilizes the axios library to make server requests from within the components.

### Example Server Request

From component: 

```javascript
const [info, setInfo] = useState(null);
  useEffect(() => {
    ctGetInfo()
      .then((res: any) => {
        if (res) {
          setInfo(res);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [])
```

Controller (ctGetInfo):

```javascript
export const ctGetInfo = async () => {
  try {
    const res = await axios.get(import.meta.env.VITE_SERVER + "api/getinfo");
    return res.data['info'];
  } catch (error) {
    console.log(error);
    return null;
  }
```

This example demonstrates a server request using axios within the `useEffect` hook. It fetches data from the specified API endpoint and stores the response data in the component's state variable.

## How to start the client

The client can be run for testnet or mainnet. In both cases, it can be run for local or deployed mode. Local mode runs the client in localhost, while deployed mode runs the client in a remote server. Each mode has its own npm script and environment variables.

```bash
# For testnet in local mode
npm run dev:tlocal

# For testnet in deployed mode
npm run dev:testnet

# For mainnet in local mode
npm run start:mlocal

# For mainnet in deployed mode
npm run start:main
```

## How to build the client

The client can be built for testnet or mainnet. In both cases, it can be built for local or deployed mode. Each mode has its own npm script and environment variables.

```bash
# For testnet
npm run build:testnet

# For mainnet
npm run build:main
```

## Version: 0.2.0
- NextUI updated to v2.0.0 (All UI refactored)
  - Now includes TailwindCSS
- Improved server calls

