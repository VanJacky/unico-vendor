export async function getOrder(id) {
  return (await getOrders()).find((order) => order.id.toString() === id)
}

export async function getRecentOrders() {
  return (await getOrders()).slice(0, 10)
}


export async function getCategory() {
  return [
    {
      "id": 1,
      "sortOrder": 10,
      "categoryName": "日用百货",
      "productQuantity": 100,
      "show": true,
      "createTime": "2021-02-28 10:30"
    },
    {
      "id": 2,
      "sortOrder": 20,
      "categoryName": "电子产品",
      "productQuantity": 50,
      "show": false,
      "createTime": "2021-03-05 14:00"
    },
    {
      "id": 3,
      "sortOrder": 30,
      "categoryName": "家具",
      "productQuantity": 75,
      "show": true,
      "createTime": "2021-03-15 09:20"
    }
  ]
}


export async function getStock() {
  return [
    {
      "id": 1,
      "name": "Wireless Earbuds",
      "image": "/events/bear-hug-thumb.jpg",
      "specs": "Bluetooth 5.0, Noise Cancelling",
      "remainingStock": 120,
      "totalOutbound": 80,
      "createTime": "2024-03-10 15:30",
      "stockAlert": false
    },
    {
      "id": 2,
      "name": "Smartphone Case",
      "image": "/events/bear-hug-thumb.jpg",
      "specs": "Silicone, Shockproof",
      "remainingStock": 25,
      "totalOutbound": 150,
      "createTime": "2024-01-15 09:45",
      "stockAlert": true
    },
    {
      "id": 3,
      "name": "USB-C Charger",
      "image": "/events/bear-hug-thumb.jpg",
      "specs": "20W Fast Charge",
      "remainingStock": 200,
      "totalOutbound": 100,
      "createTime": "2024-02-20 18:20",
      "stockAlert": false
    }
  ]
}
export async function getCoupons() {
  return [
    {
      "couponName": "3折优惠",
      "discountType": "百分比",
      "discountAmount": "-30%",
      "usageRules": "最高减少10元",
      "applicableScope": "所有商品",
      "claimedQuantity": 1000,
      "usedQuantity": 500,
      "status": "进行中",
      "creationTime": "2024.08.01"
    },
    {
      "couponName": "满20减10元",
      "discountType": "金额",
      "discountAmount": "-¥10",
      "usageRules": "满20元以上",
      "applicableScope": "干锅类：麻辣干锅，特价干锅",
      "claimedQuantity": 1000,
      "usedQuantity": 500,
      "status": "已结束",
      "creationTime": "2024.08.01"
    },
    {
      "couponName": "免费奶茶",
      "discountType": "商品兑换",
      "discountAmount": "无",
      "usageRules": "无",
      "applicableScope": "奶茶类：特质奶茶",
      "claimedQuantity": 1000,
      "usedQuantity": 500,
      "status": "已结束",
      "creationTime": "2024.08.01"
    }
  ]
}

export async function getPaidCoupons() {
  return [
    {
      "couponName": "10元付费优惠券",
      "type": "付费优惠券",
      "usableProducts": "白菜，茼蒿",
      "quantity": 1000,
      "faceValue": "10.00元",
      "purchaseCount": 500,
      "usageCount": 500
    },
    {
      "couponName": "10元付费优惠券",
      "type": "付费优惠券",
      "usableProducts": "娃娃菜",
      "quantity": 1000,
      "faceValue": "10.00元",
      "purchaseCount": 500,
      "usageCount": 500
    }
  ]
}

export async function getCashbackUsers() {
  return [
    {
      "userNumber": "BZ152654",
      "username": "王某某",
      "userPhone": "17595584585", 
      "userEmail": "17595584585@gmail.com",
      "cashbackPoints": 2000
    },
    {
      "userNumber": "BZ152654",
      "username": "王某某",
      "userPhone": "17595584585",
      "userEmail": "17595584585@gmail.com", 
      "cashbackPoints": 2000
    },
    {
      "userNumber": "BZ152654",
      "username": "王某某",
      "userPhone": "17595584585",
      "userEmail": "17595584585@gmail.com",
      "cashbackPoints": 2000
    }
  ]
}

export async function getStoredValueOrders() {
  return [
    {
      "orderId": "BZ152654",
      "userId": "BZ152654", 
      "username": "王某某",
      "contactMethod": "17595584585",
      "storedAmount": 2000,
      "giftAmount": 2000,
      "orderTime": "10/20/2021"
    },
    {
      "orderId": "BZ152654",
      "userId": "BZ152654",
      "username": "王某某", 
      "contactMethod": "17595584585@gmail.com",
      "storedAmount": 2000,
      "giftAmount": 2000,
      "orderTime": "10/20/2021"
    },
    {
      "orderId": "BZ152654",
      "userId": "BZ152654",
      "username": "王某某",
      "contactMethod": "17595584585",
      "storedAmount": 2000,
      "giftAmount": 2000,
      "orderTime": "10/20/2021"
    }
  ]
}


export async function getMessages() {
  return [
    {
      "title": "消息预览名称文字",
      "sendMethod": "App内置",
      "relatedCoupon": "优惠券1",
      "users": "全体用户",
      "pushStatus": "已推送",
      "publishTime": "2024-10-16 16:14",
      "pushCount": 500
    },
    {
      "title": "消息预览名称文字",
      "sendMethod": "邮箱",
      "relatedCoupon": "指定用户",
      "users": "未推送",
      "pushStatus": "未推送",
      "publishTime": "--",
      "pushCount": 27
    },
    {
      "title": "消息预览名称文字",
      "sendMethod": "邮箱",
      "relatedCoupon": "优惠券1",
      "users": "会员用户",
      "pushStatus": "已推送",
      "publishTime": "2024-10-16 16:14",
      "pushCount": 500
    }
  ]
}
export async function getActivity() {
  return [
    {
      "activityName": "超级特卖",
      "activityProduct": "海南芒果",
      "startTime": "2024.11.01",
      "endTime": "2024.11.30",
      "currentDiscount": "75折",
      "status": "待开始"
    },
    {
      "activityName": "限时抢购",
      "activityProduct": "进口车厘子",
      "startTime": "2024.12.01",
      "endTime": "2024.12.07",
      "currentDiscount": "6折",
      "status": "进行中"
    },
    {
      "activityName": "周末大促",
      "activityProduct": "本地草莓",
      "startTime": "2024.01.01",
      "endTime": "2024.01.03",
      "currentDiscount": "9折",
      "status": "已结束"
    },
    {
      "activityName": "节日盛典",
      "activityProduct": "精选葡萄酒",
      "startTime": "2024.02.14",
      "endTime": "2024.02.16",
      "currentDiscount": "8折",
      "status": "待开始"
    }
  ]
}

export async function getOrders() {
  return [
    {
      id: 3000,
      url: '/orders/3000',
      date: 'May 9, 2024',
      period: '2024-10-16~2024-10-17',
      amount: {
        usd: '$80.00',
        cad: '$109.47',
        fee: '$3.28',
        net: '$106.19',
      },
      payment: {
        transactionId: 'ch_2HLf8DfYJ0Db7asfCC5T546TY',
        card: {
          number: '1254',
          type: 'American Express',
          expiry: '01 / 2025',
        },
      },
      shipping: {
        method: 'Standard Shipping',
        trackingNumber: '1Z999AA10123456784',
      },
      status: 'Completed',
      phoneNumber: '+1 416-555-1234',
      notes: 'Please leave the package at the front door.Please leave the package at the front door.Please leave the package at the front door.Please leave the package at the front door.Please leave the package at the front door.',
      products: [
        {
          id: 'prod_101',
          name: 'Wireless Headphones',
          quantity: 1,
          price: '$80.00',
          currency: 'USD',
        },
      ],
      customer: {
        name: 'Leslie Alexander',
        email: 'leslie.alexander@example.com',
        address: '123 Main St. Toronto, ON',
        country: 'Canada',
        countryFlagUrl: '/flags/ca.svg',
      },
      event: await getEvent('1000'),
    },
    {
      id: 3001,
      url: '/orders/3001',
      date: 'May 5, 2024',
      period: '2024-10-16~2024-10-17',
      amount: {
        usd: '$299.00',
        cad: '$409.13',
        fee: '$12.27',
        net: '$396.86',
      },
      payment: {
        transactionId: 'ch_1KLf7AsYJ0Dda7fs3CC5d46TY',
        card: {
          number: '3897',
          type: 'Visa',
          expiry: '06 / 2024',
        },
      },
      shipping: {
        method: 'Express Shipping',
        trackingNumber: '1Z999AA10123456785',
      },
      status: 'Shipped',
      phoneNumber: '+1 212-555-5678',
      notes: 'Gift wrap this item, please.',
      products: [
        {
          id: 'prod_102',
          name: 'Smart Watch',
          quantity: 1,
          price: '$299.00',
          currency: 'USD',
        },
      ],
      customer: {
        name: 'Michael Foster',
        email: 'michael.foster@example.com',
        address: '357 Bridge St. New York, NY',
        country: 'USA',
        countryFlagUrl: '/flags/us.svg',
      },
      event: await getEvent('1001'),
    },
    {
      id: 3002,
      url: '/orders/3002',
      date: 'Apr 28, 2024',
      period: '2024-10-16~2024-10-17',
      amount: {
        usd: '$150.00',
        cad: '$205.25',
        fee: '$6.15',
        net: '$199.10',
      },
      payment: {
        transactionId: 'ch_2DLf5AsYJ0Ddb7fs3CC5d46TY',
        card: {
          number: '7421',
          type: 'Mastercard',
          expiry: '12 / 2026',
        },
      },
      shipping: {
        method: 'Standard Shipping',
        trackingNumber: '1Z999AA10123456786',
      },
      status: 'Not Shipped',
      phoneNumber: '+1 604-555-1234',
      notes: 'Contact before delivery.',
      products: [
        {
          id: 'prod_103',
          name: 'Bluetooth Speaker',
          quantity: 1,
          price: '$150.00',
          currency: 'USD',
        },
      ],
      customer: {
        name: 'Dries Vincent',
        email: 'dries.vincent@example.com',
        address: '456 Elm St. Vancouver, BC',
        country: 'Canada',
        countryFlagUrl: '/flags/ca.svg',
      },
      event: await getEvent('1002'),
    },
    {
      id: 3003,
      url: '/orders/3003',
      date: 'Apr 23, 2024',
      period: '2024-10-16~2024-10-17',
      amount: {
        usd: '$80.00',
        cad: '$109.47',
        fee: '$3.28',
        net: '$106.19',
      },
      payment: {
        transactionId: 'ch_3KLf6DfYJ0Db7fassCC546TY',
        card: {
          number: '5683',
          type: 'Visa',
          expiry: '06 / 2024',
        },
      },
      shipping: {
        method: 'In-Store Pickup',
        trackingNumber: null,
      },
      status: 'Ready for Pickup',
      phoneNumber: '+1 514-555-5678',
      notes: '',
      products: [
        {
          id: 'prod_104',
          name: 'Fitness Tracker',
          quantity: 1,
          price: '$80.00',
          currency: 'USD',
        },
      ],
      customer: {
        name: 'Lindsay Walton',
        email: 'lindsay.walton@example.com',
        address: '789 Oak St. Montreal, QC',
        country: 'Canada',
        countryFlagUrl: '/flags/ca.svg',
      },
      event: await getEvent('1000'),
    },
    // Add more orders with similar structure...
  ];
}




export async function getEvent(id) {
  return (await getEvents()).find((event) => event.id.toString() === id)
}

export async function getEventOrders(id) {
  return (await getOrders()).filter((order) => order.event.id.toString() === id)
}

export async function getEvents() {
  return [
    {
      id: 1000,
      name: 'Device NameA',
      url: '/events/1000',
      date: 'May 20, 2024',
      time: '10 PM',
      location: 'Harmony Theater, Winnipeg, MB',
      totalRevenue: '$102,552',
      totalRevenueChange: '+3.2%',
      ticketsAvailable: 500,
      ticketsSold: 350,
      ticketsSoldChange: '+8.1%',
      pageViews: '24,300',
      pageViewsChange: '-0.75%',
      status: 'Active',
      imgUrl: '/events/bear-hug.jpg',
      thumbUrl: '/events/bear-hug-thumb.jpg',
    },
    {
      id: 1001,
      name: 'Device NameB',
      url: '/events/1001',
      date: 'Jun 2, 2024',
      time: '8 PM',
      location: 'Moonbeam Arena, Uxbridge, ON',
      totalRevenue: '$24,115',
      totalRevenueChange: '+3.2%',
      ticketsAvailable: 150,
      ticketsSold: 72,
      ticketsSoldChange: '+8.1%',
      pageViews: '57,544',
      pageViewsChange: '-2.5%',
      status: 'Closed',
      imgUrl: '/events/six-fingers.jpg',
      thumbUrl: '/events/six-fingers-thumb.jpg',
    },
    {
      id: 1002,
      name: 'Device NameC',
      url: '/events/1002',
      date: 'Aug 5, 2024',
      time: '4 PM',
      location: 'Electric Coliseum, New York, NY',
      totalRevenue: '$40,598',
      totalRevenueChange: '+3.2%',
      ticketsAvailable: 275,
      ticketsSold: 275,
      ticketsSoldChange: '+8.1%',
      pageViews: '122,122',
      pageViewsChange: '-8.0%',
      status: 'Closed',
      imgUrl: '/events/we-all-look-the-same.jpg',
      thumbUrl: '/events/we-all-look-the-same-thumb.jpg',
    },
    {
      id: 1003,
      name: 'Device NameD',
      url: '/events/1003',
      date: 'Dec 31, 2024',
      time: '8 PM',
      location: 'Tapestry Hall, Cambridge, ON',
      totalRevenue: '$3,552',
      totalRevenueChange: '+3.2%',
      ticketsAvailable: 40,
      ticketsSold: 6,
      ticketsSoldChange: '+8.1%',
      pageViews: '9,000',
      pageViewsChange: '-0.15%',
      status: 'Active',
      imgUrl: '/events/viking-people.jpg',
      thumbUrl: '/events/viking-people-thumb.jpg',
    },
  ]
}

export function getCountries() {
  return [
    {
      name: 'Canada',
      code: 'CA',
      flagUrl: '/flags/ca.svg',
      regions: [
        'Alberta',
        'British Columbia',
        'Manitoba',
        'New Brunswick',
        'Newfoundland and Labrador',
        'Northwest Territories',
        'Nova Scotia',
        'Nunavut',
        'Ontario',
        'Prince Edward Island',
        'Quebec',
        'Saskatchewan',
        'Yukon',
      ],
    },
    {
      name: 'Mexico',
      code: 'MX',
      flagUrl: '/flags/mx.svg',
      regions: [
        'Aguascalientes',
        'Baja California',
        'Baja California Sur',
        'Campeche',
        'Chiapas',
        'Chihuahua',
        'Ciudad de Mexico',
        'Coahuila',
        'Colima',
        'Durango',
        'Guanajuato',
        'Guerrero',
        'Hidalgo',
        'Jalisco',
        'Mexico State',
        'Michoacán',
        'Morelos',
        'Nayarit',
        'Nuevo León',
        'Oaxaca',
        'Puebla',
        'Querétaro',
        'Quintana Roo',
        'San Luis Potosí',
        'Sinaloa',
        'Sonora',
        'Tabasco',
        'Tamaulipas',
        'Tlaxcala',
        'Veracruz',
        'Yucatán',
        'Zacatecas',
      ],
    },
    {
      name: 'United States',
      code: 'US',
      flagUrl: '/flags/us.svg',
      regions: [
        'Alabama',
        'Alaska',
        'American Samoa',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Washington DC',
        'Micronesia',
        'Florida',
        'Georgia',
        'Guam',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Marshall Islands',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Northern Mariana Islands',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Palau',
        'Pennsylvania',
        'Puerto Rico',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'U.S. Virgin Islands',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming',
        'Armed Forces Americas',
        'Armed Forces Europe',
        'Armed Forces Pacific',
      ],
    },
  ]
}
