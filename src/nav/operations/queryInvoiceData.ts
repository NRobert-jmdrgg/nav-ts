import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import { QueryInvoiceDataOptions } from './types/options';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendNavRequest from '../sendNavRequest';
import { QueryInvoiceDataResponse } from './types/response';
import { pick } from 'lodash';
import writeToXML from '../utils/writeToXML';

/**
 * Egy számlaszám alapján működő lekérdező operáció. Az operáció a megadott számlaszám teljes adattartalmát adja
vissza a válaszban.
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param options konfigurációs object
 * @param returnWithXml Ha igaz, akkor a request és response xml-t is visszaadja.
 * @returns számla adatok és result érték
 */
export default async function queryInvoiceData(
  user: User,
  software: Software,
  options: QueryInvoiceDataOptions,
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
    'QueryInvoiceDataRequest',
    user,
    software,
    options
  );

  // request signature létrehozása
  request['QueryInvoiceDataRequest']['common:user'][
    'common:requestSignature'
  ]._ = createRequestSignature(
    request['QueryInvoiceDataRequest']['common:header']['common:requestId'],
    request['QueryInvoiceDataRequest']['common:header']['common:timestamp'],
    user.signatureKey
  );

  const response = await sendNavRequest<QueryInvoiceDataResponse>(
    writeToXML(request),
    'queryInvoiceData',
    returnWithXml
  );

  return response.parsedResponse
    ? {
        header: response.parsedResponse.header[0],
        result: response.parsedResponse.result[0],
        Software: response.parsedResponse.software[0],
        invoiceDataResult: response.parsedResponse.invoiceDataResult?.[0],
        responseXml: response.responseXml,
        requestXml: response.requestXml,
      }
    : null;
}
