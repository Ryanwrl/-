'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection("user")
	let usernickname = context.body.formdata.nickName
	let useropenId = context.body.formdata.openId
	
	let pwd = context.body.formdata.pwd
	
	
	// console.log(usernickname);
	// console.log(useropenId);
	
	
	let flag = await collection.where({
		openId:useropenId
	}).get()
	// console.log(flag)
	
	if(flag.affectedDocs == 0)
	{
		let res = await collection.add(
		{
			nickname:usernickname,
			openId:useropenId,
			pwd:pwd,
			cardIndex:0,
			mark:[]
		})
		console.log('welcome newfriend');
		// console.log(flag);
	}
	else{
		console.log('welcome back');
	}
	
	return{
		msg:"welcome myfriend"
	}
};
