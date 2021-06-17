'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection("user")
	const dbcmd = db.command
	let id = context.body.userid
	let markdown = context.body.markdown
	
	let flag = await collection.where({
		mark:dbcmd.all([
			dbcmd.elemMatch({
				id:markdown._id
			})
		])
	}).get()
	
	// console.log(flag);
	if(flag.affectedDocs == 0)
	{
		let res = await collection.where({
			openId:id
		}).update({
			mark:dbcmd.push({
				id:markdown._id + "",
				en:markdown.headWord + "",
				cn:markdown.content.word.content.trans[0].tranCn + ""
			})
		})
	}
	
	return{
		msg:'mark done'
	}
};
