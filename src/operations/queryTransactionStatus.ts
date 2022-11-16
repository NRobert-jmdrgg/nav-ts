import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import { QueryTransactionStatusOptions } from './types/options';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendRequest from '../sendRequest';
import { QueryTransactionStatusResponse } from './types/response';
import { pick } from 'lodash';

export default async function queryTransactionStatus(
  user: User,
  software: Software,
  options: QueryTransactionStatusOptions
) {
  const request = createRequest(
    'QueryTransactionStatusRequest',
    user,
    software,
    pick(options, ['transactionId', 'returnOriginalRequest'])
  );
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
