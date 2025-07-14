# WeatherTop

Developer: Kristian Colville

![Project Image](doc/images/responsive-website.png)

[Visit WeatherTop](https://setu-web-dev-2.onrender.com/)

## Table of Contents

* [Project Goals](#project-goals)
  * [Personal Goals](#personal-goals)
* [User Experience (UX)](#user-experience-ux)
  * [Target Audience](#target-audience)
* [Design](#design)
  * [Color Scheme](#color-scheme)
  * [Typography](#typography)
  * [Layout](#layout)
  * [Icons](#icons)
  * [Leveraging Bulma](#leveraging-bulma)
* [Technologies &amp; Tools](#technologies--tools)
* [Features](#features)
  * [Baseline](#baseline)
  * [Release 1](#release-1)
  * [Release 2](#release-2)
  * [Release 3](#release-3)
* [Data](#data)
* [Testing](#testing)
  * [Google Lighthouse Results](#google-lighthouse-results)
* [Bugs](#bugs)
  * [Bug Details](#bug-details)
* [Releases](#releases)
  * [Overview](#overview)
  * [Git Workflow](#git-workflow)
  * [Development Strategy](#development-strategy)
    * [Timeline](#timeline)
    * [Git Scope & Branching](#git-scope--branching)
  * [Release Results](#release-results)
    * [Baseline](#baseline-1)
    * [Release 1](#release-1-1)
    * [Release 2](#release-2-1)
    * [Release 3](#release-3-1)
* [Development &amp; Deployment](#development--deployment)
  * [Version Control](#version-control)
  * [Cloning the Repository](#cloning-this-repository)
  * [Render](#render)
* [Credits](#credits)


## Project Goals

WeatherTop is building a next-generation web platform that lets users create their own weather stations and effortlessly log atmospheric data. The application will:

- **Deliver a modern, responsive UI** that looks great on any device  
- **Pull real-time conditions from the OpenWeather API** for accurate, up-to-the-minute data  
- **Visualise observations through intuitive dashboards and charts** so insights are easy to grasp  
- **Prioritise accessibility and performance**, ensuring a fast, user-friendly experience

By combining rich API data with thoughtful design, this project aims to turn raw weather numbers into clear, actionable insights for everyone.


### Personal Goals


## User Experience (UX)
### Target Audience


## Design
### Color Scheme
### Typography

At **WeatherTop**, we rely on **Bulma’s built-in type helpers** rather than juggling custom font files. Classes such as `.title`, `.subtitle`, and `.content` keep headings crisp and body text legible at every breakpoint.

Bulma’s default sans-serif stack gives the app a clean, modern voice without extra downloads—ideal when users are loading live data out in the field.

### Layout

Every WeatherTop page sits on **Bulma’s column and container grid**. This framework lets us:

- Slot weather cards, station details, and forecast charts neatly into place  
- Re-flow the layout from widescreen dashboards to pocket-sized views without fuss  
- Use spacing helpers for breathing room, sparing us from one-off CSS tweaks

The result is a layout that feels natural whether you’re tracking a storm on a laptop or checking temperatures from your phone.

### Icons
### Leveraging Bulma

Our UI/UX approach aimed to **minimize custom CSS** from the start. By leaning on Bulma’s handy spacing, alignment, and component helpers, we managed to:

- **Trim development time by about 20 %** (by my estimate)  
- **Maintain consistent visual patterns** across the interface  
- **Simplify upkeep and future tweaks**

We only added bespoke styles when Bulma couldn’t cover a specific need, keeping the stylesheet lean and tidy. The result is a responsive, polished interface that serves users well and stays friendly for developers to extend.



## Technologies &amp; Tools

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) - The standard markup language used to structure the web pages and content of the application.
- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS ) - Used for styling the application, enhancing layout, colors, and responsiveness.
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - The primary programming language powering the web app’s interactivity.
- [Bulma CSS Framework](https://bulma.io/) - A modern, responsive CSS framework used for layout, typography, and UI components to minimize custom styling.
- [Flaticon](https://www.flaticon.com/) - Source for the weather icons used in the app, providing clear and attractive visuals for weather conditions.
- [Bulma Toggle extension](https://cdn.jsdelivr.net/npm/bulma-switch@2.0.4/dist/css/bulma-switch.min.css) - A Bulma extension utilized for toggle switches in the UI, improving user preference controls.
- [Favicon](https://favicon.io/) - A favicon generator for the web app.

## Features
### Baseline
### Release 1
### Release 2
### Release 3

## Data

## Testing
### Google Lighthouse Results

## Bugs
### Bug Details

## Releases
### Overview

This repository documents the iterative development of the WeatherTop website assignment.

Development follows a structured, branch-based workflow, progressing from initial Proof-of-Concepts (POCs) to full Releases. Each phase is tracked with dedicated branches and clear, incremental commits.

### Git Workflow

Typical commands for managing branches:

```bash
git checkout -b branch_name
git push --set-upstream origin branch_name
git checkout main
git pull origin branch_name
git push origin main
```

### Development Strategy

The assignment is delivered in multiple iterations:

- **Baseline**
- **Release 1** → **Release 3**
- **Release 4** and beyond (if time permits)

Key practices:

- Initialize with a robust project foundation.
- Create a new branch for each POC and Release, following assignment guidelines.
- Build each stage on the previous, ensuring commits are focused and meaningful.
- Use **Express.js** with **Handlebars** for templating, **Bulma** for styling, and a clear **MVC architecture** in JavaScript.
- Host the Node.js app on **Render**.

---

#### Timeline

| Milestone                 | Date                 |
| ------------------------- | -------------------- |
| Project Start             | June 12th, 2025      |
| Expected Final Submission | August 24th, 2025    |
| Approximate Duration      | 15 weeks             |

---

#### Git Scope & Branching

| Branch       | Description                   |
| ------------ | ----------------------------- |
| `main`       | Stable, release-ready version |
|              |                               |
| `baseline`   | Baseline project              |
| `rel1`       | Release 1                     |
| `rel2`       | Release 2                     |
| `rel3`       | Release 3                     |


### Release Results
#### Baseline
#### Release 1
#### Release 2
#### Release 3
#### Release 4

## Development & Deployment

### Version Control

I used [Visual Studio Code](https://code.visualstudio.com/) as a local repository and IDE & [GitHub](https://github.com/) as a remote repository.

1. Firstly, I needed to create a new repository on Github [setu-web-dev-2](https://github.com/KristianColville1/setu-web-dev-2).
2. I opened that repository on my local machine by copying the URL from that repository and cloning it from my IDE for use.
3. Visual Studio Code opened a new workspace for me.
4. I created files and folders to use.
5. To push my newly created files to GitHub I used the terminal by pressing Ctrl + shift + `.
6. A new terminal opened and then I used the below steps.

   - `git add (name of the file)` *This selects the file for the commit*
   - `git commit -m "Commit message: (i.e. Initial commit)"` *Allows the developer to assign a specific concise statement to the commit*
   - `git push` *The final command sends the code to GitHub*

### Cloning this Repository

If you would like to clone this repository please follow the bellow steps.

Instructions:

1. Log into GitHub.
2. Go to the repository you wish to clone.
3. Click the green "Code" button.
4. Copy the URL provided under the HTTPS option.
5. Open your preferred IDE with Git installed.
6. Open a new terminal window in your IDE.
7. Enter the following command exactly: `git clone the-URL-you-copied-from-GitHub`.
8. Press Enter.

### Render

I used [Render](https://render.com/) for deploying my project.

1. First, I created an account on [Render](https://render.com/).
2. I connected my GitHub repository to Render by clicking the "New Web Service" button on the Render dashboard.
3. I selected "Web Service" and authorized Render to access my GitHub account.
4. I chose the repository I wanted to deploy from the list of available options.
5. I specified the start command (e.g. `node app.js` or your main server file).
6. I set the appropriate environment variables if required (such as `PORT`).
7. After confirming the settings, I clicked "Create Web Service."
8. Render then started building and deploying the project, and once finished, it provided a URL for accessing the live site.

Render also automatically sets up continuous deployment. Any new changes pushed to the main repository will trigger a new deployment on Render.


## Credits
