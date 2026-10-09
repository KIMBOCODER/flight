declare module "cookie" {
  interface CookieSerializeOptions {
    encode?: (value: string) => string;
    maxAge?: number;
    domain?: string;
    path?: string;
    expires?: Date;
    httpOnly?: boolean;
    secure?: boolean;
    partitioned?: boolean;
    priority?: "low" | "medium" | "high";
    sameSite?: boolean | "lax" | "strict" | "none";
  }

  export function parse(
    str: string,
    options?: {
      decode?: (value: string) => string;
    },
  ): Record<string, string>;

  export function serialize(
    name: string,
    val: string,
    options?: CookieSerializeOptions,
  ): string;
}