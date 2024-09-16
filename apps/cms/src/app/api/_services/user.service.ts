import { Role, UserIF } from '@repo/types/user';
import UserRepo from '../_repos/user.repo';
import { hashPassword } from '@repo/utils/password';
import { GetAllQueryIF } from '@repo/types/response';

class UserFactory {
  static async create({ payload }: { payload: UserIF }) {
    return await new User(payload).create();
  }

  static async getOneById(id: number) {
    return await UserRepo.getOneById(id);
  }

  static async getAll() {
    return await UserRepo.getAll();
  }

  static async getAllWithQuery({ filter, range, sort }: GetAllQueryIF) {
    return await UserRepo.getAllWithQuery({ filter, range, sort });
  }

  static async getPermission(userId: number) {
    return await UserRepo.getPermission(userId);
  }

  static async updateById({ id, payload }: { id: number; payload: UserIF }) {
    return await new User(payload).updateById({ id });
  }

  static async deleteById(id: number) {
    return await UserRepo.deleteById(id);
  }

  static async deleteManyById(ids: number[]) {
    return await UserRepo.deleteManyById(ids);
  }

  static async safetyDeleteById(id: number) {
    return await UserRepo.safetyDeleteById(id);
  }

  static async safetyDeleteManyById(ids: number[]) {
    return await UserRepo.safetyDeleteManyById(ids);
  }

  static async findByEmail({ email }: { email: string }) {
    return await UserRepo.getOneWithParam({
      where: { email, isDeleted: false },
    });
  }

  static async findByUsername({ username }: { username: string }) {
    return await UserRepo.getOneWithParam({ where: { username } });
  }

  static async updateLastLogin({ id }: { id: number }) {
    return await UserRepo.updateLastLogin({ id });
  }
}

class User implements UserIF {
  public username: string;
  public role: Role;
  public enabled: boolean;
  public email: string;
  public password!: string;
  public isDeleted: boolean;
  public updatedAt: Date;

  public constructor({
    username,
    role,
    enabled = true,
    email,
    password,
    newPassword,
    isDeleted = false,
  }: UserIF) {
    console.log({
      username,
      role,
      email,
      password,
      newPassword,
    });
    this.username = username;
    this.role = role;
    this.enabled = enabled;
    this.email = email;
    this.isDeleted = isDeleted;
    this.updatedAt = new Date();
    if (newPassword) {
      this.password = hashPassword(newPassword);
    }
    if (password) {
      this.password = hashPassword(password);
    }
  }

  public async create() {
    const payload: UserIF = this;

    // TODO: validate payload
    return await UserRepo.insert(payload);
  }

  public async updateById({ id }: { id: number }) {
    const payload: UserIF = this;

    console.log('this update', this);
    // TODO: validate payload
    return await UserRepo.updateById({ id, payload });
  }
}

export default UserFactory;
