import { UALJs } from "ual-plainjs-renderer";
import { isEmpty } from "lodash";
import { Wax } from "@eosdacio/ual-wax";
import { Anchor } from "ual-anchor";
import {
  setPlayerBalance,
  setPlayerData
} from "../redux/reducers/userReducer";
import { storeAppDispatch } from "../redux/store";

// Get RPC endpoints and chainId from .env file
const rcpEndpoints = import.meta.env.VITE_UALRPC;
const appChainId = import.meta.env.VITE_CHAINID;
const chainType = import.meta.env.VITE_CHAIN;

/**
 * Class to manage user data and UAL; it will be saved on Login and deleted on Logout
 */
export class User {
  private static instance: User;
  private appName = "My APP Template";
  private anchor: Anchor;
  private wax: Wax | undefined;

  public loginService!: string;
  public ual: typeof UALJs;
  public authName!: string;
  public balance: number = 0;


  // UAL session object
  session: any = null!;
  // Name of the service used to login
  serviceLoginName!: string;
  // Current balance: for testing purposes
  userBalance = 0;

  // Callback to know when the user has sent the login data to the server
  callbackServerUserData: any = () => { };

  // Chain object
  private myChain = {
    chainId: appChainId,
    rpcEndpoints: [
      {
        protocol: "https",
        host: rcpEndpoints,
        port: 443,
      },
    ],
  };

  /**
   * Get the name of the user logged in
   * @returns The name of the user logged in
   */
  getName() {
    return this.authName;
  }

  /**
  * This helps us to login with Anchor, save the data in Redux and emit a request to get user data on the server.
  * @param callback Helps to know when the user has sent the data to the server.
  * @returns Promise - The promise is resolved to know if the login request has been completed.
  */
  login(callback: () => void = () => { }) {
    (document.querySelector(".ual-button-gen") as any).click();
    this.callbackServerUserData = callback;
  }

  /**
   * Get login status from UAL
   * @returns True if the user is logged in, false otherwise.
   */
  isAuth() {
    const auth = !isEmpty(this.authName) && !isEmpty(this.session);
    return auth;
  }

  /**
   * Force logout from UAL and clear user data
   */
  logout() {
    this.authName = undefined!;
    this.session = undefined!;
    this.ual.logoutUser();

    storeAppDispatch(setPlayerData({
      userName: "",
      isLogged: false,
      balance: 0,
    }));

    if (this.callbackServerUserData !== undefined) {
      this.callbackServerUserData();
    }
  }

  /**
   * Set user data from UAL in store
   * @param userObject User object returned by UAL
   */
  async ualCallback(userObject: any) {
    this.session = userObject[0];
    this.serviceLoginName = this.session.constructor.name;
    this.authName = this.session.accountName;

    storeAppDispatch(
      setPlayerData({
        userName: this.authName,
        isLogged: this.isAuth(),
        balance: this.balance !== undefined ? this.balance : 0,
      })
    );

    /**
     * Callback to know when the user has been logged in
     */
    if (this.callbackServerUserData !== undefined) {
      this.callbackServerUserData();
    }

    // Get user balance from wallet session and save it in store
    this.getBalance();
  }

  /**
   * Get user balance from wallet session
   * For testing purposes
   */
  getBalance() {
    const balance = this.session.rpc.get_account(this.authName);
    balance.then((balance: any) => {
      this.balance = balance.core_liquid_balance;
      storeAppDispatch(
        setPlayerBalance(this.balance !== undefined ? this.balance : 0)
      );
    });
  }

  // UserService init called to prepare UAL Login.
  private constructor() {
    // Binding ualCallback to this
    this.ualCallback = this.ualCallback.bind(this);
    console.log(`ChainID: ${this.myChain.chainId}`)

    // Create wallets
    let wallets = [];
    this.anchor = new Anchor([this.myChain], { appName: this.appName });
    wallets.push(this.anchor);
    // WAX Cloud Wallet is only available on mainnet
    if (chainType === "mainnet") {
      this.wax = new Wax([this.myChain]);
      wallets.push(this.wax);
    }

    // insert ual-login div (hidden by css)
    const divUal = document.createElement("div");
    divUal.setAttribute("id", "ual-login");
    document.body.appendChild(divUal);
    const divLoginRoot = document.getElementById("ual-login");

    this.ual = new UALJs(
      this.ualCallback,
      [this.myChain],
      this.appName,
      wallets,
      { containerElement: divLoginRoot }
    );

    // Clear storage keys
    this.ual.clearStorageKeys();

    // Init UAL
    this.ual.init();
  }

  static new() {
    if (!User.instance) {
      User.instance = new User();
    }
    return User.instance;
  }
}

const UserService = User.new();
export default UserService;
