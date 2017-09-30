/**
 This tool is intended to generate a table from with the import of config information and relevant data.*/

/**
 * The purpose of this function is to dynamically generate a basic table structure based on an array of objects
 * @param cols
 * @param dataObj
 */
function buildTable(cols, dataObjArray, $targetDiv) {

//Create the header row
    var $newTHead = $('<thead>');
    var $newRow = $('<tr>');

    for (var i = 0; i < cols.length; i++){
        var $newCol1 = $('<td>');
        $newCol1.text(cols[i]);
        $newRow.append($newCol1);
    }
    $newTHead.append($newRow);

    //Create the Table Body
    var $newTBody = $('<tbody>');
    //Add a row
    for (var i = 0; i < dataObjArray.length; i++){

        for (var i = 0; i < cols.length; i++){

            var $newCol1 = $('<td>');
            $newCol1.text(cols[i]);
            $newRow.append($newCol1);
        }
        $newTHead.append($newRow);
    }


    //Add the Table Rows

    $targetDiv.append($newTHead);
    $targetDiv.append($newTBody);
}


buildTable(["Name", "DOB", "Weight"],
    [{
        name: "Bernard Williams",
        dob: "01/017/1969",
        weight: "212"
    },
        {
            name: "Karen Williams",
            dob: "01/017/1969",
            weight: "212"
        },
        {
            name: "peter Williams",
            dob: "01/017/1969",
            weight: "212"
        },
        {
            name: "Jason Williams",
            dob: "01/017/1969",
            weight: "212"
        },
    ]);