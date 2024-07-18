const { Op } = require('sequelize');
const { Member, Role } = require('../models'); // Adjust path based on your project structure

class AdminService {
  async findAll(role, pageable) {
    try {
      const options = {
        offset: pageable.page * pageable.size,
        limit: pageable.size,
        include: [
          {
            model: Role,
            where: role ? { name: role } : {}
          }
        ]
      };

      const result = await Member.findAndCountAll(options);
      return result;
    } catch (error) {
      throw new Error('Error retrieving members: ' + error.message);
    }
  }

  async findById(id) {
    try {
      const member = await Member.findByPk(id);
      if (!member) {
        throw new Error('Member not found');
      }
      return member;
    } catch (error) {
      throw new Error('Error retrieving member: ' + error.message);
    }
  }

  async approve(id) {
    try {
      const member = await this.findById(id);

      if (member.status === 'ACTIVE') {
        throw new Error('Member is already activated');
      }

      member.status = 'ACTIVE';
      await member.save();
    } catch (error) {
      throw new Error('Error approving member: ' + error.message);
    }
  }

  async update(id, memberRequest) {
    try {
      const member = await this.findById(id);

      // Validate memberRequest here

      member.name = memberRequest.name;
      member.email = memberRequest.email;
      member.phone = memberRequest.phone;
      member.status = memberRequest.status;
      member.city = memberRequest.city;
      member.address = memberRequest.address;
      member.state = memberRequest.state;
      member.zip = memberRequest.zip;
      await member.save();

      return member;
    } catch (error) {
      throw new Error('Error updating member: ' + error.message);
    }
  }
}

module.exports = new AdminService();
