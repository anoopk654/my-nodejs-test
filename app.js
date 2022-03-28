// Loading the dependencies
const axios = require('axios'); // importing axios npm 
const cheerio = require('cheerio'); // importing cheerio npm
const afterSort = require('./logics/jsonSort') //importing  my own created js file for sorting purpose
const url = 'https://wltest.dns-systems.net/'; // URL of the page we want to scrape
axios(url) 
  .then(response => {
    const html = response.data; // Fetch HTML of the page we want to scrape
    const $ = cheerio.load(html) // Load HTML we fetched in the previous line
    const tempTable = $('.package'); // Select all the list items in package class from the HTML page
    const websiteScrapedData = []; // json array created for storing scraped json value

     // Use .each method to loop through the package class we selected from the HTML page
    tempTable.each(function () {
      var price_for_one_year ='' // created this variable for sorting the json array
      const option_title = $(this).find('.header > h3').text(); // fetching the heading
      const description = $(this).find('.package-name').text(); // fetching the description
      const price = $(this).find('.price-big').text();// fetching the price
      const discount = $(this).find('.package-price > p').text(); // fetching the discount if available
      const validity_check = option_title.split(' - '); // split the heading to find that plan is monthly or yearly
      if(validity_check[1] === '12 Months') // if that offer is 12 months that means this offer is for monthly payment
      {
          price_for_one_year  = price.substring(1,price.length) * 12 // cut the currency symbol infront of the price for calculating the yearly price for that offer ( for sorting purpose)
      }
      else if(validity_check[1] === '1 Year') // if that offer is 1 year that means this offer is for yearly payment
      {
          price_for_one_year  = price.substring(1,price.length) //cut the currency symbol infront of the price for sorting purpose
      }
      else
      {
          price_for_one_year = 0
      }
      // pusing the fetched data in to the created array
      websiteScrapedData.push({
      option_title,
      description,
      price,
      price_for_one_year,
      discount,
      });
    }); 
    websiteScrapedData.sort(afterSort("price_for_one_year")); //Pass the price_temp attribute to the afterSort() method for sorting the json array       
    console.log(websiteScrapedData); // printing the data
  })
  .catch(console.error);