import { Builder } from 'xml2js';

/**
 * Tetszőleges object kiírása xml-be
 * @param obj tetszőleges object
 * @returns xml dokumentum string
 */
export default function writeToXML(obj: any): string {
  const xmlBuilder = new Builder({ cdata: true });

  return xmlBuilder.buildObject(obj);
}
