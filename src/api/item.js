import Request from '../assets/utils/request';

export default {
  add(params) {
    params.imgUrl = JSON.stringify(params.imgUrl);
    return Request.Post('/item/add', params);
  },

  edit(params) {
    return Request.Put('/item/edit', params);
  },

  delete(itemId) {
    return Request.Put('/item/delete/' + itemId);
  },

  getDetail(itemId) {
    return Request.Get('/item/detail/' + itemId);
  },

  getList(page, size) {
    return Request.Get('/item/list?page='+page+'&size='+size);
  },

  getIndexList(page, size) {
    return Request.Get('/item/index/list?page=' + page + '&size=' + size);
  },
};
