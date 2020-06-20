console.log( 'js' );

//As I add a row, `<tr id="${employeeID}">`
//Intl.NumberFormat to convert to $ and , format
//console.log(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(NUMBER));

$( document ).ready(onReady);

const employeeList = [];

function clearInputs() {
  $('#fullNameIn').val('');
  $('#IDIn').val('');
  $('#jobTitleIn').val('');
  $('#annualSalaryIn').val('');
}

function getEmployeeInput() {
  
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
  clearInputs();
  updateEmployeeTable();
}


function onReady() {
  console.log('DOM is ready');

  //setup event handlers
  $('#enterButton').on('click', getEmployeeInput);
  $('tbody').on('click', $('.removeButton'), removeEmployee)
}

function removeEmployee(event) {
  console.log('removeEmployee running', event.target);
  $(event.target).parent().parent().remove();
}

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
</tr>`)});

updateSum();
}

function updateSum() {
  let annualTotal = 0;
  let monthlyTotal = 0;
  employeeList.forEach(currentEmployee => {
    annualTotal += currentEmployee.annualSalary;
  })
  monthlyTotal = annualTotal/12;
  let formattedTotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(monthlyTotal);
  $('#monthlyTotal').append(formattedTotal)
}
