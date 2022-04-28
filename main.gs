const SLEEP_COL = 1;
const FORMULA_COL = 3;
const DETAILS_COL = 2;
const FIRST_SLEEP_ROW_TO_PROCESS = 2;

const SLEEP_PROCESSED_UNTIL_ROW = "sleepProcessedUntilRow";

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Sleep tracker')
      .addItem('Run', 'main')
      .addToUi();
}

function main() {

  var spreadsheet = SpreadsheetApp.getActiveSheet();
  var calendarId = spreadsheet.getRange("cal_id!A2").getValue();

  var currentSleepRow = FIRST_SLEEP_ROW_TO_PROCESS;
  let sleepProcessedUntilRow = spreadsheet.getRange("cal_id!B2");

  if(sleepProcessedUntilRow.getValue() != "")
  {
    currentSleepRow = parseInt(sleepProcessedUntilRow.getValue());
  }

  Logger.log(`Starting processing sleep data from row ${currentSleepRow}`);

  var eventCal = CalendarApp.getCalendarById(calendarId);

  if(!eventCal)
  {
    Logger.log("Invalid calendar ID");
    return;
  }

  let sleep = spreadsheet.getRange(currentSleepRow, SLEEP_COL);
  let formula_ml = spreadsheet.getRange(currentSleepRow, FORMULA_COL);
  let details = spreadsheet.getRange(currentSleepRow, DETAILS_COL);

  Logger.log(`Sleep: ${sleep.getValue()}, Formula (ml): ${formula_ml.getValue()}, Details: ${details.getValue()}`);
  while(sleep.getValue() !== "" && formula_ml.getValue() !== "" && details.getValue() !== "")
  {
    eventCal.createEvent(`${formula_ml.getValue()} ml, ${details.getValue()}`, sleep.getValue(), sleep.getValue());
    sleep.setBackgroundRGB(200, 200, 200);

    currentSleepRow++;
    sleep = spreadsheet.getRange(currentSleepRow, SLEEP_COL);
    formula_ml = spreadsheet.getRange(currentSleepRow, FORMULA_COL);
    details = spreadsheet.getRange(currentSleepRow, DETAILS_COL);
  }

  sleepProcessedUntilRow.setValue(currentSleepRow);
  Logger.log(`Current Sleep Row: ${currentSleepRow}`);
}
