const util = require("util");
const exec = util.promisify(require('child_process').exec);

module.exports = async function command(str) {
  try {
    return stdout = await exec(str);
  }
  catch (error) {
    return 1; 
  }
}

