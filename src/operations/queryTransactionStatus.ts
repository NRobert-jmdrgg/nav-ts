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

  const response = await sendNavRequest<QueryTransactionStatusResponse>(
    writeToXML(request),
    'queryTransactionStatus',
    returnWithXml
  );

  if (response.parsedResponse?.processsingResult?.processingResult) {
    if (
      !Array.isArray(response.parsedResponse.processsingResult.processingResult)
    ) {
      response.parsedResponse.processsingResult.processingResult = [
        response.parsedResponse.processsingResult.processingResult,
      ];
    }

    response.parsedResponse.processsingResult.processingResult =
      response.parsedResponse.processsingResult.processingResult.map((pr) => {
        if (pr.technicalValidationMessages) {
          if (!Array.isArray(pr.technicalValidationMessages)) {
            pr.technicalValidationMessages = [pr.technicalValidationMessages];
          }
        }

        if (pr.businessValidationMessages) {
          if (!Array.isArray(pr.businessValidationMessages)) {
            pr.businessValidationMessages = [pr.businessValidationMessages];
          }

          pr.businessValidationMessages = pr.businessValidationMessages.map(
            (bvm) => {
              if (bvm.pointer) {
                if (!Array.isArray(bvm.pointer)) {
                  bvm.pointer = [bvm.pointer];
                }
              }
              return bvm;
            }
          );
        }

        return pr;
      });
  }

  return response.parsedResponse
    ? {
        ...response.parsedResponse.processsingResult,
        responseXml: response.responseXml,
        requestXml: response.requestXml,
      }
    : null;
}
