import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import { QueryInvoiceCheckOptions } from './types/options';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendRequest from '../sendRequest';
import { QueryInvoiceCheckResponse } from './types/response';
import { pick } from 'lodash';
import writeToXML from '../utils/writeToXML';

/**
 * Számlaszám alapján működő lekérdező operáció. Az operáció a megadott számlaszámról szóló adatszolgáltatás
létezését ellenőrzi a rendszerben, a számla teljes adattartalmának visszaadása nélkül.
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param options konfigurációs object
 * @returns adatszolgáltatás létezik-e és result érték
 */
export default async function queryInvoiceCheck(
  user: User,
  software: Software,
  options: QueryInvoiceCheckOptions,
  returnWithXml?: boolean
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

  const requestXml = writeToXML(request);
  const response = await sendRequest<QueryInvoiceCheckResponse>(
    requestXml,
    'queryInvoiceCheck',
    returnWithXml
  );

  if (response.parsedResponse) {
    if (returnWithXml) {
      return {
        invoiceCheckResult: response.parsedResponse.invoiceCheckResult,
        responseXml: response.responseXml,
        requestXml: requestXml,
      };
    }

    return {
      invoiceCheckResult: response.parsedResponse.invoiceCheckResult,
    };
  }

  return null;
}
