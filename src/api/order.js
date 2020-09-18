import Request from '../assets/utils/request';

export default {
  add(itemId, amount) {
    const params = {itemId, amount}
    return Request.Post('/order/add', params);
  },

};
