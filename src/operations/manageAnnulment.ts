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

export default async function manageAnnulment(
  user: User,
  software: Software,
  options: ManageAnnulmentOptions
): Promise<string | undefined> {
  const request = createRequest(
    'ManageAnnulmentRequest',
    user,
    software,
    pick(options, ['exchangeToken', 'annulmentOperations'])
  );
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

  return response?.BasicAnnulmentResponse.transactionId;
}
