const studentService = require('./studentService');

exports.list = (req, res) => {
  const students = studentService.getAll();
  res.render("./user/students/list", students);
};

exports.details = (req, res) => {
  const studentId = req.params.studentId;

  const student = studentService.getByStudentId(studentId);
  res.render('./user/students/details', student);
}