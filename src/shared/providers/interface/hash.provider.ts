export interface HashProvider {
  hash(payload: string, salt?: number): Promise<string>;
  compare(payload: string, hashed: string): Promise<boolean>;
}

export const HashProviderToken = Symbol('HashProvider');