const { students } = require('./studentDatasource');

exports.getAll = () => {
  return students;
};

exports.getByStudentId = (studentId) => {
  return students.find((student) => student.studentId === studentId);
};