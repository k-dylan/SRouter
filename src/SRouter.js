/**
 * SRouter
 * author: dylan<kdylan@qq.com>
 */

(function (window) {
    window.SRouter = {
        routers: [], // 路由规则存储
        /**
         * 配置参数
         * options
         *  - mode  路由模式,
         *          hash 默认模式
         *          history pushState 模式
         */
        config: function (options) {
            this.mode = options && options.mode == 'history' 
                        &&  !!(history.pushState) ? 'history' : 'hash';
                        
            return this;
        }
    }
})(window)

