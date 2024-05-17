import { transactionWrapper } from '@middlewares/transactionWrapper.middleware';
import { CreateDiary } from '@schemas/diary.schema';
import { faissIndex, tagsJSON } from '@utils/createTagVectorList';
import { getEmbedding } from '@utils/getEmbedding';
import { Connection, ResultSetHeader } from 'mysql2/promise';

export const insertDiary = async (conn: Connection, body: CreateDiary): Promise<void> => {
  const { user_id, title, content } = body;

  const embedding = await getEmbedding(`${title} ${content}`);

  const limit = 5;
  const { labels } = faissIndex.search(embedding, limit);

  const tags = labels.map((index) => tagsJSON[index].id);

  const callback = async (user_id: number, title: string, content: string, tags: number[]) => {
    let sql = 'insert into diary (user_id, title, content) values (:user_id, :title, :content)';
    let values: {} = { user_id: user_id, title: title, content: content };
    const [result] = await conn.execute<ResultSetHeader>(sql, values);
    const diary_id = result.insertId;

    for (const tag_id of tags) {
      sql = 'insert into diary_tag (diary_id, tag_id) values (:diary_id, :tag_id)';
      values = { diary_id: diary_id, tag_id: tag_id };
      await conn.execute(sql, values);
    }
  };

  await transactionWrapper(conn, callback)(user_id, title, content, tags);
};
