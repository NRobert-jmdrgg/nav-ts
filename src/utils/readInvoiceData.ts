import { InvoiceData } from '../operations/types/invoiceOperation';
import { base64ToUtf8 } from './base64';

import readFromXml from './readFromXml';

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
