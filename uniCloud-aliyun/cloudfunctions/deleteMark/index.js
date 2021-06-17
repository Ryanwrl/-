'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection("user")
	const dbcmd = db.command
	let userid = context.body.userid
	let markid = context.body.markid
	// console.log(userid);
	// console.log(markid);
	
	let res = await collection.where({
		openId:userid
	}).update({
		mark:dbcmd.pull({
			id:markid+""
		})
	})
	
	let user = await collection.where({
		openId:userid
	}).get()
	
	return{
		msg:"取消标记",
		user
	}
};
