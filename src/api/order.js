import Request from '../assets/utils/request';

export default {
  add(itemId, promoId, amount) {
    const params = {itemId, promoId, amount}
    return Request.Post('/order/add', params);
  },

};
