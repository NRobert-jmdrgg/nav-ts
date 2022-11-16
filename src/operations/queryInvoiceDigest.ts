import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import { QueryInvoiceDigestOptions } from './types/options';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendRequest from '../sendRequest';
import { QueryInvoiceDigestResponse } from './types/response';
import { pick } from 'lodash';

export default async function queryInvoiceDigest(
  user: User,
  software: Software,
  options: QueryInvoiceDigestOptions
) {
  const request = createRequest(
    'QueryInvoiceDigestRequest',
    user,
    software,
    pick(options, ['page', 'invoiceDirection', 'invoiceQueryParams'])
  );
  request['QueryInvoiceDigestRequest']['common:user'][
    'common:requestSignature'
  ]._ = createRequestSignature(
    request['QueryInvoiceDigestRequest']['common:header']['common:requestId'],
    request['QueryInvoiceDigestRequest']['common:header']['common:timestamp'],
    user.signatureKey
  );
  const response = await sendRequest<QueryInvoiceDigestResponse>(
    request,
    'queryInvoiceDigest'
  );

  return response
    ? {
        result: response.QueryInvoiceDigestResponse.result,
        invoiceDigestResult:
          response.QueryInvoiceDigestResponse.invoiceDigestResult,
      }
    : null;
}
