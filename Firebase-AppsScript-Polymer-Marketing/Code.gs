// INSTRUCTIONS:

// see https://sites.google.com/site/scriptsexamples/new-connectors-to-google-services/firebase 
// FirebaseApp library needed id = "MYeP8ZEEt1ylVDxS7uyg9plDOcoke7-2l"

// Set up your own sheet for writing.  You will not be able to write to this one.  
var SHEETID = "1kcoi0HKFz20U5VXFIzb9zaQvoyeT6owfHdLrPfW-kJg";

// update all the YOUR-xxx's in this file.
  
  
  /**
  * Serves HTML of the application for HTTP GET requests.
  * If folderId is provided as a URL parameter, the web app will list
  * the contents of that folder (if permissions allow). Otherwise
  * the web app will list the contents of the root folder.
  *
  * @param {Object} e event parameter that can contain information
  *     about any URL parameters provided.
  */
function doGet(e) {
  var template = HtmlService.createTemplateFromFile('Index');
  // Build and return HTML in IFRAME sandbox mode.
  return template.evaluate()
  //.setTitle('Simple Form Marketing')
  .setTitle('RockapulcoRun')
  .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function processForm(formObject) {
  
  var spreadsheet = SpreadsheetApp.openById(SHEETID);
  var spreadsheettest = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log("qqq: spreadsheettest: " + spreadsheettest);
  try{
    var spreadsheettest2 = SpreadsheetApp.openById('ID');
    Logger.log("qqq: spreadsheettest2: " + spreadsheettest2);
  }catch(e){}
  var sheet;
  
  if (spreadsheet !== null){
    sheet = spreadsheet.getSheetByName("DATA1");
  }
  formObject['createdmillis']=new Date().getTime();
  formObject['created']=new Date();
  if (sheet !== undefined && sheet !== null){
    sheet.appendRow([JSON.stringify(formObject)]);
  }
  
  var firebase = FirebaseApp.getDatabaseByUrl("https://YOUR-FIREBASE.firebaseio.com/", "YOUR-ADMIN-SECRET");
  
  // where in the firebase to write e.g., marketing
  Logger.log(firebase.pushData("YOUR-TREE-LOCATION", JSON.stringify(formObject)));
  
  return; 
}
