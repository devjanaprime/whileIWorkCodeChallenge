////////////////////////////////////////////////////
// dEv jAna When I Work Code Challenge 10-17-2022 //
////////////////////////////////////////////////////


const data = require( './data/datasmall.json' );
const verbose = false;
const testing = false;

let calculateEmployeeShifts = ( data ) =>{
   let employees = filterByEmployeeId();
    // flag invalid shifts
    for( employee of employees ){
        employee = flagInvalidShifts( employee );
        employee = employeeShiftHours( employee );
    }
    // testing
    if( testing ) {
        console.log( '------------- test output ----------')
        for( shift of employees[ 25 ].shifts ){
            console.log( shift );
        }
    }
    return employees;
}

let filterByEmployeeId = () =>{
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
    return employees;
}

let flagInvalidShifts = ( employee ) => {
    if( verbose ) console.log( 'in filterInvalidShifts:', employee );
    for( let i=0; i< employee.shifts.length; i++  ){
        let shiftStart = Date.parse( employee.shifts[ i ].StartTime );
        let shiftEnd = Date.parse( employee.shifts[ i ].EndTime );
        // format check 
        if( !dateFormat( employee.shifts[ i ].StartTime ) || !dateFormat( employee.shifts[ i ].EndTime ) ){
            employee.shifts[ i ].invalid = true; 
        }
        // dupe check
        for( let j=i+1; j< employee.shifts.length-1; j++ ){
            // check for dupes
            let dupeCheckStart = Date.parse( employee.shifts[ j ].StartTime );
            let dupeCheckEnd = Date.parse( employee.shifts[ j ].EndTime );
            if( Math.max( shiftStart, dupeCheckStart ) < Math.min( shiftEnd, dupeCheckEnd ) ){
                if( verbose ) console.log( 'dupe!', employee.shifts[ i ], employee.shifts [ j ] );
                employee.shifts[ i ].invalid=true;
                employee.shifts[ j ].invalid=true;
            }
        }
    }
    return employee;
} // end filterInvaid

let employeeShiftHours = ( employee ) =>{
    if( verbose ) console.log( 'in employeeShiftHours:', employee.shifts );
    employee.shifts.sort( ( a, b ) => ( Date.parse( a.StartTime ) > Date.parse( b.EndTime ) ) ? 1 : -1 );
    /// - TODO: split by week of month - ///
    for( let i=0; i< employee.shifts.length; i++ ){
        if( !employee.shifts[ i ].invalid ){
            const shift = employee.shifts[ i ];
            let shiftHours = 0;
            let month = shift.StartTime.split( '-' )[1];
            if( verbose ) console.log( 'month:', Number( month ) );
            let startDate = shift.StartTime.split( '-' )[2].split( 'T' )[0];
            if( verbose )console.log( 'start date:', startDate );
            let startTime = shift.StartTime.split( '-' )[2].split( 'T' )[1].split( '.' )[0];
            if( verbose )console.log( 'start time:', startTime );
            let endDate = shift.EndTime.split( '-' )[2].split( 'T' )[0];
            if( verbose )console.log( 'end date:', endDate );
            let endTime = shift.EndTime.split( '-' )[2].split( 'T' )[1].split( '.' )[0];
            if( verbose )console.log( 'end time:', endTime );
            const startTimeHours = Number( startTime.split( ':' )[0] );
            const startTimeMinutes = Number( startTime.split( ':' )[1] );
            const endTimeHours = Number( endTime.split( ':' )[0] );
            const endTimeMinutes = Number( endTime.split( ':' )[1] );

            if( Number( startDate ) === Number( endDate -1 ) ){
                shiftHours = ( 24 - ( startTimeHours + ( startTimeMinutes / 60 ) ) + endTimeHours + ( endTimeMinutes / 60 ) );
            } //end wrap around
            else{
                shiftHours = ( endTimeHours + ( endTimeMinutes / 60 ) ) - ( startTimeHours + ( startTimeMinutes / 60 ) ); 
            }
            employee.shifts[ i ].hours = shiftHours;
        } // end invalid check
    } // end shift hours
    return employee;
} // end employeeShiftHours

// utils
let dateFormat = ( date ) => {
    if( date === null ) return false;
    if( verbose ) console.log( '======================= checking date format :', date );
    if( date.indexOf( '-' ) != 4 || date.indexOf( 'T' ) != 10 || date.indexOf( ':' ) != 13 ){
        if( verbose ) console.log( '---------------------------- invalid date:', date );
        return false;
    }
    if( verbose ) console.log( 'valid date' );
    return true;
}

// init
console.log( calculateEmployeeShifts( data ) );