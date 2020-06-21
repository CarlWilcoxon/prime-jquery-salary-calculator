console.log( 'js' );

//As I add a row, `<tr id="${employeeID}">`
//Intl.NumberFormat to convert to $ and , format
//console.log(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(NUMBER));

$( document ).ready(onReady);

const employeeList = [{
  firstName: 'John',
  lastName: 'Smith',
  employeeID: 1496,
  jobTitle: 'Lumberjack',
  annualSalary: 130000
}, {
  firstName: 'firstName',
  lastName: 'lastName',
  employeeID: 1234,
  jobTitle: 'jobTitle',
  annualSalary: 1234.32
},{
  firstName: 'Jack',
  lastName: 'Slash',
  employeeID: 666,
  jobTitle: 'Bandit',
  annualSalary: 140000
}];
const budget = 20000;

function clearInputs() {
  $('#fullNameIn').val('');
  $('#IDIn').val('');
  $('#jobTitleIn').val('');
  $('#annualSalaryIn').val('');
}//end clearInputs

function getEmployeeInput() {
  event.preventDefault();

  console.log(event.target);
  let fullName = $('#fullNameIn').val().split(' ');
  let firstName = fullName[0];
  let lastName = fullName[1];

  //TODO input validation to make sure that the IDs are unique

  let employeeID = $('#IDIn').val();
  let jobTitle = $('#jobTitleIn').val();
  let annualSalary = $('#annualSalaryIn').val();

  employeeList.push({
    firstName,
    lastName,
    employeeID,
    jobTitle,
    annualSalary
  });
  //clearInputs();
  updateEmployeeTable();
}//end getEmployeeInput


function onReady() {
  console.log('DOM is ready');

  //setup event handlers
  $('#enterButton').on('click', getEmployeeInput);
  $('tbody').on('click', $('.removeButton'), removeEmployee)

  //initial checks
  updateEmployeeTable();
}//end onReady

function removeEmployee(event) {
  console.log('removeEmployee running', event.target);
  
  employeeList.forEach(currentEmployee => {
    //double equals so I don't have to convert str (button id) to int (employee id)
    if (event.target.id.slice(0, -6) == currentEmployee.employeeID) {
    employeeList.splice(employeeList.indexOf(currentEmployee),1);}
  });//end For Each


  $(event.target).parent().parent().remove();
  updateSum();
}//end removeEmployee

function updateEmployeeTable() {
  $('tbody').empty();
  employeeList.forEach(currentEmployee => {
  let formattedSalary = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentEmployee.annualSalary);
  
  $('tbody').append(`<tr id="${currentEmployee.employeeID}row">
  <td>${currentEmployee.firstName}</td>
  <td>${currentEmployee.lastName}</td>
  <td>${currentEmployee.employeeID}</td>
  <td>${currentEmployee.jobTitle}</td>
  <td>${formattedSalary}</td>
  <td><button class="removeButton" id="${currentEmployee.employeeID}button">Remove</button></td>
</tr>`)})//end foreach
updateSum();
}//end updateEmployeeTable

function updateSum() {
  console.log('updateSum running');
  let annualTotal = 0;
  let total = 0;
  
  employeeList.forEach(employee => {
    annualTotal += employee.annualSalary;
  })//end foreach
  
  total = annualTotal/12;

  let formattedTotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total);
  $('#monthlyTotal').empty();
  $('#monthlyTotal').append(formattedTotal);

  //compare the total monthly salaries to the budget 
  if (total > budget && !($('#monthlyTotal').hasClass('overBudget'))) {
    $('#monthlyTotal').removeClass('atBudget underBudget').addClass('overBudget');
  } else if (total === budget && !($('#monthlyTotal').hasClass('atBudget'))) {
    $('#monthlyTotal').removeClass('overBudget underBudget').addClass('atBudget');
  } else if (total < budget && !($('#monthlyTotal').hasClass('underBudget'))) {
    $('#monthlyTotal').removeClass('atBudget overBudget').addClass('underBudget');
  }
}//end update Sum
