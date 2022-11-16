import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import { QueryInvoiceCheckOptions } from './types/options';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendRequest from '../sendRequest';
import { QueryInvoiceCheckResponse } from './types/response';

export default async function queryInvoiceCheck(
  user: User,
  software: Software,
  options: QueryInvoiceCheckOptions
) {
  const request = createRequest(
    'QueryInvoiceCheckRequest',
    user,
    software,
    options
  );
  request['QueryInvoiceCheckRequest']['common:user'][
    'common:requestSignature'
  ]._ = createRequestSignature(
    request['QueryInvoiceCheckRequest']['common:header']['common:requestId'],
    request['QueryInvoiceCheckRequest']['common:header']['common:timestamp'],
    user.signatureKey
  );
  const response = await sendRequest<QueryInvoiceCheckResponse>(
    request,
    'queryInvoiceCheck'
  );

  return response
    ? {
        result: response.QueryInvoiceCheckResponse.result,
        invoiceCheckResult:
          response.QueryInvoiceCheckResponse.invoiceCheckResult,
      }
    : null;
}
