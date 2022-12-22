import { utf8ToBase64 } from './base64';
import writeToXML from './writeToXML';
import { invoiceAnnulment } from '../operations/types/invoiceAnnulment';
import { annulmentOperation } from '../operations/types/options';

type invoiceAnnulmentProps = {
  index: number;
  invoiceAnnulment: invoiceAnnulment;
};
/**
 * ManageInvoiceAnnulement options segédfüggvény
 * @param props indexek és invoiceAnnulment adatokat tartalmazó tömb
 * @returns annulementOperation tömb
 */
export default function createInvoiceAnnulmentOperations(
  props: invoiceAnnulmentProps[]
): annulmentOperation[] {
  return props.map((p) => {
    const xml = writeToXML(p.invoiceAnnulment, 'InvoiceAnnulment');
    const base64string = utf8ToBase64(xml);
    return {
      index: p.index,
      annulmentOperation: 'ANNUL',
      invoiceAnnulment: base64string,
    };
  });
}
