import { Tag } from '@models/tag.model';
import { IndexFlatL2 } from 'faiss-node';
import fs from 'fs';
import path from 'path';

export let tagsJSON: any[] = [];

const createTagVectorList = () => {
  const location = path.resolve(__dirname, '..', 'storage/tags/tags.json');
  const buffer = fs.readFileSync(location, 'utf8');

  tagsJSON = JSON.parse(buffer) as Tag[];

  const vectors = tagsJSON.map((e) => JSON.parse(e.vector) as number[]);

  const faissIndex = new IndexFlatL2(vectors[0].length);
  for (const vector of vectors) faissIndex.add(vector);

  return faissIndex;
};

export const faissIndex = createTagVectorList();
