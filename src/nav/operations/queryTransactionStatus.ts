import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import { QueryTransactionStatusOptions } from './types/options';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendNavRequest from '../sendNavRequest';
import { QueryTransactionStatusResponse } from './types/response';
import { pick } from 'lodash';
import writeToXML from '../utils/writeToXML';

/**
 * A számlaadat-szolgáltatás feldolgozás aktuális állapotának és eredményének lekérdezésére szolgáló operáció
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param options konfigurációs object
 * @param returnWithXml Ha igaz, akkor a request és response xml-t is visszaadja.
 * @returns feldolgozás eredménye és result érték
 */
export default async function queryTransactionStatus(
  user: User,
  software: Software,
  options: QueryTransactionStatusOptions,
  returnWithXml = true
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

  const response = await sendNavRequest<QueryTransactionStatusResponse>(
    writeToXML(request),
    'queryTransactionStatus',
    returnWithXml
  );

  return response.data
    ? {
        header: response.data.header[0],
        result: response.data.result[0],
        Software: response.data.software[0],
        processsingResult: response.data.processsingResult?.[0],
        responseXml: response.responseXml,
        requestXml: response.requestXml,
      }
    : null;
}
