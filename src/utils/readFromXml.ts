import xml2js from 'xml2js';

/**
 * Olvasás XML fájlból
 * @param xml xml string
 * @param removeNamespaces törölje-e a namespace-ket
 * @param explicitArray értékeket tömbben adja-e vissza
 * @returns js object.
 */
export default async function readFromXml<R>(
  xml: string,
  explicitRoot: boolean = false,
  explicitArray: boolean = true,
  removeNamespaces: boolean = true
): Promise<R> {
  const stripPrefix = xml2js.processors.stripPrefix;
  const parser = new xml2js.Parser({
    explicitRoot: explicitRoot,
    explicitArray: explicitArray,
    tagNameProcessors: removeNamespaces ? [stripPrefix] : undefined,
    attrNameProcessors: removeNamespaces ? [stripPrefix] : undefined,
  });

  const result = await parser.parseStringPromise(xml);

  return result;
}
