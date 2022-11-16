import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import { QueryInvoiceChainDigestOptions } from './types/options';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendRequest from '../sendRequest';
import { QueryInvoiceChainDigestResponse } from './types/response';
import { pick } from 'lodash';

export default async function queryInvoiceChainDigest(
  user: User,
  software: Software,
  options: QueryInvoiceChainDigestOptions
) {
  options.invoiceChainQuery = pick(options.invoiceChainQuery, [
    'invoiceNumber',
    'invoiceDirection',
    'taxNumber',
  ]);

  const request = createRequest(
    'QueryInvoiceChainDigestRequest',
    user,
    software,
    pick(options, ['page', 'invoiceChainQuery'])
  );
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
        basicResult: response.QueryInvoiceChainDigestResponse.result,
        invoiceChainDigestResult:
          response.QueryInvoiceChainDigestResponse.InvoiceChainDigestResult,
      }
    : null;
}
