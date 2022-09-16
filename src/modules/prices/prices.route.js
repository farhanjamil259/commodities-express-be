import express from "express";
import axios from "axios";
import jsdom from "jsdom";

const { JSDOM } = jsdom;

const router = express.Router();

const fetchEibPriceTable = () => {
  return axios
    .get("https://apps.catalysts.basf.com/apps/eibprices/mp/")
    .then((response) => {
      // parse html into a dom object
      const html = response.data;
      const dom = new JSDOM(html);
      const document = dom.window.document;

      // find table
      const table = document.querySelector("#ContentPlaceHolder1_DataGrid3");

      // get rows - skip first, get 8
      const rows = [...table.querySelectorAll("tr")].slice(1, 8);

      // array to contain parsed price objects
      const priceEntries = [];

      for (let row of rows) {
        // gets columns tds - expected: Metal,	Symbol,	Asian EIB (AEIB),	EIB
        const columns = [...row.querySelectorAll("td")];

        // there should be at least 4 columns
        if (!columns || columns.length < 4) {
          continue;
        }

        // get and clean text value of each column
        const metal = columns[0].textContent.trim();
        const symbol = columns[1].textContent.trim();
        let aeib = columns[2].textContent.trim();
        let eib = columns[3].textContent.trim();

        if (aeib == "—") {
          aeib = "not_available";
        }
        if (eib == "—") {
          aeib = "not_available";
        }

        // the parsed price object
        const priceEntry = {
          metal,
          symbol,
          aeib,
          eib,
        };

        priceEntries.push(priceEntry);
      }
      return priceEntries;
    });
};

router.get("/", async (req, res) => {
  try {
    const eibPrices = await fetchEibPriceTable();

    res.json(eibPrices);
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
