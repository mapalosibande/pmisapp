const adminService = require('../services/adminservice');
const MemberRequest = require('../controllers/request/memberrequest');
const MemberResponse = require('../controllers/response/memberresponse');
const PageResponse = require('../controllers/response/pageresponse');

exports.findAll = (req, res) => {
  const role = req.query.role;
  const pageable = {
    size: parseInt(req.query.size) || 50,
    page: parseInt(req.query.page) || 0
  };
  const { data, totalElements, totalPages } = adminService.findAll(role, pageable);
  const responseData = data.map(member => new MemberResponse(member).toJSON());
  res.status(200).json(new PageResponse(responseData, totalElements, totalPages, pageable.page, pageable.size));
};

exports.update = (req, res) => {
  const id = parseInt(req.params.id);
  const memberRequest = new MemberRequest(req.body);
  adminService.update(id, memberRequest);
  res.status(204).send('User updated');
};

exports.approve = (req, res) => {
  const id = parseInt(req.params.id);
  adminService.approve(id);
  res.status(204).send('User approved');
};
