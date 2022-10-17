const data = require( './data/dataset.json' );
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
    for( employee of employees ){
        filterInvalidShifts( employee );
    }
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

let filterInvalidShifts = ( employee ) => {
    // if( verbose ) console.log( 'in filterInvalidShifts:', employee );
    remove = [];
    for( let i=0; i< employee.shifts.length; i++  ){
        let shiftAStart = Date.parse( employee.shifts[ i ].StartTime );
        let shiftAEnd = Date.parse( employee.shifts[ i ].EndTime );

        for( let j=i+1; j< employee.shifts.length-1; j++ ){
            let dupeCheckStart = Date.parse( employee.shifts[ j ].StartTime );
            let dupeCheckEnd = Date.parse( employee.shifts[ j ].EndTime );
            if( max(shiftAEnd, dupeCheckEnd) - min(shiftAStart, dupeCheckStart) < (shiftAEnd - shiftAStart) + (dupeCheckEnd - dupeCheckStart) ){
                console.log( 'dupe!', employee.shifts[ i ], employee.shifts [ j ] );
                remove.push( employee.shifts[ i ] );
                remove.push( employee.shifts[ j ] );
            }
        }
    }
    if( verbose && remove.length > 0 ) console.log( 'removing invalid shifts:', remove, 'from employee:', employee );
}

let max = ( a, b )=>{
    if( a > b ){
        return a;
    } 
    return b;
}
let min = ( a, b )=>{
    if( a < b ){
        return a;
    } 
    return b;
}
sortEmployees( data );