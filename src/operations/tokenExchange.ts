import createRequest from '../createRequest.js';
import sendRequest from '../sendRequest.js';
import { createRequestSignature } from '../utils/createRequestSignature';
import crypto from 'crypto';
import { User, Software } from '../baseTypes';
import { TokenExchangeResponse } from './types/response.js';
import writeToXML from '../utils/writeToXML';

/**
 * A számlaadat-szolgáltatás beküldését megelőző egyszer használatos adatszolgáltatási token kiadását végző operáció.
 * @param user Technikai felhasználó adatai
 * @param software software adatok
 * @returns exchange token
 */
export default async function getExchangeToken(
  user: User,
  software: Software,
  returnWithXml?: boolean
) {
  // request létrehozása
  const request = createRequest('TokenExchangeRequest', user, software);

  // request signature létrehozása
  request['TokenExchangeRequest']['common:user']['common:requestSignature']._ =
    createRequestSignature(
      request['TokenExchangeRequest']['common:header']['common:requestId'],
      request['TokenExchangeRequest']['common:header']['common:timestamp'],
      user.signatureKey
    );

  const response = await sendRequest<TokenExchangeResponse>(
    writeToXML(request),
    'tokenExchange',
    returnWithXml
  );

  const encryptedToken = response.parsedResponse?.encodedExchangeToken[0];

  // dekódolás
  // iv nem kell
  const decipher = crypto.createDecipheriv(
    'aes-128-ecb',
    user.exchangeKey,
    null
  );

  let exchangeToken = '';
  // base64 -> utf8
  if (encryptedToken) {
    exchangeToken = decipher.update(encryptedToken, 'base64', 'utf8');
    exchangeToken += decipher.final('utf8');
  }

  return response.parsedResponse
    ? {
        exchangeToken: exchangeToken,
        responseXml: response.responseXml,
        requestXml: response.requestXml,
      }
    : null;
}
