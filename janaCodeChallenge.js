const data = require( './data/datasmall.json' );
const verbose = true;

let sortEmployees = ( data ) =>{
    let employees = [];
    let employeeIDs = [];
    for( record of data ){
        if( employeeIDs.includes( record.EmployeeID ) ){
            if( verbose ) console.log( 'repeat employeeID:', record ); 
            employees[ employeeIDs.indexOf( record.EmployeeID ) ].shifts.push( record );
        } // end new employee
        else{
            if( verbose ) console.log( 'new employeeID' ); 
            employeeIDs.push( record.EmployeeID );
            employees.push( {
                EmployeeID: record.EmployeeID,
                shifts: [ record ]
            });
        } // end new employee
    }
    console.log( 'employeeIDs:', employeeIDs );
    console.log( 'employees:', employees );
}

sortEmployees( data );