class CustomizeUserDetails {
  constructor(member) {
    if (!member || !member.roles || !member.password || !member.email) {
      throw new Error('Invalid member object');
    }
    this.member = member;
  }

  getAuthorities() {
    return this.member.roles.map(role => role.name);
  }

  getPassword() {
    return this.member.password; // Ensure passwords are hashed and not plain text
  }

  getUsername() {
    return this.member.email;
  }

  isAccountNonExpired() {
    return !this.member.accountExpired; // Assuming member object has accountExpired property
  }

  isAccountNonLocked() {
    return !this.member.accountLocked; // Assuming member object has accountLocked property
  }

  isCredentialsNonExpired() {
    return !this.member.credentialsExpired; // Assuming member object has credentialsExpired property
  }

  isEnabled() {
    return this.member.enabled; // Assuming member object has enabled property
  }
}

// Example usage
const member = {
  roles: [{ name: 'ROLE_USER' }, { name: 'ROLE_ADMIN' }],
  password: 'hashedPassword123', // Password should be hashed
  email: 'user@example.com',
  accountExpired: false,
  accountLocked: false,
  credentialsExpired: false,
  enabled: true,
};

const userDetails = new CustomizeUserDetails(member);
console.log(userDetails.getAuthorities()); // ['ROLE_USER', 'ROLE_ADMIN']
console.log(userDetails.getPassword()); // 'hashedPassword123'
console.log(userDetails.getUsername()); // 'user@example.com'
console.log(userDetails.isAccountNonExpired()); // true
console.log(userDetails.isAccountNonLocked()); // true
console.log(userDetails.isCredentialsNonExpired()); // true
console.log(userDetails.isEnabled()); // true
