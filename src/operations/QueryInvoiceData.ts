import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import { QueryInvoiceDataOptions } from './types/options';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendRequest from '../sendRequest';
import { QueryInvoiceDataResponse } from './types/response';
import { pick } from 'lodash';

export default async function queryInvoiceData(
  user: User,
  software: Software,
  options: QueryInvoiceDataOptions
) {
  const request = createRequest(
    'QueryInvoiceDataRequest',
    user,
    software,
    options
  );
  request['QueryInvoiceDataRequest']['common:user'][
    'common:requestSignature'
  ]._ = createRequestSignature(
    request['QueryInvoiceDataRequest']['common:header']['common:requestId'],
    request['QueryInvoiceDataRequest']['common:header']['common:timestamp'],
    user.signatureKey
  );
  const response = await sendRequest<QueryInvoiceDataResponse>(
    request,
    'queryInvoiceData'
  );

  response?.QueryInvoiceDataResponse?.invoiceDataReesult;

  return response
    ? {
        result: response.QueryInvoiceDataResponse.result,
        invoiceDataReesult:
          response.QueryInvoiceDataResponse.invoiceDataReesult,
      }
    : null;
}
