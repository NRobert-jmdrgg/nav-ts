import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import { QueryTransactionStatusOptions } from './types/options';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendRequest from '../sendRequest';
import { QueryTransactionStatusResponse } from './types/response';
import { pick } from 'lodash';
import writeToXML from '../utils/writeToXML';

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
  options: QueryTransactionStatusOptions,
  returnWithXml?: boolean
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

  const requestXml = writeToXML(request);
  const response = await sendRequest<QueryTransactionStatusResponse>(
    requestXml,
    'queryTransactionStatus',
    returnWithXml
  );

  if (response.parsedResponse) {
    if (returnWithXml) {
      return {
        processsingResult: response.parsedResponse.processsingResult,
        responseXml: response.responseXml,
        requestXml: requestXml,
      };
    }

    return {
      processsingResult: response.parsedResponse.processsingResult,
    };
  }

  return null;
}
