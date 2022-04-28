# Baby Sleep Tracker
A simple sleep tracker for your baby - built on top of Google Workspace (Sheets & Calendar glued by Apps Script)

You fill in the time of the wake up of the baby and the details of what followed (feeding, nappy change, etc) and the script will create a corresponding event on a Google Calendar of your choice.

# How to use
1. Make a copy of: https://docs.google.com/spreadsheets/d/1hWtdFE84Qnqopt1i_lcn0_iAbq1ggCADRWARG4dWkDE/edit?usp=sharing

2. Go to **Extensions -> Apps Script** and paste the code found in the **main.gs** file.

3. Create the trigger (the script will run when you edit the sheet, either form the web or mobile apps)
   * While in the Apps Script, go to **Triggers** (on the left) and **Create a new trigger** (or **Add Trigger**).
   * Select the _main_ function as the function to run.
   * Select _On edit_ as the event type.
   * **Save**
   * Authorize the script to run on your account (follow the pop-ups provided by Google).

4. Create the calendar where the events will be created. Please create a different calendar than your daily one since the script might be buggy and in the future you might want to hide all those "diaper changed" events from your main calendar!
    * Go to https://calendar.google.com and create a new calendar
    * Go to the calendar's **Settings**
    * Copy the **Calendar ID**
    * Paste the calendar id into the _cal_id_ sheet in cell `A2` (leave `B2` empty).

5. The `Sleep` sheet will contain the sleep _Wake up_ times with the _Details_ (for example if breastfed or if a certain event happened - like pee/poo) and with the amount of _Formula_ the baby was fed.

    In order for the calendar event to be created all three columns must be filled in (fill in `0` if no formula was given to the baby on a wake up event).

    The event will be created at _Wake up_ and will have the name formed by concatenating the _Details_ and _Formula_ columns (with not particular meaning other than they both should be filled in)

    When an event is created (after each full edit of the three columns), the background color of the corresponding _Wake up_ cell will be set to gray and the row counter in the `cal_id!B2` cell will be automatically set to the next row to be processed.

6. Repeat step 5 until your baby grows up :-)



# How I use it

I/Wife use our phones in the middle of the night to fill in in the info according to step 5. We do this easily by creating a shortcut of the sheet from the Google Sheet app on our home screens. (note to iOS users: https://apple.stackexchange.com/questions/285696/create-google-sheets-shortcut-in-homescreen and https://www.reddit.com/r/shortcuts/comments/9n2iso/shortcut_to_open_a_specific_google_sheet_within/).

We make use of the _Week_ view of the calendar to see how the sleep of our baby changed in a period of time.

Optional: If after editing the sheet, the events are not automatically created, there is a **Sleep Tracker -> Run** button in the toolbar that can force the script to run, but the button is only accessible from the web interface of the Google Sheets app.

# Improvements

* form for easy filling
* deployment :-)
* update old calendar events (in case of typos for example) without having to delete them and manually modify the `cal_id!B2` cell to force the script to re-read the rows and re-create the events

# References

* https://cloud.google.com/blog/products/g-suite/g-suite-pro-tip-how-to-automatically-add-a-schedule-from-google-sheets-into-calendar

# MIT License

Copyright (c) 2022 Barbu Paul - Gheorghe

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.