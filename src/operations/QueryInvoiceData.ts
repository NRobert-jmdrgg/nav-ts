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
  options.invoiceNumberQuery = pick(options.invoiceNumberQuery, [
    'invoiceNumber',
    'invoiceDirection',
    'batchIndex',
    'supplierTaxNumber',
  ]);

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

  response?.QueryInvoiceDataResponse?.invoiceDataResult;

  return response
    ? {
        result: response.QueryInvoiceDataResponse.result,
        invoiceDataResult: response.QueryInvoiceDataResponse.invoiceDataResult,
      }
    : null;
}
