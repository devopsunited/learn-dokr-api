const util = require("util");
// you may improve by reading the nodeJS doc for exec
// https://nodejs.org/docs/latest/api/child_process.html#child_process_child_process_exec_command_options_callback
const exec = util.promisify(require('child_process').exec);

module.exports = async function command(str) {
  try {
    // this sed-command will not work on windows
    const result = await exec(str + ` | sed -E -e 's/  +/  /g'`);

    result.stdout = toArrayOfObjects(result.stdout)
    result.stderr = result.stderr.split("\n") 
    
    return result
  }
  catch (error) {
    return error.code; 
  }
}

toArrayOfObjects = (input) => {
  let objectFormat = [];

  input = input
  // make array of lines
    .split("\n")

  // remove empty lines
    .filter(i => i.length)

  // split each line, into array of fields
  // our fields are delimited with 2 spaces (this was done earlier with sed in bash)
    .map((i, idx) => {
      i = i.split('  ').filter(x => x.length);
      return i;
    });

  let [columnHeaders, ...columns] = input;

  // columnHeaders are future JS-objects' properties, so no whitespace is allowed here:
  columnHeaders = columnHeaders.map(header => header.replace(" ", "_"))

  for (let idx = 0; idx < columns.length; idx++) {

    let newObj = {};

    for (let index = 0; index < columnHeaders.length; index++) {

      let value = columns[idx][index];
      newObj[columnHeaders[index]] = value;

    }

    objectFormat.push(newObj);

  }

  return objectFormat; 

}

