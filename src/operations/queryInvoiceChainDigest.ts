import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import { QueryInvoiceChainDigestOptions } from './types/options';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendRequest from '../sendRequest';
import { QueryInvoiceChainDigestResponse } from './types/response';
import { pick } from 'lodash';

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
  options: QueryInvoiceChainDigestOptions
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

  const response = await sendRequest<QueryInvoiceChainDigestResponse>(
    request,
    'queryInvoiceChainDigest'
  );

  return response
    ? {
        result: response.QueryInvoiceChainDigestResponse.result,
        invoiceChainDigestResult:
          response.QueryInvoiceChainDigestResponse.InvoiceChainDigestResult,
      }
    : null;
}
