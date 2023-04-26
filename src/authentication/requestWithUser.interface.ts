import { Request } from 'express';
import { UserDocument } from 'src/schemas/user.schema';

interface RequestWithUser extends Request {
  user: UserDocument;
}

export default RequestWithUser;
