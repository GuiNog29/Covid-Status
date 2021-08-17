let summary = {};

(() => {
  document.getElementById("filter").addEventListener("click", toApplyFilter);

  summary = axios.get("https://api.covid19api.com/summary")
    .then(response => {
      console.log(response.data.Countries)
      loadCountries(response);
    })
})();

function loadCountries(response) {
  let cmbCountry = document.getElementById("cmbCountry");

  let orderCountry = _.orderBy(response.data.Countries);

  for (country in orderCountry) {
    cmbCountry.options[cmbCountry.options.length] = new Option(
      orderCountry[country].Country,
      orderCountry[country].Country,
    );
  }
}

async function toApplyFilter() {
  totalValues();
  // let country = document.getElementById("cmbCountry").value;
  // let dateStartValue = document.getElementById("date_start").value;
  // let dateEndValue = document.getElementById("date_end").value;

  // let data = await axios.get(`https://api.covid19api.com/country/${country}?from=${dateStartValue}T00:00:00Z&to=${dateEndValue}T00:00:00Z`)
  //   .then((response) => {
  //     for (var res of response.data) {
  //       console.log(_.sum(res.Confirmed))
  //     }
  //   });
  // document.getElementById("kpiconfirmed").innerText = data.Countries.Confirmed;
}

function totalValues() {
  axios.get("https://api.covid19api.com/summary")
    .then(res => {
      let cmbCountry = document.getElementById("cmbCountry").value;
      let countrySelected = cmbCountry.toLowerCase();
      let countryValues = res.data.Countries.find((x) => countrySelected == x.Slug);

      document.getElementById("kpiconfirmed").innerText = countryValues.TotalConfirmed.toLocaleString("PT");
      document.getElementById("kpideaths").innerText = countryValues.TotalDeaths.toLocaleString("PT");
      document.getElementById("kpirecovered").innerText = countryValues.TotalRecovered.toLocaleString("PT");

    })

}



