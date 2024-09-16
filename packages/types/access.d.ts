import { NextRequest } from 'next/server';

export interface UserParamsIF {
  userId: number;
  email: string;
}

export interface KeyTokenPostIF {
  userId: number;
  publicKey: string;
  privateKey: string;
  refreshToken?: string;
}

export interface CustomAccessRequest extends NextRequest {
  user: UserParamsIF;
  keyStore: KeyTokenPostIF;
  refreshToken: string;
}
