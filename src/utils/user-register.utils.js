export function getRedirectPath({types,avatar}){
	let url=(types==='boss')?'/boss':'/employee'
	if(!avatar){
		url +='info'
	}
	return url
}
export function getChatId(userId,targetId){
	return [userId,targetId].sort().join('_')
}