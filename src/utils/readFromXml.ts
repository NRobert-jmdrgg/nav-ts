import xml2js from 'xml2js';

export default async function readFromXml(
  xml: string,
  removeNamespaces: boolean = true,
  explicitArray: boolean = true
) {
  const stripPrefix = xml2js.processors.stripPrefix;
  const parser = new xml2js.Parser({
    explicitRoot: true,
    explicitChildren: explicitArray,
    tagNameProcessors: removeNamespaces ? [stripPrefix] : undefined,
    attrNameProcessors: removeNamespaces ? [stripPrefix] : undefined,
  });

  const result = await parser.parseStringPromise(xml);

  return result;
}
