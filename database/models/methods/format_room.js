const format_room = function() {
    return {
        id: this.get('id'),
        name: this.get('name'),
        calendar: this.get('gid'),
        building: this.get('building')
    };
};

module.exports = format_room;
