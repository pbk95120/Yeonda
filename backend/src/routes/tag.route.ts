import { getTags } from '@controllers/tag.controller';
import express from 'express';
const TagRoute = express.Router();

TagRoute.get('/', getTags);

export default TagRoute;
