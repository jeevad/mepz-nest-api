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
  const total1 = calculateTotalDiffernce(data, key);
  const total2 = calculateTotalDiffernce(data, key2);

  if (total1 - total2) {
    return total1 - total2;
  } else {
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
    return a;
  } else if (typeof a !== 'undefined' && typeof b !== 'undefined') {
    return a - b;
  }
  // Return a default value or handle the case where either a or b is undefined
  // For example, you could return an error message or null.
  return 0;
});
Handlebars.registerHelper('differnce_price', function (eq_items) {
  if (
    !isNaN(
      eq_items.qty * eq_items.cost -
      eq_items.qty_rev * eq_items.cost_rev,
    )
  ) {
    return (
      eq_items.qty * eq_items.cost -
      eq_items.qty_rev * eq_items.cost_rev
    );
  }
  return 0;
});
Handlebars.registerHelper('sumQuantities', function (items) {
  let sum = 0;
  if (items) {
    items.forEach((item) => {
      if (item.qty) {
        sum += item.qty;
      }
    });
  }
  return sum;
});
Handlebars.registerHelper('calculateSumOfTotalAll', function (items) {
  let sum = 0;
  if (items) {
    items.forEach((items1) => {
      if (items1.rooms) {
        items1.rooms.forEach((item) => {
          if (Array.isArray(item.equipments)) {
            item.equipments.forEach((quantity3) => {
              if (quantity3.qty) {
                sum += quantity3.qty;
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
    if (!isNaN(item.qty * item.cost)) {

      sum += item.qty * item.cost;
    }
  });
  if (!isNaN(sum)) {
    return sum;
  }
  return 0;
});
Handlebars.registerHelper('calculateSumOfTotal_rev', function (items) {
  let sum = 0;
  items.forEach((item) => {
    if (!isNaN(item.qty_rev * item.cost_rev)) {
      sum += item.qty_rev * item.cost_rev;
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
    sum += item.qty * item.cost;
  });
  items.forEach((item) => {
    sum2 += item.qty_rev * item.cost_rev;
  });
  if (!isNaN(sum) && !isNaN(sum2)) {
    return sum - sum2;
  }
  return 0;
});

Handlebars.registerHelper(
  'calculateSumOfTotalEquipmentLocationGrpAll',
  function (items) {
    let sum = 0;
    if (items) {

      items.forEach((equ_group) => {
        if (equ_group) {
          equ_group.forEach((data) => {
            data.forEach((equipments) => {
              equipments.locations.forEach((item) => {
                if (item.qty) {
                  sum += item.qty;
                }
              });

            });
          });
        }

      });
    }
    if (!isNaN(sum)) {
      return sum;
    }
    return 0;
  },
);


Handlebars.registerHelper(
  'calculateSumOfTotalEquipmentLocationListing',
  function (items) {
    let sum = 0;
    items.forEach((equipments) => {
      equipments.locations.forEach((item) => {
        if (item.qty) {
          sum += item.qty;
        }
      });
    });
    if (!isNaN(sum)) {
      return sum;
    }
    return 0;
  },
);

Handlebars.registerHelper(
  'calculateSumOfTotalEquipmentListingBQ',
  function (items) {
    let sum = 0;
    items.forEach((item) => {
      if (item.qty) {
        sum += item.qty;
      }
    });
    if (!isNaN(sum)) {
      return sum;
    }
    return 0;
  },
);

Handlebars.registerHelper(
  'calculateSumOfTotalEquipmentListingDept',
  function (items) {
    let sum = 0;
    if (items) {
      items.forEach((department) => {
        department.data.forEach((item) => {
          if (item.qty) {
            sum += item.qty;
          }
        });
      });
    }
    if (!isNaN(sum)) {
      return sum;
    }
    return 0;
  },
);

Handlebars.registerHelper(
  'calculateSumOfTotalPriceEquipmentListingDept',
  function (items) {
    let totalPrice = 0;
    items.forEach((department) => {
      department.data.forEach((item) => {
        const price = item.qty * item.cost;
        if (!isNaN(price)) {
          totalPrice = totalPrice + price;
        }
      });
    });
    if (!isNaN(totalPrice)) {
      return totalPrice;
    }
    return 0;
  },
);

Handlebars.registerHelper('calculateSumOfQty', function (items) {
  let sum = 0;
  items.forEach((item) => {
    if (item.qty) {
      sum += item.qty;
    }
  });
  if (!isNaN(sum)) {
    return sum;
  }
  return 0;
});

Handlebars.registerHelper(
  'calculateSumOfTotalEquipmentListingbyFloor',
  function (items) {
    let sum = 0;
    items.forEach((rooms) => {
      rooms.rooms.forEach((room) => {
        room.equipments.forEach((equipment) => {
          if (equipment.qty) {
            sum += equipment.qty;
          }
        });
      });
    });
    if (!isNaN(sum)) {
      return sum;
    }
    return 0;
  },
);

Handlebars.registerHelper(
  'calculateSumOfTotalEquipmentListingBQbyGroup',
  function (items) {
    let sum = 0;

    for (const group in items) {
      const groupObject = items[group];

      for (const group_item in groupObject) {
        const groupEqu = groupObject[group_item];

        groupEqu.forEach((item) => {
          if (item.qty) {
            sum += parseFloat(item.qty);
          }
        });

      }
    }

    if (!isNaN(sum)) {
      return sum;
    }
    return 0;
  },
);

Handlebars.registerHelper(
  'calculateSumOfTotalPriceEquipmentListingBQbyGroup',
  function (items) {
    let totalprice = 0;
    for (const group in items) {
      const groupObject = items[group];

      for (const group_item in groupObject) {
        const groupEqu = groupObject[group_item];

        groupEqu.forEach((item) => {
          if (item.qty) {
            const price = item.qty * item.cost;
            if (!isNaN(price)) {
              totalprice = totalprice + price;
            }
          }
        });

      }
    }


    if (!isNaN(totalprice)) {
      return totalprice;
    }
    return 0;
  },
);

Handlebars.registerHelper(
  'calculateSumOfTotalEquipmentLocationListingbyGroup',
  function (items) {
    let sum = 0;
    for (const group in items) {
      if (items.hasOwnProperty(group)) {
        const groupItems = items[group];
        groupItems.forEach((item) => {
          item.locations.forEach((location) => {
            if (location.qty) {
              sum += parseFloat(location.qty);
            }
          });
        });
      }
    }
    if (!isNaN(sum)) {
      return sum;
    }
    return 0;
  },
);

Handlebars.registerHelper('calculateSumOfTotalEquipmentListingDeptByGroup', function (items) {
  let sum = 0;
  items.forEach((data) => {
    for (const key in data.data) {
      if (data.data.hasOwnProperty(key)) {
        const groupItems = data.data[key];
        groupItems.forEach((item) => {
          if (item.qty) {
            sum += parseFloat(item.qty);
          }
        });
      }
    }
  })
  if (!isNaN(sum)) {
    return sum;
  }
  return 0;
},
);

Handlebars.registerHelper('calculateSumOfTotalPriceEquipmentListingDeptByGroup', function (items) {
  let totalprice = 0;
  items.forEach((data) => {
    for (const key in data.data) {
      if (data.data.hasOwnProperty(key)) {
        const groupItems = data.data[key];
        groupItems.forEach((item) => {
          if (item.qty) {
            const price = item.qty * item.cost;
            if (!isNaN(price)) {
              totalprice = totalprice + price;
            }
          }
        });
      }
    }
  })
  if (!isNaN(totalprice)) {
    return totalprice;
  }
  return 0;
},
);

Handlebars.registerHelper(
  'calculateSumOfTotalEquipmentListingwithRevisionsVariations',
  function (items) {
    let sum = 0;
    items.forEach((item) => {
      if (item.qty) {
        sum += item.qty;
      }
    });
    if (!isNaN(sum)) {
      return sum;
    }
    return 0;
  },
);

Handlebars.registerHelper(
  'calculateSumOfTotalEquipmentListingwithRevisionsVariationsRevQty',
  function (items) {
    let sum = 0;
    items.forEach((item) => {
      if (item.qty_rev) {
        sum += item.qty_rev;
      }
    });
    if (!isNaN(sum)) {
      return sum;
    }
    return 0;
  },
);

Handlebars.registerHelper(
  'calculateSumOfTotalEquipmentListingwithRevisionsVariationsDiffQty',
  function (items) {
    let sum = 0;
    items.forEach((item) => {
      let diff;
      let qty;
      let rev;
      if (item.qty || item.qty_rev) {
        if (!item.qty) qty = 0;
        else qty = item.qty;
        if (!item.qty_rev) rev = 0;
        else rev = item.qty_rev;
      }
      if (qty || rev) {
        diff = qty - rev;
      }
      if (!isNaN(diff)) {
        sum += diff;
      }
    });
    if (!isNaN(sum)) {
      return sum;
    }
    return 0;
  },
);

Handlebars.registerHelper(
  'calculateSumOfTotalDiffQty',
  function (items) {
    let sum = 0;
    items.forEach((item) => {
      let diff;
      let qty;
      let rev;
      if (item.qty || item.qty_rev) {
        if (!item.qty) qty = 0;
        else qty = item.qty;
        if (!item.qty_rev) rev = 0;
        else rev = item.qty_rev;
      }
      if (qty || rev) {
        diff = qty - rev;
      }
      if (!isNaN(diff)) {
        sum += diff;
      }
    });
    if (!isNaN(sum)) {
      return sum;
    }
    return 0;
  },
);

Handlebars.registerHelper(
  'calculateSumOfTotalEquipmentListingwithRevisionsVariationsTotPrice',
  function (items) {
    let totalprice = 0;
    items.forEach((item) => {
      let price = item.qty * item.cost;
      if (!isNaN(price)) {
        totalprice = totalprice + price;
      }
    });
    if (!isNaN(totalprice)) {
      return totalprice;
    }
    return 0;
  },
);

Handlebars.registerHelper('calculateSumOfTotalEquipmentRoomVariation', function (items) {
  let sum = 0;
  items.forEach((item) => {
    item.data.forEach((data) => {
      if (data.qty) {
        sum += data.qty;
      }
    });
  });
  if (!isNaN(sum)) {
    return sum;
  }
  return 0;
},
);

Handlebars.registerHelper('calculateSumOfTotalEquipmentRoomVariationRevQty', function (items) {
  let sum = 0;
  items.forEach((item) => {
    item.data.forEach((data) => {
      if (data.qty_rev) {
        sum += data.qty_rev;
      }
    });
  });
  if (!isNaN(sum)) {
    return sum;
  }
  return 0;
},
);

Handlebars.registerHelper(
  'calculateSumOfTotalEquipmentRoomVariationDiffQty',
  function (items) {
    let sum = 0;
    items.forEach((item) => {
      item.data.forEach((data) => {
        let diff;
        let qty;
        let rev;
        if (data.qty || data.qty_rev) {
          if (!data.qty) qty = 0;
          else qty = data.qty;
          if (!data.qty_rev) rev = 0;
          else rev = data.qty_rev;
        }
        if (qty || rev) {
          diff = qty - rev;
        }
        if (!isNaN(diff)) {
          sum += diff;
        }
      });
    });
    if (!isNaN(sum)) {
      return sum;
    }
    return 0;
  },
);

Handlebars.registerHelper(
  'calculateSumOfTotalEquipmentRoomVariationTotPrice',
  function (items) {
    let totalprice = 0;
    items.forEach((item) => {
      item.data.forEach((data) => {
        let price = data.qty * data.cost;
        if (!isNaN(price)) {
          totalprice = totalprice + price;
        }
      });
    });
    if (!isNaN(totalprice)) {
      return totalprice;
    }
    return 0;
  },
);

Handlebars.registerHelper(
  'calculateSumOfTotalEquipmentListingBQByGroupRevPrevQty',
  function (items) {
    let sum = 0;
    for (const group in items) {
      if (items.hasOwnProperty(group)) {
        const groupItems = items[group];
        groupItems.forEach((item) => {
          if (item.qty) {
            sum += parseFloat(item.qty);
          }
        });
      }
    }
    if (!isNaN(sum)) {
      return sum;
    }
    return 0;
  },
);

Handlebars.registerHelper(
  'calculateSumOfTotalEquipmentListingBQByGroupRevRevQty',
  function (items) {
    let sum = 0;
    for (const group in items) {
      if (items.hasOwnProperty(group)) {
        const groupItems = items[group];
        groupItems.forEach((item) => {
          if (item.qty_rev) {
            sum += parseFloat(item.qty_rev);
          }
        });
      }
    }
    if (!isNaN(sum)) {
      return sum;
    }
    return 0;
  },
);

Handlebars.registerHelper(
  'calculateSumOfTotalEquipmentListingBQByGroupRevDiffQty',
  function (items) {
    let sum = 0;
    for (const group in items) {
      if (items.hasOwnProperty(group)) {
        const groupItems = items[group];
        groupItems.forEach((item) => {
          let diff;
          let qty;
          let rev;
          if (item.qty || item.qty_rev) {
            if (!item.qty) qty = 0;
            else qty = item.qty;
            if (!item.qty_rev) rev = 0;
            else rev = item.qty_rev;
          }
          if (qty || rev) {
            diff = qty - rev;
          }
          if (!isNaN(diff)) {
            sum += diff;
          }
        });
      }
    }
    if (!isNaN(sum)) {
      return sum;
    }
    return 0;
  },
);

Handlebars.registerHelper(
  'calculateSumOfTotalEquipmentListingBQByGroupRevTotPrice',
  function (items) {
    let totalprice = 0;
    for (const group in items) {
      if (items.hasOwnProperty(group)) {
        const groupItems = items[group];
        groupItems.forEach((item) => {
          let price = item.qty * item.cost;
          if (!isNaN(price)) {
            totalprice = totalprice + price;
          }
        });
      }
    }
    if (!isNaN(totalprice)) {
      return totalprice;
    }
    return 0;
  },
);

Handlebars.registerHelper('isFirstIndex', function (index, options) {
  return index === 0 ? options.fn(this) : options.inverse(this);
});
///// end of helper function
export default Handlebars;
