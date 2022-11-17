import writeToXML from './utils/writeToXML';
import axios from 'axios';
import xml2js from 'xml2js';
import dotenv from 'dotenv';
import { InvoiceRequest } from './baseTypes';

dotenv.config();

/**
 *  Kérés küldése a nav felé.
 * @param request
 * @param operation api endpoint neve
 * @template R visszatérési érték típus
 * @returns Promise<R | null> válasz object
 *
 */
export default async function sendRequest<R>(
  request: InvoiceRequest,
  operation: string
): Promise<R | null> {
  // kérés object xml-be írása
  const xml = writeToXML(request);

  // request küldés
  const xmlparser = new xml2js.Parser();
  let parsedResponse = null;
  try {
    const response = await axios.post(
      `${process.env.API_TEST_URL}${process.env.VERSION}${operation}`,
      xml,
      { headers: { 'Content-Type': 'application/xml' } }
    );

    // válasz xml feldolgozása
    const xmlNoNamespaceResponse = response.data.replace(/ns2:|ns3:/g, '');
    parsedResponse = await xmlparser.parseStringPromise(xmlNoNamespaceResponse);
  } catch (e: any) {
    console.log(e.response.data);
  }

  return parsedResponse;
}
