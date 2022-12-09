import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import { QueryTransactionListOptions } from './types/options';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendNavRequest from '../sendNavRequest';
import { QueryTransactionListResponse } from './types/response';
import { pick } from 'lodash';
import writeToXML from '../utils/writeToXML';

/**
 * a kérésben megadott időintervallumban, a technikai felhasználóhoz tartozó
adószámhoz beküldött számlaadat-szolgáltatások listázására szolgál.
 * @param user technikai felhasználó adatok
 * @param software software adatok
 * @param options konfigurációs object
 * @returns számlaadat lista és result érték
 */
export default async function queryTransactionList(
  user: User,
  software: Software,
  options: QueryTransactionListOptions,
  returnWithXml?: boolean
) {
  // sorrend
  options.insDate = pick(options.insDate, ['dateTimeFrom', 'dateTimeTo']);

  // request létrehozása
  const request = createRequest(
    'QueryTransactionListRequest',
    user,
    software,
    pick(options, ['page', 'insDate', 'requestStatus'])
  );

  // request signature létrehozása
  request['QueryTransactionListRequest']['common:user'][
    'common:requestSignature'
  ]._ = createRequestSignature(
    request['QueryTransactionListRequest']['common:header']['common:requestId'],
    request['QueryTransactionListRequest']['common:header']['common:timestamp'],
    user.signatureKey
  );

  const response = await sendNavRequest<QueryTransactionListResponse>(
    writeToXML(request),
    'queryTransactionList',
    returnWithXml
  );

  //array fix
  if (response.parsedResponse?.transactionListResult.transaction) {
    if (
      !Array.isArray(response.parsedResponse.transactionListResult.transaction)
    ) {
      response.parsedResponse.transactionListResult.transaction = [
        response.parsedResponse.transactionListResult.transaction,
      ];
    }
  }

  return response.parsedResponse
    ? {
        ...response.parsedResponse.transactionListResult,
        responseXml: response.responseXml,
        requestXml: response.requestXml,
      }
    : null;
}
