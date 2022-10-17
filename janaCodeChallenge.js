const data = require( './data/datasmall.json' );
const verbose = true;
const testing = true;

let sortEmployees = ( data ) =>{
    let employees = [];
    let employeeIDs = [];
    // sort by employee
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
    // flag invalid shifts
    for( employee of employees ){
        employee = flagInvalidShifts( employee );
    }
    // testing
    if( testing ) {
        console.log( 'employeeIDs:', employeeIDs );
        console.log( 'employees:', employees );
        for( employee of employees ){
            for( shift of employee.shifts ){
                if( shift.invalid ){
                    console.log( shift );
                }
            }
        }
    }
}



let flagInvalidShifts = ( employee ) => {
    // if( verbose ) console.log( 'in filterInvalidShifts:', employee );
    invalidShifts = [];
    for( let i=0; i< employee.shifts.length; i++  ){
        let shiftAStart = Date.parse( employee.shifts[ i ].StartTime );
        let shiftAEnd = Date.parse( employee.shifts[ i ].EndTime );

        for( let j=i+1; j< employee.shifts.length-1; j++ ){
            let dupeCheckStart = Date.parse( employee.shifts[ j ].StartTime );
            let dupeCheckEnd = Date.parse( employee.shifts[ j ].EndTime );
            if( max(shiftAEnd, dupeCheckEnd) - min(shiftAStart, dupeCheckStart) < (shiftAEnd - shiftAStart) + (dupeCheckEnd - dupeCheckStart) ){
                console.log( 'dupe!', employee.shifts[ i ], employee.shifts [ j ] );
                invalidShifts.push( employee.shifts[ i ].invalid=true );
                invalidShifts.push( employee.shifts[ j ].invalid=true );
            }
        }
    }
    return employee;
} // end filterInvaid


// utils
let convertDate = ( date ) => {
    if( verbose ) console.log( 'in convertDate:', date );
    let calendarDate = date.split( 'T' )[0];
    let time = date.split( 'T' )[1].split( 'Z' )[0];
    return {
        calendarDate: calendarDate,
        day: new Date( date ).getDay(),
        time: time
    }
} //end convert date
let max = ( a, b )=>{
    if( a > b ){
        return a;
    } 
    return b;
} // end max
let min = ( a, b )=>{
    if( a < b ){
        return a;
    } 
    return b;
} // end min


// init
sortEmployees( data );