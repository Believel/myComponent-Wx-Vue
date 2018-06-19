import Mock from 'mockjs';

const List = Mock.mock({
    'pageNum': 1,  // 当前页索引
    'pageSize': 15, // 每页最大条数

    'size': 9,    // 当前页条数
    'total': 9,  // 总条数
    'pages': 1, // 总页数
    'list|1-20': [
        {
            'id|+1': 1000,
            'name|string': '@name' // @name根据name命令生成随机名称
        }
    ]
})


export default {
    getList: config => {
        let {pageNum, pageSize} = config;
        
    }
}