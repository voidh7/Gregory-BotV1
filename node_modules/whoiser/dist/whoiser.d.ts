import type { DomainWhoisOptions, TldWhoisResponse, WhoisData } from './types.ts';
/**
 * Query a WHOIS server and return the result.
 * @param host WHOIS server hostname
 * @param query Query string
 * @param timeout Timeout duration in milliseconds
 * @returns Result of the WHOIS query
 */
export declare function whoisQuery(host: string, query: string, timeout?: number): Promise<string>;
/**
 * TLD WHOIS data, from the [IANA WHOIS](https://www.iana.org/whois) server.
 *
 * @param tld TLD/SLD to query. Example: 'com', '.co.uk'
 * @param timeout Timeout for WHOIS query in milliseconds
 * @returns Normalized WHOIS data
 * @throws Error if TLD is invalid or not found
 */
export declare function whoisTld(tld: string, timeout?: number): Promise<TldWhoisResponse>;
/**
 * Get WHOIS data for a domain name.
 * @param domain Domain name to query. Example: 'example.com'
 * @param options Options for querying WHOIS
 * @returns Object containing WHOIS results
 */
export declare function whoisDomain(domain: string, options?: DomainWhoisOptions): Promise<{}>;
/**
 * IP WHOIS data, from the [IANA WHOIS](https://www.iana.org/whois) server.
 *
 * @param ip IP address to query. Example: '192.0.2.1'
 * @param options Options for WHOIS query
 * @returns Normalized WHOIS data
 * @throws Error if IP is invalid or not found
 */
export declare function whoisIp(ip: string, options?: {
    host?: string;
    timeout?: number;
}): Promise<WhoisData>;
/**
 * ASN WHOIS data, from the [IANA WHOIS](https://www.iana.org/whois) server.
 * @param asn ASN number to query. Example: 12345
 * @param options Options for WHOIS query
 * @returns Normalized WHOIS data
 * @throws Error if ASN is invalid or not found
 */
export declare function whoisAsn(asn: number, options?: {
    host?: string;
    timeout?: number;
}): Promise<WhoisData>;
export declare const firstResult: (whoisResults: any) => any;
