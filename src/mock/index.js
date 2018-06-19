import Mock from 'mockjs'
import listAPI from './list';

// 列表数据
Mock.mock(/\/list/, 'post', listAPI.getList)



export default Mock