'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection("user")
	let index = context.body.index
	let id = context.body.id
	
	let data = await collection.where({
		openId:id
	}).get()
	
	let max = data.data[0].MaxIndex
	if(max < index)
	{
		let res = await collection.where({
			openId:id
		}).update({
			cardIndex:index,
			MaxIndex:index
		})
	}
	else{
		let res = await collection.where({
			openId:id
		}).update({
			cardIndex:index,
		})
	}
	
	
	
	return{
		msg:'用户卡片记录已完成',
	}
};
