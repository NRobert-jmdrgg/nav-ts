import createRequest from '../createRequest.js';
import sendRequest from '../sendRequest.js';
import createRequestSignature from '../utils/createRequestSignature';
import crypto from 'crypto';
import User from '../user';
import Software from '../software';

export default async function getExchangeToken(
  user: User,
  software: Software
): Promise<String> {
  const request = createRequest('TokenExchangeRequest', user, software);
  request['TokenExchangeRequest']['common:user']['common:requestSignature']._ =
    createRequestSignature(
      request['TokenExchangeRequest']['common:header']['common:requestId'],
      request['TokenExchangeRequest']['common:header']['common:timestamp'],
      user.signatureKey
    );

  const response = await sendRequest(request, 'tokenExchange');
  const encryptedToken =
    response?.TokenExchangeResponse.encodedExchangeToken[0];

  // console.log('encrypted: ' + encryptedToken);

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

  // console.log('decrypted: ' + exchangeToken);
  return exchangeToken;
}
