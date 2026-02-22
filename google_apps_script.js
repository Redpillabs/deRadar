
// COPY THIS CODE INTO YOUR GOOGLE SHEETS > EXTENSIONS > APPS SCRIPT
// IMPORTANT: AFTER PASTING, CLICK "DEPLOY" > "NEW DEPLOYMENT"

// 1. Handle GET requests (for browser testing)
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    "status": "active",
    "message": "The script is running correctly. Send a POST request to submit data."
  })).setMimeType(ContentService.MimeType.JSON);
}

// 2. Handle POST requests (form submissions)
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Wait up to 10 seconds for other processes
  
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get Sheets
    var sheetFounders = spreadsheet.getSheetByName("Founders");
    var sheetWorker = spreadsheet.getSheetByName("Talent");
    
    // Validate Sheets Exist
    if (!sheetFounders || !sheetWorker) {
      return ContentService.createTextOutput(JSON.stringify({
        "result": "error",
        "message": "Sheets 'Founders' or 'Talent' not found in the spreadsheet."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var params = e.parameter;
    var type = params.type;
    var timestamp = new Date();
    
    if (type == 'founder') {
      // Founders Columns: Timestamp, Telegram, Twitter, Email, Project Name, Website, Category, Description, Services Needed, Budget, Outcome, Timeline, Urgency
      sheetFounders.appendRow([
        timestamp,
        params.telegram || '',
        params.twitter || '',
        params.email || '',
        params.projectName || '',
        params.website || '',
        params.category || '',
        params.description || '',
        params.services || '',
        params.budget || '',
        params.outcome || '',
        params.timeline || '',
        params.urgency || ''
      ]);
    } else if (type == 'worker') {
      // Talent Columns: Timestamp, Twitter, Telegram, Email, Region, Niches, Best Post, Avg Impressions, Engagement Rate, Screenshot, Collaboration Pref, Contribution
      sheetWorker.appendRow([
        timestamp,
        params.twitter || '',
        params.telegram || '',
        params.email || '',
        params.region || '',
        params.niches || '',
        params.bestPost || '',
        params.impressions || '',
        params.engagement || '',
        params.screenshot || '',
        params.collab || '',
        params.contribution || ''
      ]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({"result":"success"})).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"result":"error", "error": error.toString()})).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
