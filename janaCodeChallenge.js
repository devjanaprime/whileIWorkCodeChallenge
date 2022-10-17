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
    console.log( employees[0].shifts[0].EndTime, employees[0].shifts[0].StartTime );
    /// - tests - ///
    console.log( convertDate( employees[0].shifts[0].StartTime ) );
    console.log( convertDate( employees[0].shifts[0].EndTime ) );
    console.log( convertDate( employees[0].shifts[1].StartTime ) );
    console.log( convertDate( employees[0].shifts[1].EndTime ) );
}

let convertDate = ( date ) => {
    if( verbose ) console.log( 'in convertDate:', date );
    let calendarDate = date.split( 'T' )[0];
    let time = date.split( 'T' )[1].split( 'Z' )[0];
    return {
        calendarDate: calendarDate,
        day: new Date( date ).getDay(),
        time: time
    }
}


sortEmployees( data );