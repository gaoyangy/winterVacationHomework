module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: 'eslint:recommended',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // check if imports actually resolve
    'settings': {
        'import/resolver': {
            'webpack': {
                'config': 'build/webpack.base.conf.js'
            }
        }
    },
    // add your custom rules here
    //it is base on https://github.com/vuejs/eslint-config-vue
    //规则
    //off 或 0：表示不验证规则
    //warn 或 1：表示验证规则，当不满足时，给警告。
       //error 或 2 ：表示验证规则，不满足时报错。
       //参数：1为错误登记2,为处理方式如：'comma-dangle': [2, 'never'],表示开启提示，对象字面量前后都不能有'，'
    'rules': {
        'accessor-pairs': 1,                                        // 在对象中使用getter/setter 为2是 getter/setter方法需要成对出现
        'arrow-spacing': [2, { 'before': true, 'after': true }],    //=>的前/后括号 此为前需空格，后需空格
        'block-spacing': [2, 'always'],                             //大括号的样式,允许单行样式
        'brace-style': [2, '1tbs'], //大括号风格
        'camelcase': [0, { 'properties': 'always' }],               //对双驼峰命名不做限制
        'comma-dangle': [2, 'never'],                               //对象字面量项尾不能有逗号
        'comma-spacing': [2, { 'before': false, 'after': true }],   //逗号前不可以有空格，逗号后需要有空格
        'comma-style': [2, 'last'],                                 //逗号风格，换行时在行尾
        'constructor-super': 0,                                     //非派生类不能调用super，派生类必须调用super            
        'curly': [2, 'multi-line'],                                 //必须使用 if(){} 中的{},必须换行
        'dot-location': [2, 'property'],                            //对象访问符的位置，换行的时候在行首还是行尾
        'eol-last': 2,                                              //文件以单一的换行符结束
        'eqeqeq': [2, 'allow-null'],                                //必须使用全等
        'generator-star-spacing': [2, { 'before': true, 'after': true }],//生成器函数*的前后空格前后都要有 
        'handle-callback-err': [2, '^(err|error)$' ],               //nodejs 处理错误
        'indent': [2, 2, { 'SwitchCase': 1 }],                      //缩进风格，1tab为两个空格
        'jsx-quotes': [2, 'prefer-single'],                         //强制使用单引号
        'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }],//在对象文字属性中执行键和值之间的一致间隔
        'keyword-spacing': [2, { 'before': true, 'after': true }],  //在关键字前后执行一致的间距
        'new-cap': [2, { 'newIsCap': true, 'capIsNew': false }],    //需要构造函数名以大写字母开头
        'new-parens': 2,                                            //调用没有参数的构造函数时需要使用括号
        'no-array-constructor': 2,                                  //不允许数组构造函数
        'no-caller': 2,                                             //不允许使用arguments.caller或者arguments.callee
        'no-console': 'off',                                        //允许使用控制台
        'no-class-assign': 2,                                       //不允许重新分配类成员
        'no-cond-assign': 2,                                        //在条件表达式中不允许赋值运算符
        'no-const-assign': 2,                                       //不允许重新分配常量变量
        'no-control-regex': 0,                                      //在正则表达式中不允许控制字符
        'no-delete-var': 2,                                         //不允许删除变量
        'no-dupe-args': 2,                                          //函数定义的时候不允许出现重复的参数
        'no-dupe-class-members': 2,                                 //不允许重复的类成员
        'no-dupe-keys': 0,                                          //不允许在对象文字中重复键
        'no-duplicate-case': 2,                                     //switch中的case标签不能重复
        'no-empty-character-class': 0,                              //正则表达式中的[]内容不能为空
        'no-empty-pattern': 2,                                      //在结构赋值时，模式不能为空。在ECMAScript2015的结构赋值中，模式为空是不会报错的，只是这样的结构赋值没有任何效果，该条规则就保证了模式不能为空，也就保证了结构赋值的有效性。
        'no-eval': 0,                                               //禁止使用eval函数
        'no-ex-assign': 0,                                          //禁止对catch语句中的异常进行赋值
        'no-extend-native': 2,                                      //禁止扩展native对象，不能向native的对象上面添加属性
        'no-extra-bind': 0,                                         //箭头函数中没有this对象，也就不能够使用bind()方法。该规则保证了在所有的箭头函数中使用bind方法将被视为错误。
        'no-extra-boolean-cast': 0,                                 //禁止不必要的bool转换
        'no-extra-parens': [2, 'functions'],                        //禁止使用多余的圆括号
        'no-fallthrough': 2,                                        //在case语句中尽量加break，避免不必要的fallthrough错误，消除从一个case到另一个case的非故意的「fall through」。
        'no-floating-decimal': 0,                                   //在使用浮点小数时，不能够省略小数点前面的数或者后面的数，必须写。比如.2 2. 应该写2.2 2.0 
        'no-func-assign': 2,                                        //禁止重复的函数声明
        'no-implied-eval': 2,                                       //在setTimeout(), setInterval() or execScript()中消除隐式eval的使用
        'no-inner-declarations': [2, 'functions'],                  //禁止在块语句中声明变量或函数
        'no-invalid-regexp': 2,                                     //禁止使用无效的正则语句
        'no-irregular-whitespace': 2,                               //禁止使用不合法或者不规则的空白符
        'no-iterator': 2,                                           //禁止使用__iterator__属性
        'no-label-var': 2,                                          //防止label和声明的变量重名
        'no-labels': [2, { 'allowLoop': false, 'allowSwitch': false }], //禁止使用label语句，以避免无限循环
        'no-lone-blocks': 2,                                        //禁止使用不必要的嵌套代码块
        'no-mixed-spaces-and-tabs': 2,                              //禁止混用tab和空格
        'no-multi-spaces': 2,                                       //不允许多个空格
        'no-multi-str': 2,                                          //该规则保证了字符串不分行书写。
        'no-multiple-empty-lines': [2, { 'max': 1 }],               //不要留超过规定数目的空白行
        'no-native-reassign': 2,                                    //该规则保证了不重写原生对象。
        'no-negated-in-lhs': 2,                                     //在in操作符左边的操作项不能用! 例如这样写不对的：if ( !a in b) { //dosomething }
        'no-new-object': 0,                                         //禁止使用new Object()来构造对象
        'no-new-require': 2,                                        //禁止把require方法和new操作符一起使用。
        'no-new-symbol': 2,                                         //禁止在Symbol对象前使用new操作符
        'no-new-wrappers': 0,                                       //禁止使用new创建String,Number, and Boolean实例
        'no-obj-calls': 2,                                          //禁止把全局对象当函数调用，比如下面写法错误的：Math(), JSON()
        'no-octal': 2,                                              //禁止使用八进制数字
        'no-octal-escape': 2,                                       //禁止使用八进制转义序列，比如 var foo = "Copyright \251";
        'no-path-concat': 2,                                        //不能使用__dirname或__filename做路径拼接
        'no-proto': 0,                                              //禁止使用__proto__属性
        'no-redeclare': 2,                                          //避免重复声明一个变量
        'no-regex-spaces': 2,                                       //禁止在正则表达式字面量中使用多个空格 /foo bar/
        'no-return-assign': [2, 'except-parens'],                   //不要在return语句中使用赋值语句
        'no-self-assign': 2,                                        //禁止给自身赋值
        'no-self-compare': 2,                                       //禁止和自身作比较
        'no-sequences': 2,                                          //禁止可能导致结果不明确的逗号操作符
        'no-shadow-restricted-names': 2,                            //声明变量时禁止覆盖JavaScript中的一些保留关键字，比如NaN、Infinity、undefined、eval、arguments等。
        'no-spaced-func': 2,                                        //函数调用时 函数名与()之间不能有空格
        'no-sparse-arrays': 0,                                      //禁止稀疏数组，清除多余的逗号申明  比如[1,,2]
        'no-this-before-super': 2,                                  //在构造函数中，禁止在super()调用前使用this/super对象
        'no-throw-literal': 2,                                      //通过throw语句抛出的对象必须是Error对象本身或者通过Error对象定义的对象。
        'no-trailing-spaces': 2,                                    //禁止行末加空格
        'no-undef': 2,                                              //禁止使用未被定义的变量，除非已在配置文件的global中进行了说明。
        'no-undef-init': 2,                                         //禁止使用未被定义的变量，除非已在配置文件的global中进行了说明。
        'no-unexpected-multiline': 2,                               //行尾缺少分号可能导致一些意外情况
        'no-unmodified-loop-condition': 2,                          // 禁用一成不变的循环条件
        'no-unneeded-ternary': [2, { 'defaultAssignment': false }], // 当存在较简单的选择时，不允许使用三元运算符
        'no-unreachable': 2,                                        //不能有无法执行的代码
        'no-unsafe-finally': 2,                                     //不允许控制流语句最终阻塞
        'no-unused-vars': [2, { 'vars': 'all', 'args': 'none' }],   //不允许存在未使用的变量
        'no-useless-call': 0,                                       //禁止不必要的call和apply
        'no-useless-computed-key': 2,                               //不允许在对象文字中使用不必要的计算属性键
        'no-useless-constructor': 2,                                //禁止不必要的构造函数
        'no-useless-escape': 0,                                     //禁止不必要的转义字符(此为可以有不必要的转义字符)
        'no-whitespace-before-property': 2,                         //禁止属性操作符.的前后和[之前有空格
        'no-with': 2,                                               //不要使用with语句
        'one-var': [2, { 'initialized': 'never' }],                 //将变量强制声明为在函数中或在函数中单独声明
        'operator-linebreak': [2, 'after', { 'overrides': { '?': 'before', ':': 'before' } }],//换行时运算符在行尾还是行首
        'padded-blocks': [2, 'never'],                              //块语句内行首行尾是否要空行
        'quotes': [2, 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],//引号类型 
        'semi': [2, 'never'],                                       //语句强制分号结尾
        'semi-spacing': [2, { 'before': false, 'after': true }],    //分号前后空格
        'space-before-blocks': [2, 'always'],                       //不以新行开始的块{前面要不要有空格
        'space-before-function-paren': [2, 'never'],                //函数定义时括号前面要不要有空格
        'space-in-parens': [2, 'never'],                            //小括号里面要不要有空格
        'space-infix-ops': 2,                                       //中缀操作符周围要不要有空格
        'space-unary-ops': [2, { 'words': true, 'nonwords': false }],   //一元运算符的前/后要不要加空格
        'spaced-comment': [2, 'always', { 'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ','] }],//注释风格要不要有空格!，等特殊符号
        'template-curly-spacing': [2, 'never'],                     //模板字符串中使用${ 和 } 包含的表达式前后是否需要留空格，默认规则禁止花括号内有空格
        'use-isnan': 2,                                             //禁止和NaN作比较,推荐使用isNaN方法
        'valid-typeof': 2,                                          //typeof操作符返回的结果会是 "undefined",  "object",  "boolean", "number", "string", 和  "function"之一。保证typeof 操作符返回的结果必须和上面六个字符串作比较
        'wrap-iife': [2, 'any'],                                    //立即执行函数需要使用小括号调用
        'yoda': [2, 'never'],                                       //默认的规则要求，变量写在左边而字面量写在右边
        'prefer-const': 2,                                          //如果一个变量声明后不再被修改，那么应使用const来声明该变量
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,  //禁止使用debugger语句
        'object-curly-spacing': [2, 'always', { objectsInObjects: false }],  //规定对象字面量中大括号内是否允许加空格，也适用于ES6中的结构赋值和模块import和export
        'array-bracket-spacing': [2, 'never']                       // 用数组字面量定义数组时数组元素前后是否加空格， 此为数组元素前后不能带空格，
    }
}
