export default {
  // 设置cookie
  setExpire(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue}; ${expires}`;
  },
  // 写cookies
  set(name, value) {
    const Days = 30;
    const exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()}`;
  },
  // 获取cookie
  get(cname) {
    const name = `${cname}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
    }
    return false;
  },
  // 删除cookies
  remove(name) {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = this.get(name);
    if (cval !== null) { document.cookie = `${name}=${cval};expires=${exp.toGMTString()}`; }
  },
};
