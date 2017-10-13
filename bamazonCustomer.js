// Initializes the npm packages used
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// Initializes the connection 
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Please enter your password MySQL in order to use this application
  password: "",
  database: "bamazon"
});

// Creates the connection 
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  start();
});


function start() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    // Draw the table in the terminal 
    console.table(res);
    selectItem(res);
  });
}

// Prompt the customer for a product ID
//inventory is the (res) from the connection.query with the products table
function selectItem(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "Please select a product id you would like to purchase? [Quit with Q]",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      exit(val.choice);
      var id = parseInt(val.choice);
      var product = checkInventory(id, inventory);

      if (product) {
        quantity(product);
      }
      else {
        console.log("\nItem is not in the inventory.");
        start();
      }
    });
}

// Prompt the user for quantity
function quantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like? [Quit with Q]",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      exit(val.quantity);
      var quantity = parseInt(val.quantity);

      if (quantity > product.stock_quantity) {
        console.log("\nInsufficient quantity!");
        start();
      }
      else {
        purchase(product, quantity);
      }
    });
}

// Purchase the desired item
function purchase(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
      start();
    }
  );
}

// Check to see if the product is in inventory
function checkInventory(id, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === id) {
      return inventory[i];
    }
  }
  return null;
}


function exit(choice) {
  if (choice.toLowerCase() === "q") {
    console.log("Thanks for choosing Bamazon!");
  //process.exit([code]) of 0 will exit using a success code
    process.exit(0);
  }
}
