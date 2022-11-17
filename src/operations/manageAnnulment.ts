import { User, Software } from '../baseTypes';
import { ManageAnnulmentOptions } from './types/options';

import createRequest from '../createRequest';
import {
  createRequestSignature,
  Operation,
} from '../utils/createRequestSignature';
import sendRequest from '../sendRequest';
import { ManageAnnulmentResponse } from './types/response';
import { pick } from 'lodash';

/**
 * Operáció a technikai érvénytelenítések beküldésére szolgáló operáció
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param options konfigurációs object
 * @returns transactionId és result érték
 */
export default async function manageAnnulment(
  user: User,
  software: Software,
  options: ManageAnnulmentOptions
) {
  // sorrend
  options.annulmentOperations.annumentOperation =
    options.annulmentOperations.annumentOperation.map((ao) =>
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
    options.annulmentOperations.annumentOperation.map(
      (ao) =>
        <Operation>{
          operationType: ao.annulmentOperation,
          base64data: ao.invoiceAnnulment,
        }
    )
  );

  const response = await sendRequest<ManageAnnulmentResponse>(
    request,
    'manageAnnulment'
  );

  return response
    ? {
        result: response.BasicAnnulmentResponse.result,
        transactionId: response.BasicAnnulmentResponse.transactionId,
      }
    : null;
}
