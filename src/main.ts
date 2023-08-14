import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
// import exphbs from 'express-handlebars';
import * as hbs from 'express-handlebars';
import customHelpers from './helpers/customHelpers';
import { join } from 'path';

// var handlebars = require('../node_modules/handlebars/dist/cjs/handlebars')[
//   'default'
// ];

///// start of helper function

// handlebars.registerHelper('sum', function (data, key) {
//   return calculateSum(data, key);
// });
// handlebars.registerHelper('index_gt', function (index, options) {
//   return index > 0 ? options.fn(this) : options.inverse(this);
// });

// handlebars.registerHelper('multiply', function (a, b) {
//   return a * b;
// });
// handlebars.registerHelper('sumQuantities', function (items) {
//   let sum = 0;

//   if (items) {
//     items.forEach((item) => {
//       item.equipments.forEach((quantity3) => {
//         if (quantity3.quantity) {
//           sum += quantity3.quantity;
//           //console.log("DDDDDD:::::");
//           // console.log(quantity3.quantity);
//         }
//       });
//     });
//   }
//   return sum;
// });
// handlebars.registerHelper('calculateSumOfTotalAll', function (items) {
//   let sum = 0;
//   //console.log("ffff");
//   //console.log(items);
//   if (items) {
//     items.forEach((items1) => {
//       if (items1.rooms) {
//         items1.rooms.forEach((item) => {
//           if (Array.isArray(item.equipments)) {
//             item.equipments.forEach((quantity3) => {
//               if (quantity3.quantity) {
//                 sum += quantity3.quantity;
//               }
//             });
//           }
//         });
//       }
//     });
//   }
//   return sum;
// });

// handlebars.registerHelper('calculateSumOfTotal', function (items) {
//   let sum = 0;
//   items.forEach((item) => {
//     sum += item.quantity * item.cost;
//   });
//   return sum;
// });

// handlebars.registerHelper('isFirstIndex', function (index, options) {
//   return index === 0 ? options.fn(this) : options.inverse(this);
// });
///// end of helper function
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // var exphbs = require('express-handlebars');
  // Configure Express to use Handlebars engine
  app.engine(
    'hbs',
    hbs.engine({
      extname: '.hbs',
      handlebars: customHelpers,
    }),
  );

  app.set('view engine', 'hbs');

  // const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Hanimeds')
    .setDescription('The hanimed API description')
    .setVersion('1.0')
    .addTag('hanimed')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3001);
}
bootstrap();
