import { User, Software } from '../baseTypes';
import { ManageAnnulmentOptions } from './types/options';

import createRequest from '../createRequest';
import {
  createRequestSignature,
  Operation,
} from '../utils/createRequestSignature';
import sendNavRequest from '../sendNavRequest';
import { ManageAnnulmentResponse } from './types/response';
import { pick } from 'lodash';
import writeToXML from '../utils/writeToXML';

/**
 * Operáció a technikai érvénytelenítések beküldésére szolgáló operáció
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param options konfigurációs object
 * @param returnWithXml Ha igaz, akkor a request és response xml-t is visszaadja.
 * @returns transactionId és result érték
 */
export default async function manageAnnulment(
  user: User,
  software: Software,
  options: ManageAnnulmentOptions,
  returnWithXml = true
) {
  // sorrend
  options = pick(options, ['exchangeToken', 'annulmentOperations']);

  options.annulmentOperations.annulmentOperation =
    options.annulmentOperations.annulmentOperation.map((ao) =>
      pick(ao, ['index', 'annulmentOperation', 'invoiceAnnulment'])
    );

  // request létrehozása
  const request = createRequest(
    'ManageAnnulmentRequest',
    user,
    software,
    pick(options, ['exchangeToken', 'annulmentOperations'])
  );

  // request signature generálás
  request['ManageAnnulmentRequest']['common:user'][
    'common:requestSignature'
  ]._ = createRequestSignature(
    request['ManageAnnulmentRequest']['common:header']['common:requestId'],
    request['ManageAnnulmentRequest']['common:header']['common:timestamp'],
    user.signatureKey,
    options.annulmentOperations.annulmentOperation.map(
      (ao) =>
        <Operation>{
          operationType: ao.annulmentOperation,
          base64data: ao.invoiceAnnulment,
        }
    )
  );

  const response = await sendNavRequest<ManageAnnulmentResponse>(
    writeToXML(request),
    'manageAnnulment',
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
