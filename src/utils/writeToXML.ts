import xml2js from 'xml2js';
import fs from 'fs';

export default function writeToXML(obj: any): string {
  const xmlBuilder = new xml2js.Builder({ cdata: true });

  let xml = xmlBuilder.buildObject(obj);
  // teszt
  fs.writeFileSync('./test2.xml', xml);
  return xml;
}
