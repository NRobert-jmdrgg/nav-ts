import { Builder } from 'xml2js';

/**
 * Tetszőleges object kiírása xml-be
 * @param obj tetszőleges object
 * @returns xml dokumentum string
 */
export default function writeToXML(obj: any, rootname?: string): string {
  let options;

  if (rootname) {
    options = { rootName: rootname };
  }

  const xmlBuilder = new Builder(options);

  return xmlBuilder.buildObject(obj);
}
