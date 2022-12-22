import { Builder } from 'xml2js';

export default function writeToXML(obj: any): string {
  const xmlBuilder = new Builder({ cdata: true });

  return xmlBuilder.buildObject(obj);
}
