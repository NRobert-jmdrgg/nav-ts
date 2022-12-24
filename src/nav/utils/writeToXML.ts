import { isNil, omitBy } from 'lodash';
import { Builder } from 'xml2js';

/**
 * Tetszőleges object kiírása xml-be
 * @param obj tetszőleges object
 * @param rootname root neve
 * @param removeNil undefined vagy null értékeket ne írja bele
 * @returns xml dokumentum string
 */
export default function writeToXML(
  obj: any,
  rootname?: string,
  removeNil = true
): string {
  let options;

  if (rootname) {
    options = { rootName: rootname };
  }

  if (removeNil) {
    obj = omitBy(obj, isNil);
  }

  const xmlBuilder = new Builder(options);

  return xmlBuilder.buildObject(obj);
}
