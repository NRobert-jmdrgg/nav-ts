import { utf8ToBase64 } from './base64';
import writeToXML from './writeToXML';
import { invoiceAnnulment } from '../operations/types/invoiceAnnulment';
import { annulmentOperation } from '../operations/types/options';

type invoiceAnnulmentProps = {
  index: number;
  invoiceAnnulment: invoiceAnnulment;
};

export default function createInvoiceAnnulmentOperations(
  props: invoiceAnnulmentProps[]
): annulmentOperation[] {
  let annulmentArray: annulmentOperation[] = [];
  props.forEach((p) => {
    const xml = writeToXML(p.invoiceAnnulment);
    console.log(xml);
    const base64string = utf8ToBase64(xml);
    annulmentArray.push({
      index: p.index,
      annulmentOperation: 'ANNUL',
      invoiceAnnulment: base64string,
    });
  });

  return annulmentArray;
}
