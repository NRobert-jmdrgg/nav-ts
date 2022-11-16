import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import { ManageInvoiceOptions } from './types/options';
import { Operation } from '../utils/createRequestSignature';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendRequest from '../sendRequest';
import { ManageInvoiceResponse } from './types/response';
import { pick } from 'lodash';

export default async function manageInvoice(
  user: User,
  software: Software,
  options: ManageInvoiceOptions
): Promise<string | undefined> {
  // reorder obj properties
  options.invoiceOperations.invoiceOperation =
    options.invoiceOperations.invoiceOperation.map((io) =>
      pick(io, [
        'index',
        'invoiceOperation',
        'invoiceData',
        'electronicInvoiceHash',
      ])
    );

  options.invoiceOperations = pick(options.invoiceOperations, [
    'compressedContent',
    'invoiceOperation',
  ]);

  const request = createRequest(
    'ManageInvoiceRequest',
    user,
    software,
    pick(options, ['exchangeToken', 'invoiceOperations'])
  );
  request['ManageInvoiceRequest']['common:user']['common:requestSignature']._ =
    createRequestSignature(
      request['ManageInvoiceRequest']['common:header']['common:requestId'],
      request['ManageInvoiceRequest']['common:header']['common:timestamp'],
      user.signatureKey,
      options.invoiceOperations.invoiceOperation.map(
        (invoiceOperation) =>
          <Operation>{
            operationType: invoiceOperation.invoiceOperation,
            base64data: invoiceOperation.invoiceData,
          }
      )
    );
  const response = await sendRequest<ManageInvoiceResponse>(
    request,
    'manageInvoice'
  );
  return response?.ManageInvoiceResponse.transactionId;
}
