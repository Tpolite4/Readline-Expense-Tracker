// this line of code is loading the readline interface to the variable readline
//often used for creating command-line interfaces
const readline = require('readline');
// Create an interface for input and output
const rl = readline.createInterface({
  //allows you to read input from the terminal
  input: process.stdin,
  //allows you to write output to the terminal
  output: process.stdout,
});
let expenses = [];
let totalIncome = 0;
// Function that takes user input as an argument
function greetUser(name) {
  console.log(`Hello, ${name}! Welcome to the program.`);
}

function showMenu() {
  console.log(`                                   Menu\n
  1) Add Income   2) Add Monthly Expenses   3) Additional Expenses   
  4) Delete an Expense   5) List Transactions   6) Display Balances   7) Exit \n`);

  rl.question(`Enter a number: \n`, (answer) => {
    if (answer === '1') {
      //if the user chooses option 1 // user can update their monthly expenses
      addIncome();
    } else if (answer === '2') {
      //if the user chooses option 1 // user can update their monthly expenses
      recurringExpenses();
    } else if (answer === '3') {
      //if the user chooses option 1 // user can add expense
      addExpense();
    } else if (answer === '4') {
      deleteExpense();
      listTransactions(); //if user chooses option 3 //user will move to delete expense activity
      // return to list transactions menu after deleting
    } else if (answer === '5') {
      listTransactions();
      showMenu(); //if user chooses option 4 //user will see list of transactions
      // return back to menu after listing transactions else if (answer === '4') {
    } else if (answer === '6') {
      // calculateTotalExpenses(expenses);
      displayIncome(totalIncome);
      calculateBalance();
      showMenu(); // Go back to menu after calculating balance
    } else if (answer === '7') {
      console.log('\nGoodbye!\n');
      rl.close();
    } else {
      console.log('\nInvalid option. Please try again.');
      showMenu();
    }
  });
}

// Function that introduces the application to the user
function introduction() {
  console.log(`
Thank you for using our Expense Tracker!
All your daily, monthly, yearly expenditures can be stored here so that your life can become much easier!
Let's get started!
  `);
}
// Ask the user for their name
rl.question('\nWhat is your name? \n', (name) => {
  // let currentDate = new Date().toISOString().split('T')[0];
  //console.log(new Date().toISOString())//returns '2024-09-10T16:27:11.369Z'
  // let currentDate = new Date() ->  Wed Sep 10 2024 14:35:26 GMT+0200

  // Call the function with the user input
  greetUser(name);
  introduction();
  showMenu();
}); //closed the rl.question in order to define the following function and it's function definition
//recurringExpenses could not be defined because it came after showMenu()'s invocation

//User adds monthly income
function addIncome() {
  rl.question('\nHow much is your monthly income? ', (income) => {
    totalIncome = parseFloat(income);
    console.log(`Your income is set to $${income} per month.\n`);
    showMenu();
  });
}

// Ask the user for their rent input
function recurringExpenses() {
  //console.log(new Date().toISOString())//returns '2024-09-10T16:27:11.369Z'
  // let currentDate = new Date() ->  Wed Sep 10 2024 14:35:26 GMT+0200
  let currentDate = new Date().toISOString().split('T')[0];
  rl.question('\nHow much is your monthly rent? ', (rent) => {
    expenses.push({
      name: 'rent',
      // parseFloat is converting the string into number
      amount: parseFloat(rent),
      //currentDate = [2024-09-10] // Selects year and month using slice method // formats information with template literal
      date: `${currentDate.slice(0, 4)}-${currentDate.slice(5, 7)}-01`,
    });
    //recurringExpenses();
    console.log(`Your rent is set to $${rent} per month.`);
    // Ask the user for their grocery input

    rl.question('\nHow much is your monthly groceries? ', (groceries) => {
      expenses.push({
        name: 'groceries',
        amount: parseFloat(groceries),
        date: `${currentDate.slice(0, 4)}-${currentDate.slice(5, 7)}-01`,
      });
      // recurringExpenses();
      console.log(`Your groceries are set to $${groceries} per month.`);

      // Ask the user for their monthly electricity input
      rl.question('\nHow much is your light bill? ', (light) => {
        expenses.push({
          name: 'light bill',
          amount: parseFloat(light),
          date: `${currentDate.slice(0, 4)}-${currentDate.slice(5, 7)}-01`,
        });
        // recurringExpenses();
        console.log(`Your light bill is set to $${light} per month.`);

        //Ask the user if would like to add additional expenses
        rl.question(
          '\n Do you want to add additional expenses? Type (Y/N)\n',
          (response) => {
            if (response.toLowerCase() === 'y') {
              addExpense();
            } else if (response.toLowerCase() === 'n') {
              // displayExpenses();
              listTransactions();
              showMenu();
            } else {
              console.log('\nInvalid option. Please try again.');
            }
          }
        );
      });
    });
  });
}

function addExpense() {
  rl.question('\nEnter the expense name: ', function (name) {
    rl.question('Enter the expense amount: ', function (amount) {
      rl.question(
        'Enter the date of the expense (e.g., YYYY-MM-DD): ',
        function (date) {
          expenses.push({ name: name, amount: parseFloat(amount), date: date });
          // recurringExpenses();
          // listTransactions();

          rl.question(
            '\nDo you want to add another expense? (Y/N): ',
            function (answer) {
              if (answer.toLowerCase() === 'y') {
                addExpense();

                // }} else {
                //   rl.question(
                //     'Do you want to delete an expense? (Y/N): ',
                //     function (deleteAnswer) {
                //       if (deleteAnswer.toLowerCase() === 'y')
                //         deleteExpense();
              } else if (answer.toLowerCase() === 'n') {
                listTransactions();
                showMenu();
              } else {
                console.log('\nInvalid option. Please try again.');
              }
            }
          );
        }
      );
    });
  });
}
// function displayExpenses() {
//   console.log('Expenses:');
//   expenses.forEach((expense) => {
//     console.log(
//       `${expense.name.padEnd(15, ' ')}: $${expense.amount.toFixed(2)} (Date: ${
//         expense.date
//       })`
//     );
//   });
// }
// addExpense();

// console.log(expenses);

// //List transactions//
function listTransactions() {
  // checking if the expense array is empty
  if (expenses.length === 0) {
    console.log('\nNo transactions found');
    return;
  }
  // if there is any transactions added to the expense array here we are printing them
  for (let index = 0; index < expenses.length; index++) {
    const expense = expenses[index];
    console.log(
      `${expense.date}    ${expense.name.padEnd(
        15,
        ' '
      )}    $${expense.amount.toFixed(2)}`
    );
  }
}

//deleteExpense() is called when the user wants to remove an expense.
function deleteExpense() {
  //It asks for the name of the expense to delete.
  rl.question('\nEnter the name of the expense to delete. \n', function (name) {
    //It looks for the expense in the expenses list using findIndex(), which finds the position of the expense with that name.
    const index = expenses.findIndex((expense) => expense.name === name);
    //If it finds it (index !== -1), it removes the expense using splice().
    if (index !== -1) {
      expenses.splice(index, 1);
      console.log(`\nExpense "${name}" deleted.`);

      //If it can't find it, it tells the user that the expense wasn’t found.
    } else {
      console.log(`\nExpense "${name}" not found.`);
    }
    //Finally, it displays the updated list of expenses.
    console.log('\nHere is your updated transaction list.');
    listTransactions();
    rl.question(
      '\n Do you want to delete additional expenses? Type (Y/N)\n',
      (response) => {
        if (response.toLowerCase() === 'y') {
          listTransactions();
          deleteExpense();
        } else if (response.toLowerCase() === 'n') {
          listTransactions();
          showMenu();
        } else {
          console.log('\nInvalid option. Please try again.');
        }
      }
    );

    // listTransactions();
  });
}
// // Calculate Balance

function calculateTotalExpenses(expenses) {
  //loop iterates over each key in the current object
  let totalExpenses = 0;
  for (let i = 0; i < expenses.length; i++) {
    totalExpenses = totalExpenses + expenses[i].amount;
  }
  let currentDate = new Date();
  const formattedDate = currentDate.toDateString().slice(4, 15);
  console.log(`\nYou have spent $${totalExpenses} as of ${formattedDate}.\n`);
  // console.log(totalExpenses);
  return totalExpenses;
}

function displayExpenses() {
  console.log(`Your income is set to $${totalIncome} per month.`);
}

function displayIncome(totalIncome) {
  console.log(`Your income is set to $${totalIncome} per month.`);
}

function calculateBalance() {
  let balance = 0;
  let currentDate = new Date();
  const formattedDate = currentDate.toDateString().slice(4, 15);
  const currentExpAmt = calculateTotalExpenses(expenses);
  balance = totalIncome - currentExpAmt;
  console.log(
    `\n Your current balance is $${balance} as of ${formattedDate}.\n`
  );
  return balance;
}
