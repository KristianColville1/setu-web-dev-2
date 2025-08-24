export const aboutController = {
  /**
   * Renders the About page view.
   */
  index(request, response) {
    const viewData = {
      title: "About WeatherTop",
    };
    console.log("about rendering");
    response.render("about-view", viewData);
  },
};
