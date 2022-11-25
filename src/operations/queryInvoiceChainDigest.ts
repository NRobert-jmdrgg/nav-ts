import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import { QueryInvoiceChainDigestOptions } from './types/options';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendRequest from '../sendRequest';
import { QueryInvoiceChainDigestResponse } from './types/response';
import { pick } from 'lodash';
import writeToXML from '../utils/writeToXML';

/**
 * Az operáció a megadott keresőfeltételeknek megfelelő, lapozható számlalistát ad vissza a válaszban. A lista elemei a megadott alapszámlához tartozó számlalánc elemei
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param options konfigurációs object
 * @returns számlalánc és result érték
 */
export default async function queryInvoiceChainDigest(
  user: User,
  software: Software,
  options: QueryInvoiceChainDigestOptions,
  returnWithXml?: boolean
) {
  // sorrend
  options.invoiceChainQuery = pick(options.invoiceChainQuery, [
    'invoiceNumber',
    'invoiceDirection',
    'taxNumber',
  ]);

  // request létrehozása
  const request = createRequest(
    'QueryInvoiceChainDigestRequest',
    user,
    software,
    pick(options, ['page', 'invoiceChainQuery'])
  );

  // request signature létrehozása
  request['QueryInvoiceChainDigestRequest']['common:user'][
    'common:requestSignature'
  ]._ = createRequestSignature(
    request['QueryInvoiceChainDigestRequest']['common:header'][
      'common:requestId'
    ],
    request['QueryInvoiceChainDigestRequest']['common:header'][
      'common:timestamp'
    ],
    user.signatureKey
  );

  const requestXml = writeToXML(request);
  const response = await sendRequest<QueryInvoiceChainDigestResponse>(
    requestXml,
    'queryInvoiceChainDigest',
    returnWithXml
  );

  if (response.parsedResponse) {
    if (returnWithXml) {
      return {
        invoiceChainDigestResult:
          response.parsedResponse.InvoiceChainDigestResult,
        responseXml: response.responseXml,
        requestXml: requestXml,
      };
    }

    return {
      invoiceChainDigestResult:
        response.parsedResponse.InvoiceChainDigestResult,
    };
  }

  return null;
}
