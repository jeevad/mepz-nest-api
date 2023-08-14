import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivityLogsService } from 'src/administrator/activity-logs/activity-logs.service';
import { ActivityLogDocument } from 'src/schemas/activityLog.schem';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    // @InjectModel('Log') private logModel: Model<ActivityLogDocument>,
    private readonly logModel: ActivityLogsService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: any = context?.switchToHttp()?.getRequest<Request>();
    // const { statusCode } = context?.switchToHttp()?.getResponse<Response>();
    const statusCode = '200';
    // const { originalUrl, method, params, query, body, headers, user } = req;
    const { url, method, body, headers } = req;
    // console.log('req', req);

    const requestTime = new Date();

    // const request: RequestInterface = {
    //   originalUrl,
    //   method,
    //   params,
    //   query,
    //   body,
    //   headers,
    // };
    const request = {
      url,
      method,
      // params,
      // query,
      body,
      headers,
    };
    const pageName = url;
    const user = req?.user;
    // console.log('user', user);
    // const user = '';
    return next.handle().pipe(
      tap((data) => {
        const response = { statusCode, data };
        // this.insertMongo(originalUrl, request, response, requestTime);
        const logInfo: any = {
          url,
          method,
          pageName,
          user,
          // request,
        };
        this.logModel.create(logInfo);
      }),
    );
  }
}
