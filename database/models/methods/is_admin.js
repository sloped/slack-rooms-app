const is_admin = function() {
    return this.get('id') === parseInt(process.env.ADMIN_ID) || this.get('is_admin') === 1;
};

module.exports = is_admin;
