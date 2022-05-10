/**
 * 字段属性
 * label: 显示名
 * name: 数据库字段名
 * IsaddKey: 是否显示表单；false --> 显示；true --> 隐藏
 * type: 数据库类型
 * width: Table字段宽度；如果是'150px'，Table字段宽度会根据label属性值的字符长度来计算
 * required: 字段是否必填
 * resultKey: 下拉key
 * childrens: 下拉值
 * search: 搜索；important | normal | none
 * multiTagSearch: 多标签搜索
 * sort: 排序
 * formType: 前端表单类型
 * formIndex: 表单顺序；从小到大
 * tip: 页面提示
 * precision: 小数精度几位
 * nolabel: 是否去掉输入框前文字
 * inline: 行内显示输入框
 * short: 输入框变短
 * after: 写在input后面的文字
 *
 * 关于表单类型formType
 * 'input_num': 数字输入框precision设置小数保留几位默认0即保留整数（可选）
 * 'input': 正常输入框没啥说的
 * 'input_qr': 带二维码的输入框当输入框有值时在输入框下方自动生成对应二维码
 * 'textarea': 多行文本
 * 'select': 下拉框
 * 'selectGroup': 带多选的下拉框
 * 'switch': 开关 默认打开时文字t_label:'启用中',关闭时文字f_label:'停用'
 * 'checkbox': 单独的多选框可传text:'开启'修改单选框后跟随文字默认文字'开启'
 * 'radio': 单选没啥好说的感觉像下拉框的另一种表达方式
 * 'date': 单个的日期选择
 * 'start': 对应双日期选择的开始时间 例如：2022年3月1日 至 2022年3月7日 即start代表 2022年3月1日
 * 'end': 对应双日期选择的结束时间 例如：2022年3月1日 至 2022年3月7日 即end代表 2022年3月7日
 * ! 'start'与'end'必须成对出现缺一不可目前仅支持一个页面一对
 * 'img'对应图片上传目前没有返回值
 * 'file'对应附件上传目前没有返回值
 * 计划新增inline:true新增属性可控制表单行内显示short:true新增短输入框模式
 */
export const keyList = [
  {
    label: '整数',
    name: 'f_int1',
    IsaddKey: false,
    type: 'int',
    width: '150px',
    required: true,
    resultKey: 'f_int1',
    childrens: [],
    search: 'important',
    multiTagSearch: [{
      value: 1,
      label: '一'
    }, {
      value: 2,
      label: '二'
    }, {
      value: 3,
      label: '三'
    }],
    sort: true,
    formType: 'input',
    formIndex: 0,
    tip: '',
    precision: 0,
    nolabel: false,
    inline: false,
    short: false,
    after: ''
  },
  {
    label: '小数1',
    name: 'f_decimal1',
    IsaddKey: true,
    type: 'decimal',
    width: '150px',
    required: true,
    resultKey: 'f_decimal1',
    childrens: [],

    formType: 'input_num',
    precision: 2,
    tip: '保留2位小数',
    formIndex: 11
  },
  {
    label: '字符串1',
    name: 'f_string1',
    IsaddKey: true,
    type: 'string',
    width: '150px',
    required: true,
    resultKey: 'f_string1',
    childrens: [],

    disabled: true,
    formType: 'input',
    inline: true,
    // formType:'select',
    formIndex: 1
  },
  {
    label: '日期时间1',
    name: 'f_dateTime1',
    IsaddKey: true,
    type: 'DateTime',
    width: '150px',
    required: true,
    resultKey: 'f_dateTime1',
    childrens: [],

    formType: 'date',
    formIndex: 16
  },
  {
    label: '整数2',
    name: 'f_int2',
    IsaddKey: false,
    type: 'int',
    width: '150px',
    required: false,
    resultKey: 'f_int2',
    childrens: [
      { label: '太原', value: '1' },
      { label: '忻州', value: '2' },
      { label: '原平', value: '3' },
      { label: '大同', value: '4' },
      { label: '迎新街', value: '5' }
    ],
    formIndex: 7,

    formType: 'radio'
    // formType:'input_num',
    // precision:0,
    // tip:'隐藏功能按上下箭头可以改变数值',
  },
  {
    label: '小数2',
    name: 'f_decimal2',
    IsaddKey: true,
    type: 'string',
    width: '150px',
    required: false,
    resultKey: 'f_decimal2',
    childrens: [],

    // nolabel:true,//去掉输入框前文字
    inline: true, // 行内显示输入框
    // short:true,//输入框变短
    formType: 'input_num',
    formIndex: 12
  },
  {
    label: '字符串2',
    name: 'f_string2',
    IsaddKey: true,
    type: 'string',
    width: '150px',
    required: false,
    resultKey: 'f_string2',
    childrens: [],

    formType: 'input_qr',
    tip: '自动生成二维码',
    formIndex: 2
  },
  {
    label: '日期时间2',
    name: 'f_dateTime2',
    IsaddKey: true,
    type: 'DateTime',
    width: '150px',
    required: true,
    resultKey: 'f_dateTime2',
    childrens: [],

    formType: 'start',
    formIndex: 17
  },
  {
    label: '整数3',
    name: 'f_int3',
    IsaddKey: false,
    type: 'int',
    width: '150px',
    required: false,
    resultKey: 'f_int3',
    childrens: [],

    formType: 'switch',
    formIndex: 7
  },
  {
    label: '小数3',
    name: 'f_decimal3',
    IsaddKey: true,
    type: 'decimal',
    width: '150px',
    required: true,
    resultKey: 'f_decimal3',
    childrens: [],

    // nolabel:true,//去掉输入框前文字
    inline: true, // 行内显示输入框
    short: true, // 输入框变短
    formType: 'input_num',
    precision: 3,
    // tip:'保留3位小数',
    formIndex: 13
  },
  {
    label: '字符串3',
    name: 'f_string3',
    IsaddKey: true,
    type: 'string',
    width: '150px',
    required: false,
    resultKey: 'f_string3',
    childrens: [
      { label: '太原', value: '太原' },
      { label: '忻州', value: '忻州' },
      { label: '原平', value: '原平' },
      { label: '大同', value: '大同' },
      { label: '迎新街', value: '迎新街' }
    ],

    // inline:true,
    // short:true,
    // nolabel:true,
    formType: 'select',
    // tip:'目前选项是写死的',
    formIndex: 3
  },
  {
    label: '日期时间3',
    name: 'f_dateTime3',
    IsaddKey: true,
    type: 'DateTime',
    width: '150px',
    required: false,
    resultKey: 'f_dateTime3',
    childrens: [],

    formType: 'end',
    formIndex: 18
  },
  {
    label: '整数4',
    name: 'f_int4',
    IsaddKey: false,
    type: 'int',
    width: '150px',
    required: false,
    resultKey: 'f_int4',
    childrens: [],

    // nolabel:true,//去掉输入框前文字
    inline: true, // 行内显示输入框
    formType: 'checkbox',
    // text:'多选框的文字',//可以没有我默认给了开启
    // tip:'这文字我不知道是写的还是取的',
    formIndex: 9
  },
  {
    label: '小数4',
    name: 'f_decimal4',
    IsaddKey: true,
    type: 'decimal',
    width: '150px',
    required: false,
    resultKey: 'f_decimal4',
    childrens: [],

    after: '个',
    // nolabel:true,//去掉输入框前文字
    inline: true, // 行内显示输入框
    short: true, // 输入框变短
    formType: 'input_num',
    precision: 4,
    tip: '保留4位小数',
    formIndex: 13
  },
  {
    label: '字符串4',
    name: 'f_string4',
    IsaddKey: true,
    type: 'string',
    width: '150px',
    required: false,
    resultKey: 'f_string4',
    childrens: [],

    // formType:'input',
    // formType:'select',
    formType: 'textarea',
    formIndex: 4
    // inline:true,
    // short:true,
    // nolabel:true,
  },
  {
    label: '日期时间4',
    name: 'f_dateTime4',
    IsaddKey: true,
    type: 'DateTime',
    width: '150px',
    required: false,
    resultKey: 'f_dateTime4',
    childrens: [],

    formType: 'date',
    formIndex: 19
  },
  {
    label: '整数5',
    name: 'f_int5',
    IsaddKey: true,
    type: 'int',
    width: '150px',
    required: false,
    resultKey: 'f_int5',
    childrens: [],

    nolabel: true, // 去掉输入框前文字
    inline: true, // 行内显示输入框
    formType: 'checkbox',
    text: '开启2', // 可以没有我默认给了开启
    // formType:'radio',
    formIndex: 10
  },
  {
    label: '小数5',
    name: 'f_decimal5',
    IsaddKey: true,
    type: 'decimal',
    width: '150px',
    required: false,
    resultKey: 'f_decimal5',
    childrens: [],

    formType: 'input_num',
    precision: 5,
    tip: '保留5位小数',
    formIndex: 15
  },
  {
    label: '字符串5',
    name: 'f_string5',
    IsaddKey: true,
    type: 'string',
    width: '150px',
    required: false,
    resultKey: 'f_string5',
    childrens: [
    //   {label:'工位11',value:'工位11'},
    //   {label:'工位12',value:'工位12'},
    //   {label:'工位13',value:'工位13'},
    //   {label:'工位14',value:'工位14'},
    //   {label:'工位15',value:'工位15'},
    ],

    formType: 'selectGroup',
    formIndex: 5
  },

  {
    label: '日期时间5',
    name: 'f_dateTime5',
    IsaddKey: true,
    type: 'input',
    width: '150px',
    required: false,
    resultKey: 'f_dateTime5',
    childrens: [],

    formType: 'date',
    formIndex: 20

  }

]
