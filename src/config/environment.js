import fs from 'fs'
import path from 'path'
import chalk from 'chalk' // color text
import { __basedir } from './constants'


/**
 * @param {String} fileName - File or files of Environment configuration.
 * @return {Object} - Environment configuration.
 */


const getEnvConfig = (fileName = 'environment') => {
  /**
   * make a merge configuration object a object merge
   * between global and local json file the base object
   * is the global.
   * @return {Object} - Merged object
   */
  return (() => {
    
    const globalFile = path.join(__basedir, `${fileName}.json`);
    const localFile = path.join(__basedir, `${fileName}.local.json`);
    let globalConfig, localConfig;
    console.log('globalFile ', globalFile)
    if (fs.existsSync(globalFile)) {
      try {
        globalConfig = JSON.parse(fs.readFileSync(globalFile, 'utf8'));
        if (fs.existsSync(localFile)) {
          localConfig = JSON.parse(fs.readFileSync(localFile, 'utf8'));
          let env = {};
          Object.keys(globalConfig).map(prop => (env[prop] = localConfig[prop] || globalConfig[prop]));
          return env;
        } else {
          return globalConfig;
        }
      } catch (error) {
        return { error: error };
      }
    } else { return { error: 'Environment file not found' } }
  })();
};
if (getEnvConfig().error) {
  console.log(
    chalk.red('your environment file have a error ->', getEnvConfig().error)
  );
  process.exit();
}

module.exports = getEnvConfig();