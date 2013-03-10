var _ = require('underscore');

module.exports = {
    model: require('../models/skill'),
    data: {
        blue: [],
        red: [],
        green: []
    },
    prepare_set: function(color, data) {

        _this = module.exports;

        _this.data[color] = [];

        _.each(data[color], function(row) {
            var skill = new _this.model.defaults();

            skill.level = row.level;
            skill.color = color;
            skill.skill = row.skill;

            if (skill.level > 0) {
                skill.level_1 = 'dece';
            }
            if (skill.level > 1) {
                skill.level_2 = 'solid';
            }
            if (skill.level > 2) {
                skill.level_3 = 'good';
            }
            if (skill.level > 3) {
                skill.level_4 = 'better';
            }
            if (skill.level > 4) {
                skill.level_5 = 'awesome';
            }

            _this.data[color].push(skill);

        });

    },
};