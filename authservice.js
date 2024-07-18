const TokenResponse = require('../controllers/response/tokenresponse');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Role, Member } = require('../models'); // Adjust path based on your project structure

class AuthService {
  constructor(secret, accessTokenExpiry = 1000 * 3, refreshTokenExpiry = 1000 * 60 * 20) {
    this.secret = secret;
    this.ACCESS_TOKEN_EXPIRED = accessTokenExpiry; // Default to 3 seconds for testing
    this.REFRESH_TOKEN_EXPIRED = refreshTokenExpiry; // Default to 20 minutes
  }

  async getAuthenticatedUser(email) {
    try {
      const member = await Member.findOne({ where: { email } });
      if (!member) {
        throw new Error('User not found');
      }
      return member;
    } catch (error) {
      throw new Error('Error retrieving authenticated user: ' + error.message);
    }
  }

  async authenticate(email, password) {
    try {
      const member = await Member.findOne({ where: { email } });
      if (!member || !bcrypt.compareSync(password, member.password)) {
        throw new Error('Incorrect username or password');
      }
      return member;
    } catch (error) {
      throw new Error('Error during authentication: ' + error.message);
    }
  }

  createToken(email, roles, tokenType, expired) {
    const payload = {
      email,
      roles: roles.map(r => ({ role: r.name })),
      subject: tokenType
    };
    return jwt.sign(payload, this.secret, { expiresIn: expired });
  }

  async issueAccessToken(authRequest) {
    try {
      const { email, password } = authRequest;
      const member = await this.authenticate(email, password);
      const roles = await member.getRoles();

      const accessToken = this.createToken(email, roles, 'ACCESS_TOKEN', this.ACCESS_TOKEN_EXPIRED);
      const refreshToken = this.createToken(email, roles, 'REFRESH_TOKEN', this.REFRESH_TOKEN_EXPIRED);

      return new TokenResponse(accessToken, refreshToken);
    } catch (error) {
      throw new Error('Error issuing access token: ' + error.message);
    }
  }

  async registerCustomer(registerRequest) {
    return this.register(registerRequest, 'Customer');
  }

  async registerOwner(registerRequest) {
    return this.register(registerRequest, 'Owner', 'INACTIVE');
  }

  async registerAdmin(registerRequest) {
    return this.register(registerRequest, 'Admin');
  }

  async register(registerRequest, roleName, status = 'ACTIVE') {
    try {
      const role = await Role.findOne({ where: { name: roleName } });
      const hashedPassword = bcrypt.hashSync(registerRequest.password, 8);

      const member = await Member.create({
        name: registerRequest.name,
        email: registerRequest.email,
        password: hashedPassword,
        status,
        roles: [role]
      });

      return member;
    } catch (error) {
      throw new Error(`Error registering ${roleName}: ` + error.message);
    }
  }
}

module.exports = AuthService;
