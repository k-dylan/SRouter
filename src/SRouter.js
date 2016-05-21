/**
 * SRouter
 * author: dylan<kdylan@qq.com>
 */
'use strict'

(function (window) {
    window.SRouter = {
        routers: [], // 路由规则存储
        /**
         * 配置参数
         * options Object
         *  - mode String 路由模式,
         *          hash 默认模式
         *          history pushState 模式
         */
        config: function (options) {
            this.mode = options && options.mode == 'history' 
                        &&  !!(history.pushState) ? 'history' : 'hash';
                        
            return this;
        },
        /**
         * 添加路由
         * - path String 路由规则
         * - name String 路由名称
         * - hander Function 路由执行函数
         */
        add: function (path, name, hander) {
            if(typeof name === 'function'){
                hander = name;
                name = path;
            };
            var route = this._compile(path);
            this.routers.push({
                reg: route.reg,
                paramsName: route.paramsName,
                name: name,
                hander: hander
            })
        },
        /**
         * 删除路由
         * - name String 路由名称
         */
        remove: function (name) {
            var routers = this.routers;
            
            for(var i = 0, len = routers.length; i < len; i++) {
                if(routers[i].name === name) {
                    routers.splice(i,1);
                    return true;
                }
            }
        },
        /**
         * 开始监听路由
         */
        listen: function () {
            // 绑定监听事件            
            if(this.mode === 'history'){
                this._addEvent(window, 'popstate', function () {
                    
                })
            } else {
                this._addEvent(window, 'hashchange', function () {
                    
                })
            } 
        },
        /**
         * 检查路由是否匹配
         * - router String 路由规则
         * - path String 路径
         */
        _check: function (router, path) {
            
        },
        /**
         * 解析路由，将params形式转换为正则表达式
         * - router String路由规则
         */
        _compile: function (router) {
            var route = {}; // 路由对象
            
            // 将/post/:postid 转换为 /post/(\w+);
            var paramsReg = /:(\w+)/g;
            var paramsMatch = router.match(paramsReg);
            if(paramsMatch) {
                route.paramsName = paramsMatch.shift();
                router = router.replace(/:(\w+)/g, '(\\w+)');
            }
            
            route.reg = new RegExp(router);
            return route;
        },
        /**
         * 绑定事件兼容函数
         * - obj Object 要绑定事件的对象
         * - event String 要绑定的事件名称 不含 on
         * - hander Function 要绑定的事件函数
         */
        _addEvent: function (obj, event, hander) {
            if (obj.addEventListener) {
                obj.addEventListener(event, hander, false);
            } else if (obj.attachEvent) {
                obj.attachEvent('on' + event, hander);
            } else {
                obj['on' + event] = hander;
            }
        }
    }
})(window)

