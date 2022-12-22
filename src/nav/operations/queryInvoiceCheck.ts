import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import { QueryInvoiceCheckOptions } from './types/options';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendNavRequest from '../sendNavRequest';
import { QueryInvoiceCheckResponse } from './types/response';
import { pick } from 'lodash';
import writeToXML from '../utils/writeToXML';

/**
 * Számlaszám alapján működő lekérdező operáció. Az operáció a megadott számlaszámról szóló adatszolgáltatás
létezését ellenőrzi a rendszerben, a számla teljes adattartalmának visszaadása nélkül.
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param options konfigurációs object
 * @param returnWithXml Ha igaz, akkor a request és response xml-t is visszaadja.
 * @returns adatszolgáltatás létezik-e és result érték
 */
export default async function queryInvoiceCheck(
  user: User,
  software: Software,
  options: QueryInvoiceCheckOptions,
  returnWithXml = true
) {
  // sorrend
  options.invoiceNumberQuery = pick(options.invoiceNumberQuery, [
    'invoiceNumber',
    'invoiceDirection',
    'batchIndex',
    'supplierTaxNumber',
  ]);

  // request létrehozása
  const request = createRequest(
    'QueryInvoiceCheckRequest',
    user,
    software,
    options
  );

  // request signature létrehozása
  request['QueryInvoiceCheckRequest']['common:user'][
    'common:requestSignature'
  ]._ = createRequestSignature(
    request['QueryInvoiceCheckRequest']['common:header']['common:requestId'],
    request['QueryInvoiceCheckRequest']['common:header']['common:timestamp'],
    user.signatureKey
  );

  const response = await sendNavRequest<QueryInvoiceCheckResponse>(
    writeToXML(request),
    'queryInvoiceCheck',
    returnWithXml
  );

  return response.data
    ? {
        header: response.data.header[0],
        result: response.data.result[0],
        Software: response.data.software[0],
        invoiceCheckResult: response.data.invoiceCheckResult[0],
        responseXml: response.responseXml,
        requestXml: response.requestXml,
      }
    : null;
}
