import * as XLSX from 'xlsx';

/**
 * Export data to Excel file
 * @param {Array} data - Array of objects to export
 * @param {String} fileName - Name of the file (without extension)
 * @param {String} sheetName - Name of the sheet in Excel
 */
export const exportToExcel = (data, fileName = 'export', sheetName = 'Sheet1') => {
  try {
    // Create worksheet from data
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    
    // Generate and download file
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
    
    return true;
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    return false;
  }
};

/**
 * Export members data to Excel
 * @param {Array} members - Array of member objects
 */
export const exportMembersToExcel = (members) => {
  const formattedData = members.map(member => ({
    'First Name': member.firstName,
    'Last Name': member.lastName,
    'Email': member.email,
    'Major': member.major,
    'Graduation Year': member.graduationYear,
    'Phone Number': member.phoneNumber,
    'Role': member.role,
    'Payment Status': member.paymentStatus === 'paid' ? 'Paid' : 'Not Paid',
    'Member Since': new Date(member.createdAt).toLocaleDateString(),
  }));
  
  return exportToExcel(
    formattedData, 
    `GSCMA_Members_${new Date().toISOString().split('T')[0]}`,
    'Members'
  );
};

/**
 * Export event attendees to Excel
 * @param {Array} attendees - Array of attendee objects
 * @param {String} eventName - Name of the event
 */
export const exportAttendeesToExcel = (attendees, eventName) => {
  const formattedData = attendees.map((attendee, index) => ({
    'No.': index + 1,
    'Name': attendee.userName,
    'RSVP Date': new Date(attendee.rsvpDate).toLocaleDateString(),
    'RSVP Time': new Date(attendee.rsvpDate).toLocaleTimeString(),
  }));
  
  const sanitizedEventName = eventName.replace(/[^a-z0-9]/gi, '_');
  
  return exportToExcel(
    formattedData,
    `${sanitizedEventName}_Attendees_${new Date().toISOString().split('T')[0]}`,
    'Attendees'
  );
};
