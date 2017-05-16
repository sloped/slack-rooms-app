import later from 'later';
export var every_second = later.parse.recur().every(1).second();
export var every_minute = later.parse.cron('* * * * *');
export var every_two_minutes = later.parse.cron('*/2 * * * *');
export var every_five_minutes = later.parse.cron('*/5 * * * *');
export var ten_minutes = later.parse.cron('*/10 * * * *');
export var hourly = later.parse.cron('0 * * * *');
export var daily = later.parse.cron('0 0 * * *');
export var one_after_midnight = later.parse.cron('1 0 * * *');
