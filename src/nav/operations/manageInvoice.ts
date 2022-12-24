import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import { ManageInvoiceOptions } from './types/options';
import { Operation } from '../utils/createRequestSignature';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendNavRequest from '../sendNavRequest';
import { ManageInvoiceResponse } from './types/response';
import { pick } from 'lodash';
import writeToXML from '../utils/writeToXML';

/**
 * A számlaadat-szolgáltatás beküldésére szolgáló operáció, ezen keresztül van
lehetőség számla, módosító vagy stornó számlaadat-szolgáltatást a NAV-nak beküldeni.
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param options konfigurációs object
 * @param returnWithXml Ha igaz, akkor a request és response xml-t is visszaadja.
 * @returns transactionId és result érték
 */
export default async function manageInvoice(
  user: User,
  software: Software,
  options: ManageInvoiceOptions,
  returnWithXml = true
) {
  // sorrend
  options = pick(options, ['exchangeToken', 'invoiceOperations']);

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

  // request létrehozása
  const request = createRequest(
    'ManageInvoiceRequest',
    user,
    software,
    pick(options, ['exchangeToken', 'invoiceOperations'])
  );

  // request signature létrehozása
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

  const response = await sendNavRequest<ManageInvoiceResponse>(
    writeToXML(request),
    'manageInvoice',
    returnWithXml
  );

  return response.data
    ? {
        header: response.data.header[0],
        result: response.data.result[0],
        Software: response.data.software[0],
        transactionId: response.data.transactionId[0],
        responseXml: response.responseXml,
        requestXml: response.requestXml,
      }
    : null;
}
