export default function base64ToUtf8(data: string): string {
  return Buffer.from(data, 'base64').toString('utf8');
}
