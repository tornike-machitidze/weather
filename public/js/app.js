const loc = document.querySelector(".location");
const info = document.querySelector(".info");
const forec = document.querySelector(".forcast");

const foarcastData = async (address) => {
  try {
    const response = await fetch(
      `http://localhost:3000/weather?address=${address}`
    );
    const { forecast, location } = await response.json();
    if (forecast && location) {
      loc.textContent = location;
      info.textContent = forecast;
      forec.appendChild(loc);
      forec.appendChild(info);
      return;
    } else {
      loc.textContent = "Please write correct address";
      forec.appendChild(loc);
      return;
    }
  } catch (error) {
    loc.textContent = "Please write right address";
    forec.appendChild(loc);
  }
};

const form = document.querySelector("form");
const input = document.querySelector(".input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  loc.textContent = "";
  info.textContent = "";
  const address = input.value;
  input.value = "";
  if (address) {
    return foarcastData(address);
  } else {
    loc.textContent = "Please enter address";
    forec.appendChild(loc);
  }
});
