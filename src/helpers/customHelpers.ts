import Handlebars from 'handlebars';

 
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
  
  Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

  Handlebars.registerHelper('sum', function (data, key) {
    return calculateSum(data, key);
  });
  Handlebars.registerHelper('index_gt', function (index, options) {
    return index > 0 ? options.fn(this) : options.inverse(this);
   });

   Handlebars.registerHelper('value_undefine', function (value) {
    return value != 'no-group' ? value : '';
   });
   Handlebars.registerHelper('multiply', function (a, b) {
    if (typeof a !== 'undefined' && typeof b !== 'undefined') {
      return a * b;
    }
    // Return a default value or handle the case where either a or b is undefined
    // For example, you could return an error message or null.
    return 0;
   });
   Handlebars.registerHelper('sumQuantities', function (items) {
     let sum = 0;
  
     if (items) {
       items.forEach((item) => {
         item.equipments.forEach((quantity3) => {
          if (quantity3.quantity) {
             sum += quantity3.quantity;
            //console.log("DDDDDD:::::");
            // console.log(quantity3.quantity);
           }
        });
       });
    }
    return sum;
    });
    Handlebars.registerHelper('calculateSumOfTotalAll', function (items) {
     let sum = 0;
    //console.log("ffff");
     //console.log(items);
     if (items) {
      items.forEach((items1) => {
        if (items1.rooms) {
          items1.rooms.forEach((item) => {
            if (Array.isArray(item.equipments)) {
              item.equipments.forEach((quantity3) => {
                if (quantity3.quantity) {
                  sum += quantity3.quantity;
                }
              });
            }
          });
        }
      });
    }
    return sum;
  });
  
  Handlebars.registerHelper('calculateSumOfTotal', function (items) {
    let sum = 0;
    items.forEach((item) => {
      sum += item.quantity * item.cost;
    });
    if (!isNaN(sum)) {

      return sum;
    }
    return 0;
  });
  
  Handlebars.registerHelper('isFirstIndex', function (index, options) {
    return index === 0 ? options.fn(this) : options.inverse(this);
  });
  ///// end of helper function
export default Handlebars;