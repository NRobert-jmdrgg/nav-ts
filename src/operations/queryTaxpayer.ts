import { User, Software } from '../baseTypes';
import createRequest from '../createRequest';
import { QueryTaxpayerOptions } from './types/options';
import { createRequestSignature } from '../utils/createRequestSignature';
import sendRequest from '../sendRequest';
import { QueryTaxpayerResponse } from './types/response';

export default async function queryTaxpayer(
  user: User,
  software: Software,
  options: QueryTaxpayerOptions
) {
  const request = createRequest(
    'QueryTaxpayerRequest',
    user,
    software,
    options
  );
  request['QueryTaxpayerRequest']['common:user']['common:requestSignature']._ =
    createRequestSignature(
      request['QueryTaxpayerRequest']['common:header']['common:requestId'],
      request['QueryTaxpayerRequest']['common:header']['common:timestamp'],
      user.signatureKey
    );
  const response = await sendRequest<QueryTaxpayerResponse>(
    request,
    'queryTaxpayer'
  );

  return response
    ? {
        result: response.QueryTaxpayerResponse.result,
        infoDate: response.QueryTaxpayerResponse.infoDate,
        taxpayerData: response.QueryTaxpayerResponse.taxpayerData,
        taxpayerValidity: response.QueryTaxpayerResponse.taxpayerValidity,
      }
    : null;
}
