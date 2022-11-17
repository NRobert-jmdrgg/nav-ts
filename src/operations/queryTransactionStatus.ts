import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import { QueryTransactionStatusOptions } from './types/options';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendRequest from '../sendRequest';
import { QueryTransactionStatusResponse } from './types/response';
import { pick } from 'lodash';

/**
 * A számlaadat-szolgáltatás feldolgozás aktuális állapotának és eredményének lekérdezésére szolgáló operáció
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param options konfigurációs object
 * @returns feldolgozás eredménye és result érték
 */
export default async function queryTransactionStatus(
  user: User,
  software: Software,
  options: QueryTransactionStatusOptions
) {
  // request létrehozása
  const request = createRequest(
    'QueryTransactionStatusRequest',
    user,
    software,
    pick(options, ['transactionId', 'returnOriginalRequest'])
  );

  // request signature létrehozása
  request['QueryTransactionStatusRequest']['common:user'][
    'common:requestSignature'
  ]._ = createRequestSignature(
    request['QueryTransactionStatusRequest']['common:header'][
      'common:requestId'
    ],
    request['QueryTransactionStatusRequest']['common:header'][
      'common:timestamp'
    ],
    user.signatureKey
  );

  const response = await sendRequest<QueryTransactionStatusResponse>(
    request,
    'queryTransactionStatus'
  );

  return response
    ? {
        result: response.QueryTransactionStatusResponse.result,
        processsingResult:
          response.QueryTransactionStatusResponse.processsingResult,
      }
    : null;
}
