'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection("user")
	let openid = context.body.id
	let res = await collection.where({
		openId:openid
	}).get()
	
	return{
		res
	}
};
