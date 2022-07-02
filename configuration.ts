export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  bd: {
    user: process.env.USER_BD,
    password: process.env.PASSWORD_BD,
    host: process.env.HOST_BD,
    port: parseInt(process.env.PORT_BD, 10) || 3306,
    name: process.env.DATABASE,
  },
});
