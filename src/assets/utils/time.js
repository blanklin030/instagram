import browserTools from './browser';

export default {
  // 返回格式为xx天xx小时xx分钟
  getInterval(begin, end) {
    const stime = Date.parse(new Date(begin));
    const etime = Date.parse(new Date(end));
    // 两个时间戳相差的毫秒数
    const usedTime = etime - stime;
    // 计算相差的天数
    const days = Math.floor(usedTime / (24 * 3600 * 1000));
    // 计算天数后剩余的毫秒数
    const leave1 = usedTime % (24 * 3600 * 1000);
    // 计算出小时数
    const hours = Math.floor(leave1 / (3600 * 1000));
    // 计算小时数后剩余的毫秒数
    const leave2 = leave1 % (3600 * 1000);
    // 计算相差分钟数
    const minutes = Math.floor(leave2 / (60 * 1000));
    let time = '';
    if (days > 0) {
      time = `${days}天`;
    }
    if (hours > 0) {
      time += `${hours}时`;
    }
    if (minutes > 0) {
      time += `${minutes}分`;
    }
    return time;
  },
  getCurrentWeeks() {
    const curYear = (new Date()).getFullYear();
    const curMonth = (new Date()).getMonth() + 1;
    const firstDay = `${curYear}-${curMonth}-01`;
    const obj = new Date(firstDay);
    const firstDayInWeek = obj.getDay();
    let startTime = obj.getTime();
    if (firstDayInWeek !== 1) {
      startTime = obj.getTime() - (firstDayInWeek - 1) * 24 * 60 * 60 * 1000;
    }
    const lastDay = `${curYear}-${curMonth}-${this.getCurrentMonthDays()}`;
    const endTime = (new Date(lastDay)).getTime();
    const list = [];
    for (let index = startTime; index <= endTime; index += 6 * 24 * 60 * 60 * 1000) {
      list.push({
        begin: this.getDateByTimestamp(index).replace(`${curYear}/`, ''),
        end: this.getDateByTimestamp(index + 6 * 24 * 60 * 60 * 1000).replace(`${curYear}/`, ''),
        year: curYear,
      });
      if (list.length === 5) {
        break;
      }
    }
    return list;
  },
  getDateByTimestamp(timestamp=0) {
    if (timestamp === 0) {
      timestamp = (new Date()).getTime()
    }
    const obj = new Date(timestamp);
    const year = obj.getFullYear();
    let month = obj.getMonth() + 1;
    let day = obj.getDate();
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    if (browserTools.isSafari()) {
      return `${year}/${month}/${day}`;
    }
    return `${year}-${month}-${day}`;
  },
  getDateTimeByTimestamp(timestamp = 0) {
    if (timestamp === 0) {
      timestamp = (new Date()).getTime()
    }
    const obj = new Date(timestamp);
    const year = obj.getFullYear();
    let month = obj.getMonth() + 1;
    let day = obj.getDate();
    let hour = obj.getHours();
    let minute = obj.getMinutes();
    let second = obj.getSeconds();
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    if (hour < 10) {
      hour = `0${hour}`;
    }
    if (minute < 10) {
      minute = `0${minute}`;
    }
    if (second < 10) {
      second = `0${second}`;
    }

    if (browserTools.isSafari()) {
      return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
    }
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  },
  getTimestampByDate(date) {
    const obj = new Date(date);
    return obj.getTime();
  },
  // 获取当前月份的总天数
  getCurrentMonthDays() {
    const date = new Date();
    // 将当前月份加1，下移到下一个月
    date.setMonth(date.getMonth() + 1);
    // 将当前的日期置为0，
    date.setDate(0);
    // 再获取天数即取上个月的最后一天的天数
    const days = date.getDate();
    return days;
  },
  // 获取每周一的日期
  getMonday(timestamp = false) {
    let obj = new Date();
    let today = obj.getDay();
    today = today === 0 ? 7 : today;
    if (today !== 1) {
      obj = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * (today - 1));
    }
    if (timestamp) {
      return obj.getTime();
    }
    return this.getDateByTimestamp(obj.getTime());
  },
  // 获取每个月的1号
  getFirstDayOfMonth() {
    const today = this.getDateByTimestamp((new Date().getTime()));
    if (browserTools.isSafari()) {
      const tmp = today.split('/');
      return `${tmp[0]}/${tmp[1]}/01`;
    }
    const tmp = today.split('-');
    return `${tmp[0]}-${tmp[1]}-01`;
  },
};
