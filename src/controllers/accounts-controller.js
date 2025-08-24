import { userStore } from "../models/user-store.js";

const cookieName = "weatherTop";

export const accountsController = {
  /**
   * Redirects user to dashboard if logged in, otherwise to login page.
   */
  index(request, response) {
    // check if user is already logged in
    const userEmail = request.cookies[cookieName];
    if (userEmail) {
      response.redirect("/dashboard");
      return;
    } else {
      response.redirect("/login");
      return;
    }
  },

  /**
   * Renders the login view.
   */
  login(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("login-view", viewData);
  },

  /**
   * Logs out the user by clearing the cookie and redirects to home.
   */
  logout(request, response) {
    response.cookie(cookieName, "");
    response.redirect("/");
  },

  /**
   * Renders the signup view.
   */
  signup(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("signup-view", viewData);
  },

  /**
   * Renders the account details view for the logged-in user.
   */
  async myAccount(request, response) {
    const userEmail = request.cookies[cookieName];
    if (!userEmail) {
      return response.redirect("/login");
    }
    const user = await userStore.getUserByEmail(userEmail);
    const viewData = {
      title: "My Account",
      user: user,
    };
    response.render("my-account-view", viewData);
  },

  /**
   * Updates the logged-in user's account details.
   */
  async updateMyAccount(request, response){
    const userEmail = request.cookies[cookieName];
    if (!userEmail) {
      return response.redirect("/login");
    }
    const user = await userStore.getUserByEmail(userEmail);
    if (!user) {
      return response.redirect("/login");
    }
    const updatedUser = {
      ...user,
      ...request.body,
    };
    await userStore.updateUser(updatedUser);
    response.redirect("/my-account");
  },

  /**
   * Registers a new user and redirects to home.
   */
  async register(request, response) {
    const user = request.body;
    await userStore.addUser(user);
    console.log(`registering ${user.email}`);
    response.redirect("/");
  },

  /**
   * Authenticates a user and sets the login cookie.
   */
  async authenticate(request, response) {
    const user = await userStore.getUserByEmail(request.body.email);
    if (user) {
      response.cookie(cookieName, user.email);
      console.log(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  /**
   * Retrieves the currently logged-in user by cookie.
   */
  async getLoggedInUser(request) {
    const userEmail = request.cookies.weatherTop;
    return await userStore.getUserByEmail(userEmail);
  },

  /**
   * Retrieves the authenticated user, redirects to login if not authenticated.
   */
  async getAuthenticatedUser(request, response) {
    const user = await accountsController.getLoggedInUser(request);
    if (!user) {
      response.redirect("/login");
      return null;
    }
    return user;
  },
};
