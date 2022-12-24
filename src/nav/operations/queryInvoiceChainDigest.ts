import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import { QueryInvoiceChainDigestOptions } from './types/options';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendNavRequest from '../sendNavRequest';
import { QueryInvoiceChainDigestResponse } from './types/response';
import { pick } from 'lodash';
import writeToXML from '../utils/writeToXML';

/**
 * Az operáció a megadott keresőfeltételeknek megfelelő, lapozható számlalistát ad vissza a válaszban. A lista elemei a megadott alapszámlához tartozó számlalánc elemei
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param options konfigurációs object
 * @param returnWithXml Ha igaz, akkor a request és response xml-t is visszaadja.
 * @returns számlalánc és result érték
 */
export default async function queryInvoiceChainDigest(
  user: User,
  software: Software,
  options: QueryInvoiceChainDigestOptions,
  returnWithXml = true
) {
  // sorrend
  options = pick(options, ['page', 'invoiceChainQuery']);

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

  const response = await sendNavRequest<QueryInvoiceChainDigestResponse>(
    writeToXML(request),
    'queryInvoiceChainDigest',
    returnWithXml
  );

  return response.data
    ? {
        header: response.data.header[0],
        result: response.data.result[0],
        Software: response.data.software[0],
        invoiceChainDigestResult: response.data.InvoiceChainDigestResult[0],
        responseXml: response.responseXml,
        requestXml: response.requestXml,
      }
    : null;
}
