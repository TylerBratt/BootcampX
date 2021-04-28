const { Pool } = require('pg');

const pool = new Pool ({
  user: 'tylerbratt',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT DISTINCT cohorts.name as cohort, teachers.name as teacher
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON students.id = student_id 
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
ORDER BY teacher;
`;
const cohortName = process.argv[2] || 'JUL02';
const values = [`%${cohortName}%`];

pool.query(queryString, values)
.then(res => {
  return res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
}).catch(err => console.error('query error', err.stack));