const format_room = function() {
    return {
        id: this.get('id'),
        name: this.get('name'),
        calendar: this.get('gid')
    };
};

module.exports = format_room;
