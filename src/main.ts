import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
// var handlebars = require('../node_modules/handlebars/dist/cjs/handlebars')[
//   'default'
// ];

///// start of helper function
function calculateSum(data, key) {
  if (Array.isArray(data)) {
    return data.reduce((sum, item) => sum + calculateSum(item, key), 0);
  } else if (typeof data === 'object' && data !== null) {
    return data[key] || 0;
  } else {
    return 0;
  }
}

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
