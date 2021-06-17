'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection("user")
	let usernickname = context.body.nickName
	let pwd = context.body.pwd
	
	let flag = await collection.where({
		nickname:usernickname,
		pwd:pwd
	}).get()
	
	if(flag.affectedDocs == 0)
	{
		return{
			msg:"账号不存在或密码错误"
		}
	}
	else{
		return flag
	}
};
