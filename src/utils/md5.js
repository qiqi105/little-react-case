const utility=require('utility')
export function md5Pwd(pwd){
	return utility.md5(utility.md5(pwd+'dc26395^&*$%#0321709gfui3t0982%$&#@!%@'))
}