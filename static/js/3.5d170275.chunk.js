(this.webpackJsonpburger_app=this.webpackJsonpburger_app||[]).push([[3],{78:function(e,t,n){},79:function(e,t,n){},80:function(e,t,n){"use strict";n.r(t);var r=n(4),a=n(5),i=n(7),s=n(6),o=n(0),c=n.n(o),u=(n(78),n(8)),p=(n(79),function(e){var t=[];for(var n in e.ingredients)t.push({name:n,amount:e.ingredients[n]});return c.a.createElement("div",{className:"Order"},c.a.createElement("p",{style:{textTransform:"capitalize",marginLeft:"7px"}},"Ingredients: "),t.map((function(e){return c.a.createElement("span",{className:"Order__ingredients",key:e.name},e.name," = ",e.amount," ")})),c.a.createElement("p",{style:{fontSize:"18px"}},"Total Price: ",c.a.createElement("strong",null,e.price,"$")))}),d=n(12),l=n(29),m=function(e){Object(i.a)(n,e);var t=Object(s.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(a.a)(n,[{key:"componentDidMount",value:function(){this.props.fetchOrder(this.props.token,this.props.userId)}},{key:"render",value:function(){var e=c.a.createElement(l.a,null);return this.props.loading||(e=this.props.orders.map((function(e){return c.a.createElement(p,{key:e.id,ingredients:e.ingredients,price:e.totalPrice})}))),c.a.createElement("div",{className:"Orders"},e)}}]),n}(c.a.Component);t.default=Object(u.b)((function(e){return{orders:e.ordersRTR.orders,loading:e.ordersRTR.loading,token:e.authRTR.token,userId:e.authRTR.userId}}),(function(e){return{fetchOrder:function(t,n){return e(d.d(t,n))}}}))(m)}}]);
//# sourceMappingURL=3.5d170275.chunk.js.map