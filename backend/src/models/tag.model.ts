export interface Tag {
  id: number;
  name: string;
  vector: string;
}

export interface TagName extends Omit<Tag, 'vector'> {}
