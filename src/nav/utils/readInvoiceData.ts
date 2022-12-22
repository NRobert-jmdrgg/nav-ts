import { InvoiceData } from '../operations/types/invoiceData';
import { base64ToUtf8 } from './base64';

import readFromXml from './readFromXml';

/**
 * Invoice adatok kiolvasása base64 kódolású xml-ből
 * @param base64Xml base64 kódolású xml
 * @returns invoice adatok
 */
export default async function readInvoiceData(
  base64Xml: string
): Promise<InvoiceData | null> {
  if (!base64ToUtf8) {
    return null;
  }

  const xml = base64ToUtf8(base64Xml);

  const invoiceData = await readFromXml<InvoiceData>(xml);

  return invoiceData;
}
