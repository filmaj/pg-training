/*  when we have more complex, self-contained logic, it's a good idea to
    separate it into multiple JavaScript functions  */
    
var myDatabase;

function initializeDatabase() {
  myDatabase = openDatabase(
    "pg-training",            // short name
    "1.0",                    // version number
    "PhoneGap Training App",  // long name
    10000);                 // database size
    
  myDatabase.transaction(function (transaction) {
    transaction.executeSql(
      "CREATE TABLE IF NOT EXISTS settings " + 
        "(settingName NVARCHAR(10), settingValue NVARCHAR(10));",
      [], // any parameters for the query,
      function (transaction, resultSet) {
        // a success callback
      },
      function (transaction, error) {
        alert('There has been a query error:' + error.message);
      }
    )
  },
  // error callback
  function (error) {
    alert('There has been a transaction error:' + error.messaage);
  }); // If we want, we can put a success callback here also
}

function updateDatabase(settings) {
  myDatabase.transaction(function (transaction) {
    var setting;
    for (setting in settings) {
      transaction.executeSql(
        "INSERT OR REPLACE INTO settings (settingName, settingValue)" +
        "VALUES (?,?);",
        [setting, settings[setting]],
        function (transaction, resultSet) {
          // a success callback
        },
        function (transaction, error) {
          alert('There has been a query error:' + error.message);
        }
      )
    }
  })
}

function getAllSettings(callback) {
  myDatabase.transaction(function (transaction) {
    var settings = {};
    transaction.executeSql(
      "SELECT * FROM settings", [],
      function (transaction, resultSet) {
        var i = 0;
        for (i; i<resultSet.rows.length; i++) {
          var currentRow = resultSet.rows.item(i);
          settings[currentRow.settingName] = currentRow.settingValue;
        }
        callback(settings);
      },
      function (transaction, error) {
        alert('There has been a query error:' + error.message);
      }
    );
  })
}

function nuke() {
    myDatabase.transaction( function(transaction) {
        transaction.executeSql( "DELETE FROM settings", [], function() {}, function() {});
    });
}