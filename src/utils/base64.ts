export function base64ToUtf8(data: string): string {
  return Buffer.from(data, 'base64').toString('utf8');
}

export function utf8ToBase64(data: string): string {
  return Buffer.from(data, 'utf-8').toString('base64');
}
