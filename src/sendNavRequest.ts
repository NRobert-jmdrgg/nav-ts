import axios from 'axios';
import xml2js from 'xml2js';
import dotenv from 'dotenv';
import readFromXml from './utils/readFromXml';

dotenv.config();

type Response<R> = {
  parsedResponse: R | null;
  responseXml?: string;
  requestXml?: string;
};

/**
 *  Kérés küldése a nav felé.
 * @param request
 * @param operation api endpoint neve
 * @template R visszatérési érték típus
 * @returns Promise<R | null> válasz object
 *
 */
export default async function sendNavRequest<R>(
  requestXml: string,
  operation: string,
  returnWithXml?: boolean
): Promise<Response<R>> {
  // kérés object xml-be írása

  // request küldés
  let parsedResponse = null;
  try {
    const response = await axios.post(
      `${process.env.API_TEST_URL}${process.env.VERSION}${operation}`,
      requestXml,
      { headers: { 'Content-Type': 'application/xml' } }
    );

    var responseXml = response.data;
    parsedResponse = await readFromXml(responseXml);
  } catch (e: any) {
    console.log(e.response.data);
  }

  return {
    parsedResponse: parsedResponse,
    responseXml: returnWithXml ? responseXml : undefined,
    requestXml: returnWithXml ? requestXml : undefined,
  };
}
