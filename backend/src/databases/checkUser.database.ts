import { ERR } from '@middlewares/errorHandler';
import { comparePassword } from '@utils/comparePassword';
import { Connection } from 'mysql2/promise';

export const checkUser = async (conn: Connection, email: string, password: string): Promise<boolean> => {
  let sql = 'select password from user where email = :email';
  let values = { email: email };
  const [result] = await conn.execute(sql, values);
  const encryptedPassword = result[0].password;
  const isSame = await comparePassword(password, encryptedPassword);
  if (!isSame) throw new Error(ERR.Unauthorized);
  return isSame;
};
