const mysql = require('mysql2');

// MySQL 클라이언트 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'exampledb',
  password: 'minsu1234',
});

// 데이터베이스에 연결
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// 쿼리 실행
connection.query('SELECT NOW()', (err, results, fields) => {
  if (err) {
    console.error('Error executing query:', err.stack);
    return;
  }
  console.log('Query result:', results);
});

// 연결 종료
connection.end((err) => {
  if (err) {
    console.error('Error ending the connection:', err.stack);
    return;
  }
  console.log('Connection ended.');
});
