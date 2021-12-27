const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define Path for Express config
const publicDirectoyPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlerbars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoyPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Tornike Machitidze",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Tornike Machitidze",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "How can i help ?",
    title: "Help",
    name: "Tornike Machitidze",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address term",
    });
  }
  const address = req.query.address;
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

// app.get("/products", (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: "You must provide a search term",
//     });
//   }
//   console.log(req.query.search);
//   res.send({
//     products: [],
//   });
// });

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Error 404",
    errorText: "Help article not found",
    name: "Tornike Machitidze",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error 404",
    errorText: "Page not found",
    name: "Tornike Machitidze",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
