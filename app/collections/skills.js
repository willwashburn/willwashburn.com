var _ = require('underscore');

module.exports = {
    model: require('../models/skill'),
    columns: [],
    prepare_set: function(color, data) {

        var _this = module.exports,
            table = [];


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

            table.push(skill);

        });

        return table;

    },
    prepare: function(colors, database) {
        var _this = module.exports,
            columns = [];

        _.each(colors, function(color) {

            var skills = _this.prepare_set(color, database);
            columns.push({
                color: color,
                skills: skills
            });
        });

        _this.columns = columns;

        return columns;

    }
};