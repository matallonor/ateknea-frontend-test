export const navigation = [
  {
    title: true,
    name: 'USER MANAGEMENT',
    admin: true,
  },
  {
    name: 'Users',
    url: '#',
    icon: 'icon-user icons',
    admin: true,
    children: [
      {
        name: 'Users List',
        url: '/users',
        icon: 'icon-list'
      },
    ]
  },
];
