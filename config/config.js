export default {
  database: 'controlefacil',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: `${process.env.NODE_ENV}_controlefacil.sqlite`,
    define: {
      underscored: true,
    },
  },
  jwtSecret: 'Sec3t',
  jwtSession: { session: false },
};
