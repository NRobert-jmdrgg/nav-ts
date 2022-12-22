import createRequest from '../createRequest.js';
import sendNavRequest from '../sendNavRequest.js';
import { createRequestSignature } from '../utils/createRequestSignature';
import { createDecipheriv } from 'crypto';
import { User, Software } from '../baseTypes';
import { TokenExchangeResponse } from './types/response.js';
import writeToXML from '../utils/writeToXML';

/**
 * A számlaadat-szolgáltatás beküldését megelőző egyszer használatos adatszolgáltatási token kiadását végző operáció.
 * @param user Technikai felhasználó adatai
 * @param software software adatok
 * @param returnWithXml Ha igaz, akkor a request és response xml-t is visszaadja.
 * @returns exchange token
 */
export default async function getExchangeToken(
  user: User,
  software: Software,
  returnWithXml = true
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

  const response = await sendNavRequest<TokenExchangeResponse>(
    writeToXML(request),
    'tokenExchange',
    returnWithXml
  );

  const encryptedToken = response.data?.encodedExchangeToken[0];

  // dekódolás
  // iv nem kell
  const decipher = createDecipheriv('aes-128-ecb', user.exchangeKey, null);

  let exchangeToken = '';
  // base64 -> utf8
  if (encryptedToken) {
    exchangeToken = decipher.update(encryptedToken, 'base64', 'utf8');
    exchangeToken += decipher.final('utf8');
  }

  return response.data
    ? {
        header: response.data.header[0],
        result: response.data.result[0],
        Software: response.data.software[0],
        exchangeToken: exchangeToken,
        responseXml: response.responseXml,
        requestXml: response.requestXml,
      }
    : null;
}
