import { Selector } from "testcafe";

export class LoginPage {
  public static readonly loginBtn = Selector("#oauth0-login-btn");
  public static readonly oauthUsernameInput = Selector("#username");
  public static readonly oauthPasswordInput = Selector("#password");
  public static readonly oauthLoginBtn = Selector("button[type=submit][name=action]");
}
