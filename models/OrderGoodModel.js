module.exports = function(db,callback){
	// 订单商品模型
	db.define("OrderGoodModel",{
		id : {type: 'serial', key: true},
		order_id : Number,
		goods_id : Number,
		goods_price : Number,
		goods_number : Number,
		goods_total_price : Number
	},{
		table : "sp_order_goods"
	});
	return callback();
}