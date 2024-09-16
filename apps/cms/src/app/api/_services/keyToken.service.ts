import { generateClient } from '@/lib/prisma';
import { KeyTokenPostIF } from '@repo/types/access';
import UserService from './user.service';
import { PrismaClient } from '@prisma/client/extension';

class KeyTokenService {
  public prisma: PrismaClient;
  constructor() {
    // generateClient() = generateClient();
  }

  async createKeyToken({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }: KeyTokenPostIF) {
    console.log('createKeyToken', userId, publicKey, privateKey, refreshToken);

    try {
      const data = {
        publicKey,
        privateKey,
        refreshTokensUsed: JSON.stringify([]),
        refreshToken,
      };

      const tokens = await generateClient().keyToken.upsert({
        where: {
          userId: userId,
        },
        update: data,
        create: { userId, ...data },
      });

      await UserService.updateLastLogin({
        id: userId,
      });
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  }

  async findByUserId(userId: number) {
    return await generateClient().keyToken.findUnique({ where: { userId } });
  }

  async removeToken(id: number) {
    return await generateClient().keyToken.delete({ where: { id } });
  }

  async removeTokenByUserId(userId: number) {
    return await generateClient().keyToken.delete({ where: { userId } });
  }

  async findByRefreshTokenUsed(refreshToken: string) {
    return await generateClient().keyToken.findUnique({
      where: { refreshToken },
    });
  }

  async findByRefreshToken(refreshToken: string) {
    return await generateClient().keyToken.findUnique({
      where: { refreshToken },
    });
  }

  async deleteKeyById(userId: number) {
    return await generateClient().keyToken.delete({ where: { userId } });
  }

  async updateKeyById({
    id,
    oldToken,
    newToken,
  }: {
    id: number;
    oldToken: string;
    newToken: string;
  }) {
    const keyToken = await generateClient().keyToken.findUnique({
      where: { id },
    });

    let refreshTokensUsed = keyToken?.refreshTokensUsed
      ? JSON.parse(keyToken.refreshTokensUsed.toString())
      : JSON.stringify([]);

    refreshTokensUsed.push(oldToken);

    return await generateClient().keyToken.update({
      where: { id },
      data: {
        refreshToken: newToken,
        refreshTokensUsed: refreshTokensUsed,
      },
    });
  }
}

export default new KeyTokenService();
