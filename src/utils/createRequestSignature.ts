import crypto from 'crypto';
import maskIsoDate from './maskIsoDate';

/**
 * request signature létrehozása
 * @param {string} requestId kérés idje
 * @param {Date} timestamp kérés ideje
 * @param {string} signatureKey technikai felhasználó aláírókulcsa
 * @param {Array} operations a manageAnnulment vagy manageInvoice operációlistája
 * @return sha3-512 kódolt request signature
 */

export default function createRequestSignature(
  requestId: string,
  timestamp: string,
  signatureKey: string
  // operations?:
): string {
  let partialSignature = requestId + maskIsoDate(timestamp) + signatureKey;

  // if (operations) {
  //   operations.forEach((operation) => {
  //     const hash = crypto.createHash('sha3-512');
  //     partialSignature += hash
  //       .update(operation.operationType + operation.base64data)
  //       .digest('hex')
  //       .toUpperCase();
  //   });
  // }
  const hash = crypto.createHash('sha3-512');
  const requestSignature = hash
    .update(partialSignature)
    .digest('hex')
    .toUpperCase();

  return requestSignature;
}
