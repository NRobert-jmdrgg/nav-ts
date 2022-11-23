import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import { QueryInvoiceDataOptions } from './types/options';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendRequest from '../sendRequest';
import { QueryInvoiceDataResponse } from './types/response';
import { pick } from 'lodash';
import writeToXML from '../utils/writeToXML';

/**
 * Egy számlaszám alapján működő lekérdező operáció. Az operáció a megadott számlaszám teljes adattartalmát adja
vissza a válaszban.
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param options konfigurációs object
 * @returns számla adatok és result érték
 */
export default async function queryInvoiceData(
  user: User,
  software: Software,
  options: QueryInvoiceDataOptions,
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

  const requestXml = writeToXML(request);
  const response = await sendRequest<QueryInvoiceDataResponse>(
    requestXml,
    'queryInvoiceData',
    returnWithXml
  );

  if (response.parsedResponse) {
    if (returnWithXml) {
      return {
        invoiceDataResult:
          response.parsedResponse.QueryInvoiceDataResponse.invoiceDataResult,
        responseXml: response.responseXml,
        requestXml: requestXml,
      };
    }

    return {
      invoiceDataResult:
        response.parsedResponse.QueryInvoiceDataResponse.invoiceDataResult,
    };
  }

  return null;
}
