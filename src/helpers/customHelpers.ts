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

function calculateTotalDiffernce(data, key) {
  if (Array.isArray(data)) {
    return data.reduce((sum, item) => sum + calculateSum(item, key), 0);
  } else if (typeof data === 'object' && data !== null) {
    return data[key] || 0;
  } else {
    return 0;
  }
 
}

Handlebars.registerHelper('json', function (context) {
  return JSON.stringify(context);
});

Handlebars.registerHelper('sum', function (data, key) {
  return calculateSum(data, key);
});
Handlebars.registerHelper('index_gt', function (index, options) {
  return index > 0 ? options.fn(this) : options.inverse(this);
});
Handlebars.registerHelper('total_difernce', function (data, key, key2) {
  let total1 = calculateTotalDiffernce(data, key);
  let total2 = calculateTotalDiffernce(data, key2);
 
  if (total1-total2)
  {
    return total1-total2;
  }
  else 
  {
    return 0;
  }


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

Handlebars.registerHelper('differ_cal', function (a, b) {
  
  if (typeof a !== 'undefined' && typeof b === 'undefined') {
    return a ;
  }
  else if (typeof a !== 'undefined' && typeof b !== 'undefined') {
    return a - b;
  }
  // Return a default value or handle the case where either a or b is undefined
  // For example, you could return an error message or null.
  return 0;
});
Handlebars.registerHelper('differnce_price', function (eq_items) {
if (!isNaN((eq_items.quantity * eq_items.cost) - (eq_items.quantity_rev2 * eq_items.cost_rev2))) {
return (eq_items.quantity * eq_items.cost) - (eq_items.quantity_rev2 * eq_items.cost_rev2)
}
return 0;
})
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
Handlebars.registerHelper('calculateSumOfTotal_rev', function (items) {
  let sum = 0;
  items.forEach((item) => {
    if (!isNaN(item.quantity_rev2 * item.cost_rev2))
    {
    sum += item.quantity_rev2 * item.cost_rev2;
    }
  });
  if (!isNaN(sum)) {
    return sum;
  }
  return sum;
});

Handlebars.registerHelper('total_price_difernce', function (items) {
  let sum = 0;
  let sum2 = 0;
  items.forEach((item) => {
    sum += item.quantity * item.cost;
  });
  items.forEach((item) => {
    sum2 += item.quantity_rev2 * item.cost_rev2;
  });
  if (!isNaN(sum)&&!isNaN(sum2)) {
    return sum-sum2;
  }
  return 0;
});

Handlebars.registerHelper('isFirstIndex', function (index, options) {
  return index === 0 ? options.fn(this) : options.inverse(this);
});
///// end of helper function
export default Handlebars;
